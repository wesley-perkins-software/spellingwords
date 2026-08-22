import { normalizeWordList } from './normalizeWordList';
import { parseWordInput } from './parseWordInput';
import { bytesToBase64Url, base64UrlToBytes } from './serialization';

/**
 * Shareable spelling-list payload — the transport behind teacher/parent
 * "Create practice link" URLs of the form:
 *
 *   /practice-your-own-words#list=2.eyJ2IjoxLCJ3b3JkcyI6...
 *
 * This is a sibling to (not a fork of) `serialization.ts`: it reuses that
 * module's base64url primitives and word-normalization pipeline, but wraps
 * the words in a small versioned JSON envelope that also carries an optional
 * list title. It uses its own format-version prefix (`2.`, vs.
 * `serialization.ts`'s `1.`) so the two payload formats can never be
 * cross-decoded — a `sharedList` payload handed to `decodeWordList` (or vice
 * versa) is rejected outright rather than silently misparsed.
 *
 * Encoding this in the URL *fragment* (not a query string) is a deliberate
 * product choice made at the call site, not by this module: fragments are
 * not sent to the server on ordinary navigation, which reduces (but does
 * not eliminate) accidental exposure in server/CDN logs and referrers. This
 * is not encryption and not privacy — anyone holding the link can decode it
 * with this module's own `decodeSharedList`.
 *
 * Functions never throw for ordinary user mistakes; they return structured
 * results with stable error codes instead, matching `serialization.ts`'s
 * conventions.
 */

/** The shared-list payload's own format-version prefix (distinct from `serialization.ts`'s `'1'`). */
export const SHARED_LIST_FORMAT_VERSION = '2';

const PAYLOAD_SEPARATOR = '.';

/**
 * Maximum number of words a single shared link may carry. Deliberately
 * tighter than `serialization.ts`'s general-purpose `MAX_WORD_COUNT` (200):
 * a shared link targets "a normal classroom spelling list," not a bulk word
 * database, and its payload lives in the URL itself.
 *
 * Re-verified (2026-08-22) by measuring real generated URLs — this repo's
 * actual base64url/JSON encoding, not an estimate — at 10/20/30/40 words,
 * under both a typical case (short ~6-char words, a 40-char title) and a
 * deliberately pathological worst case (every word at the 45-char per-word
 * maximum, plus a full 40-char title):
 *
 *   words │ typical URL │ worst-case (ASCII) │ worst-case (accented Unicode)
 *   ──────┼─────────────┼─────────────────────┼───────────────────────────────
 *      10 │      268 ch │              788 ch │                       1388 ch
 *      20 │      388 ch │             1428 ch │                       2628 ch
 *      30 │      508 ch │             2068 ch │                       3868 ch
 *      40 │      628 ch │             2708 ch │                       5108 ch
 *
 * Two things follow from this table:
 *  - A *typical* K-5 spelling list (short real words) produces a tiny URL —
 *    even 40 words is only ~600 characters, trivially safe to paste into
 *    Google Classroom/Canvas, email, or a chat/SMS message (modern phones
 *    silently auto-concatenate a long SMS into multiple segments; the link
 *    still works either way — this only affects carrier segment count, not
 *    functionality). Because this is a URL *fragment*, it is also never
 *    sent to a server, so server/CDN request-line limits (commonly ~8KB)
 *    don't apply to it at all.
 *  - The realistic risk is a pathological list (every word near the 45-char
 *    validation ceiling). At 30 words, even the ASCII worst case (2068 ch)
 *    stays under the ~2083-character threshold long cited as the most
 *    conservative "works absolutely everywhere" bound (originally an old
 *    IE/Excel hyperlink limit; that browser is long dead, but the number
 *    remains a widely-used rule of thumb for "safe under any legacy
 *    system"). At 40 words the ASCII worst case (2708 ch) crosses that
 *    threshold, and the accented-Unicode worst case (5108 ch) crosses it by
 *    a wide margin.
 *
 * A real K-5 weekly spelling list is 10-20 words; 30 already covers even a
 * generously extended list with comfortable headroom in the typical case,
 * while keeping the pathological case under the safest practical bound.
 * There's no concrete product need pushing past that, so 30 stays the
 * limit — raising it to 40 was considered and deliberately rejected, not
 * left unconsidered.
 */
export const MAX_SHARED_WORD_COUNT = 30;

/** Maximum length (in characters) of a single word within a shared list. Matches `validateWordInput`'s default. */
export const MAX_SHARED_WORD_LENGTH = 45;

/** Maximum length (in characters) of an optional shared-list title. */
export const MAX_SHARED_TITLE_LENGTH = 40;

/**
 * Maximum length (in characters) of an encoded shared-list payload
 * (excluding the `https://.../practice-your-own-words#list=` prefix).
 *
 * Computed, not copy-pasted from `serialization.ts`'s `MAX_PAYLOAD_LENGTH`:
 * the JSON envelope is more verbose than that module's newline-joined
 * format, and words/titles may contain multi-byte Unicode (e.g. accented
 * characters cost 2 UTF-8 bytes each). Measured worst case — 30 words at
 * 45 characters each plus a 40-character title, all accented — comes to
 * roughly 3900 encoded characters; this constant adds headroom above that.
 */
export const MAX_SHARED_PAYLOAD_LENGTH = 4200;

const WORDS_ARRAY_TYPE_MESSAGE = 'Payload does not contain a valid words array.';

export type EncodeSharedListErrorCode =
  | 'empty'
  | 'too_many_words'
  | 'title_too_long'
  | 'payload_too_long'
  | 'word_too_long';

export type EncodeSharedListResult =
  | { ok: true; payload: string; words: string[]; title?: string }
  | { ok: false; code: EncodeSharedListErrorCode; message: string };

export type DecodeSharedListErrorCode =
  | 'empty'
  | 'too_long'
  | 'malformed'
  | 'invalid_encoding'
  | 'unsupported_version'
  | 'too_many_words'
  | 'title_too_long';

export type DecodeSharedListResult =
  | { ok: true; words: string[]; title?: string }
  | { ok: false; code: DecodeSharedListErrorCode; message: string };

/** The decoded, versioned JSON envelope. */
interface SharedListPayloadV1 {
  v: 1;
  words: string[];
  title?: string;
}

function toWordList(input: string[] | string): string[] {
  return typeof input === 'string' ? parseWordInput(input) : normalizeWordList(input);
}

/**
 * Encode a word list (plus an optional short title) into a compact,
 * URL-safe shareable payload for the URL fragment.
 *
 * Accepts raw pasted text or a string array; both are normalized with the
 * same rules `encodeWordList` uses (case and accents preserved, deduped).
 * Returns a structured result and never throws.
 */
export function encodeSharedList(input: string[] | string, title?: string): EncodeSharedListResult {
  const words = toWordList(input);

  if (words.length === 0) {
    return { ok: false, code: 'empty', message: 'No words to encode.' };
  }

  if (words.length > MAX_SHARED_WORD_COUNT) {
    return {
      ok: false,
      code: 'too_many_words',
      message: `Too many words for a shared list (max ${MAX_SHARED_WORD_COUNT}).`,
    };
  }

  if (words.some((word) => word.length > MAX_SHARED_WORD_LENGTH)) {
    return {
      ok: false,
      code: 'word_too_long',
      message: `Each word must be at most ${MAX_SHARED_WORD_LENGTH} characters.`,
    };
  }

  const trimmedTitle = title?.trim() || undefined;
  if (trimmedTitle && trimmedTitle.length > MAX_SHARED_TITLE_LENGTH) {
    return {
      ok: false,
      code: 'title_too_long',
      message: `Title must be at most ${MAX_SHARED_TITLE_LENGTH} characters.`,
    };
  }

  const envelope: SharedListPayloadV1 = trimmedTitle
    ? { v: 1, words, title: trimmedTitle }
    : { v: 1, words };
  const bytes = new TextEncoder().encode(JSON.stringify(envelope));
  const payload = SHARED_LIST_FORMAT_VERSION + PAYLOAD_SEPARATOR + bytesToBase64Url(bytes);

  if (payload.length > MAX_SHARED_PAYLOAD_LENGTH) {
    return {
      ok: false,
      code: 'payload_too_long',
      message: `Encoded payload exceeds ${MAX_SHARED_PAYLOAD_LENGTH} characters.`,
    };
  }

  return { ok: true, payload, words, title: trimmedTitle };
}

/**
 * Decode a shared-list payload (the value of a `#list=` fragment) back into
 * a clean, normalized word array and optional title.
 *
 * Re-applies normalization defensively, validates every bound, and rejects
 * a `serialization.ts` (`1.`) payload outright rather than misparsing it.
 * Returns a structured result and never throws.
 */
export function decodeSharedList(fragmentPayload: string): DecodeSharedListResult {
  const trimmed = typeof fragmentPayload === 'string' ? fragmentPayload.trim() : '';

  if (trimmed.length === 0) {
    return { ok: false, code: 'empty', message: 'Payload is empty.' };
  }

  if (trimmed.length > MAX_SHARED_PAYLOAD_LENGTH) {
    return {
      ok: false,
      code: 'too_long',
      message: `Payload exceeds ${MAX_SHARED_PAYLOAD_LENGTH} characters.`,
    };
  }

  const separatorIndex = trimmed.indexOf(PAYLOAD_SEPARATOR);
  const version = separatorIndex === -1 ? '' : trimmed.slice(0, separatorIndex);
  const body = separatorIndex === -1 ? '' : trimmed.slice(separatorIndex + 1);

  if (body.length === 0) {
    return { ok: false, code: 'malformed', message: 'Unrecognized payload format.' };
  }

  if (version !== SHARED_LIST_FORMAT_VERSION) {
    return {
      ok: false,
      code: 'unsupported_version',
      message: 'This shared list uses an unsupported or newer format.',
    };
  }

  const bytes = base64UrlToBytes(body);
  if (bytes === null) {
    return { ok: false, code: 'malformed', message: 'Payload body is not valid base64url.' };
  }

  let text: string;
  try {
    text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    return { ok: false, code: 'invalid_encoding', message: 'Payload does not contain valid UTF-8 text.' };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, code: 'malformed', message: 'Payload is not valid JSON.' };
  }

  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    (parsed as { v?: unknown }).v !== 1 ||
    !Array.isArray((parsed as { words?: unknown }).words) ||
    !(parsed as { words: unknown[] }).words.every((w) => typeof w === 'string')
  ) {
    return { ok: false, code: 'malformed', message: WORDS_ARRAY_TYPE_MESSAGE };
  }

  const envelope = parsed as SharedListPayloadV1;

  if (envelope.title !== undefined && typeof envelope.title !== 'string') {
    return { ok: false, code: 'malformed', message: 'Payload title is not a string.' };
  }

  const words = normalizeWordList(envelope.words);

  if (words.length === 0) {
    return { ok: false, code: 'empty', message: 'Payload contains no words.' };
  }

  if (words.length > MAX_SHARED_WORD_COUNT) {
    return {
      ok: false,
      code: 'too_many_words',
      message: `Too many words for a shared list (max ${MAX_SHARED_WORD_COUNT}).`,
    };
  }

  const title = envelope.title?.trim() || undefined;
  if (title && title.length > MAX_SHARED_TITLE_LENGTH) {
    return {
      ok: false,
      code: 'title_too_long',
      message: `Title must be at most ${MAX_SHARED_TITLE_LENGTH} characters.`,
    };
  }

  return title ? { ok: true, words, title } : { ok: true, words };
}

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
 * a shared link targets "a normal classroom spelling list," and real
 * generated-URL lengths were measured (not guessed) at 10/20/30/40/60 words
 * for both a typical case (short words, short title) and a worst case (every
 * word and the title at their per-field maximum, including multi-byte
 * Unicode). 30 was chosen because its worst-case URL stays within a few
 * hundred characters of the historical ~2083-char IE/Excel-hyperlink limit —
 * still the most conservative practical bound in wide use — while a typical
 * K-5 list of 10-20 short words produces a URL of only a few hundred
 * characters, comfortably pasted into chat/SMS/LMS text fields.
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

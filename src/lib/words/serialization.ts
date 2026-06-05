import { normalizeWordList } from './normalizeWordList';
import { parseWordInput } from './parseWordInput';

/**
 * Custom word-list serialization.
 *
 * Encodes a custom, user-entered spelling-word list into a compact, URL-safe
 * payload and decodes it back into a clean, normalized word array. This is the
 * transport layer behind a future shareable link of the form:
 *
 *   /play?list=1.Y2F0CmRvZw
 *
 * The intended future query parameter is `list` (clearer than `q`, which implies
 * a search query). Routing itself is out of scope for this module — these are
 * pure, framework-agnostic utilities: no DOM, no routing, no runtime
 * dependencies, and no browser-only APIs (`TextEncoder`/`TextDecoder` are WHATWG
 * globals available in Node and browsers; base64url is implemented by hand, so
 * neither `Buffer` nor `btoa`/`atob` is required).
 *
 * Functions never throw for ordinary user mistakes; they return structured
 * results with stable error codes instead.
 */

/** Current payload format version. Encoded payloads are prefixed with `1.`. */
export const SERIALIZATION_FORMAT_VERSION = '1';

/**
 * Character separating the format version from the encoded body (`1.<body>`).
 * Chosen to be URL-unreserved and outside the base64url alphabet, so splitting
 * the payload is unambiguous.
 */
const PAYLOAD_SEPARATOR = '.';

/** Maximum number of words a single shareable list may contain. */
export const MAX_WORD_COUNT = 200;

/**
 * Maximum length (in characters) of an encoded payload. Keeps shareable URLs
 * comfortably within widely-supported limits.
 */
export const MAX_PAYLOAD_LENGTH = 4096;

/** Separator used between words inside the pre-encoded byte stream. */
const WORD_SEPARATOR = '\n';

/** Stable, machine-readable codes for why encoding failed. */
export type EncodeErrorCode = 'empty' | 'too_many_words' | 'payload_too_long';

/** Structured result of encoding a word list. Never thrown. */
export type EncodeResult =
  | { ok: true; payload: string; words: string[] }
  | { ok: false; code: EncodeErrorCode; message: string };

/** Stable, machine-readable codes for why decoding failed. */
export type DecodeErrorCode =
  | 'empty'
  | 'too_long'
  | 'malformed'
  | 'invalid_encoding'
  | 'too_many_words';

/** Structured result of decoding a payload. Never thrown. */
export type DecodeResult =
  | { ok: true; words: string[] }
  | { ok: false; code: DecodeErrorCode; message: string };

const BASE64URL_ALPHABET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

/** Reverse lookup: base64url character -> 6-bit value (-1 when not a member). */
const BASE64URL_LOOKUP: Record<string, number> = (() => {
  const table: Record<string, number> = {};
  for (let i = 0; i < BASE64URL_ALPHABET.length; i += 1) {
    table[BASE64URL_ALPHABET[i]] = i;
  }
  return table;
})();

/** Encode raw bytes as an unpadded base64url string. */
function bytesToBase64Url(bytes: Uint8Array): string {
  let output = '';

  for (let i = 0; i < bytes.length; i += 3) {
    const byte1 = bytes[i];
    const byte2 = i + 1 < bytes.length ? bytes[i + 1] : undefined;
    const byte3 = i + 2 < bytes.length ? bytes[i + 2] : undefined;

    output += BASE64URL_ALPHABET[byte1 >> 2];
    output += BASE64URL_ALPHABET[((byte1 & 0b11) << 4) | ((byte2 ?? 0) >> 4)];

    if (byte2 === undefined) break;
    output += BASE64URL_ALPHABET[((byte2 & 0b1111) << 2) | ((byte3 ?? 0) >> 6)];

    if (byte3 === undefined) break;
    output += BASE64URL_ALPHABET[byte3 & 0b111111];
  }

  return output;
}

/**
 * Decode an unpadded base64url string back into bytes. Returns `null` when the
 * input contains characters outside the alphabet or has an invalid length.
 */
function base64UrlToBytes(value: string): Uint8Array | null {
  // A base64 group is 4 chars -> 3 bytes. Unpadded tails of length 1 are invalid.
  if (value.length % 4 === 1) return null;

  const bytes: number[] = [];
  let buffer = 0;
  let bits = 0;

  for (const char of value) {
    const sextet = BASE64URL_LOOKUP[char];
    if (sextet === undefined) return null;

    buffer = (buffer << 6) | sextet;
    bits += 6;

    if (bits >= 8) {
      bits -= 8;
      bytes.push((buffer >> bits) & 0xff);
    }
  }

  return Uint8Array.from(bytes);
}

/** Normalize raw text or a string array into a clean, deduped word list. */
function toWordList(input: string[] | string): string[] {
  return typeof input === 'string'
    ? parseWordInput(input)
    : normalizeWordList(input);
}

/**
 * Encode a custom word list into a compact, URL-safe payload.
 *
 * Accepts raw pasted text or a string array; both are normalized with the PR #2
 * rules (case and accents preserved, deduplicated). Returns a structured result
 * and never throws.
 */
export function encodeWordList(input: string[] | string): EncodeResult {
  const words = toWordList(input);

  if (words.length === 0) {
    return { ok: false, code: 'empty', message: 'No words to encode.' };
  }

  if (words.length > MAX_WORD_COUNT) {
    return {
      ok: false,
      code: 'too_many_words',
      message: `Too many words (max ${MAX_WORD_COUNT}).`,
    };
  }

  const bytes = new TextEncoder().encode(words.join(WORD_SEPARATOR));
  const payload =
    SERIALIZATION_FORMAT_VERSION + PAYLOAD_SEPARATOR + bytesToBase64Url(bytes);

  if (payload.length > MAX_PAYLOAD_LENGTH) {
    return {
      ok: false,
      code: 'payload_too_long',
      message: `Encoded payload exceeds ${MAX_PAYLOAD_LENGTH} characters.`,
    };
  }

  return { ok: true, payload, words };
}

/**
 * Decode a shareable payload back into a clean, normalized word array.
 *
 * Re-applies the PR #2 normalization rules defensively, so the output is always
 * a valid word list regardless of the payload's provenance. Returns a structured
 * result and never throws.
 */
export function decodeWordList(payload: string): DecodeResult {
  const trimmed = typeof payload === 'string' ? payload.trim() : '';

  if (trimmed.length === 0) {
    return { ok: false, code: 'empty', message: 'Payload is empty.' };
  }

  if (trimmed.length > MAX_PAYLOAD_LENGTH) {
    return {
      ok: false,
      code: 'too_long',
      message: `Payload exceeds ${MAX_PAYLOAD_LENGTH} characters.`,
    };
  }

  const separatorIndex = trimmed.indexOf(PAYLOAD_SEPARATOR);
  const version = separatorIndex === -1 ? '' : trimmed.slice(0, separatorIndex);
  const body = separatorIndex === -1 ? '' : trimmed.slice(separatorIndex + 1);

  if (version !== SERIALIZATION_FORMAT_VERSION || body.length === 0) {
    return {
      ok: false,
      code: 'malformed',
      message: 'Unrecognized payload format or version.',
    };
  }

  const bytes = base64UrlToBytes(body);
  if (bytes === null) {
    return {
      ok: false,
      code: 'malformed',
      message: 'Payload body is not valid base64url.',
    };
  }

  let text: string;
  try {
    text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    return {
      ok: false,
      code: 'invalid_encoding',
      message: 'Payload does not contain valid UTF-8 text.',
    };
  }

  const words = normalizeWordList(text.split(WORD_SEPARATOR));

  if (words.length === 0) {
    return { ok: false, code: 'empty', message: 'Payload contains no words.' };
  }

  if (words.length > MAX_WORD_COUNT) {
    return {
      ok: false,
      code: 'too_many_words',
      message: `Too many words (max ${MAX_WORD_COUNT}).`,
    };
  }

  return { ok: true, words };
}

/**
 * Create a shareable list payload. Domain-friendly alias for {@link encodeWordList}.
 */
export const createShareableListPayload = encodeWordList;

/**
 * Parse a shareable list payload. Domain-friendly alias for {@link decodeWordList}.
 */
export const parseShareableListPayload = decodeWordList;

/** Convenience predicate: does `payload` decode to a valid word list? */
export function isValidSerializedList(payload: string): boolean {
  return decodeWordList(payload).ok;
}

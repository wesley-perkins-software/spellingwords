import { describe, expect, it } from 'vitest';

import {
  MAX_SHARED_PAYLOAD_LENGTH,
  MAX_SHARED_TITLE_LENGTH,
  MAX_SHARED_WORD_COUNT,
  MAX_SHARED_WORD_LENGTH,
  SHARED_LIST_FORMAT_VERSION,
  decodeSharedList,
  encodeSharedList,
} from './sharedList';
import { SERIALIZATION_FORMAT_VERSION, decodeWordList, encodeWordList } from './serialization';

function encodeOk(input: string[] | string, title?: string): { payload: string; words: string[]; title?: string } {
  const result = encodeSharedList(input, title);
  if (!result.ok) {
    throw new Error(`expected encode to succeed, got code "${result.code}"`);
  }
  return { payload: result.payload, words: result.words, title: result.title };
}

function decodeOk(payload: string): { words: string[]; title?: string } {
  const result = decodeSharedList(payload);
  if (!result.ok) {
    throw new Error(`expected decode to succeed, got code "${result.code}"`);
  }
  return { words: result.words, title: result.title };
}

describe('encodeSharedList / decodeSharedList round trips', () => {
  it('round-trips a word list with no title', () => {
    const words = ['cat', 'dog', 'bird'];
    const decoded = decodeOk(encodeOk(words).payload);
    expect(decoded.words).toEqual(words);
    expect(decoded.title).toBeUndefined();
  });

  it('round-trips a word list with a title', () => {
    const words = ['cat', 'dog'];
    const decoded = decodeOk(encodeOk(words, 'Week 4 Spelling').payload);
    expect(decoded.words).toEqual(words);
    expect(decoded.title).toBe('Week 4 Spelling');
  });

  it('omits the title entirely when not given, rather than an empty string', () => {
    const { payload } = encodeOk(['cat', 'dog']);
    const bodyStart = payload.indexOf('.') + 1;
    const bytes = Buffer.from(payload.slice(bodyStart), 'base64url');
    const json = JSON.parse(bytes.toString('utf8'));
    expect('title' in json).toBe(false);
  });

  it('trims a title with surrounding whitespace', () => {
    const decoded = decodeOk(encodeOk(['cat'], '  Friday Spelling List  ').payload);
    expect(decoded.title).toBe('Friday Spelling List');
  });

  it('treats a blank title as no title', () => {
    const decoded = decodeOk(encodeOk(['cat'], '   ').payload);
    expect(decoded.title).toBeUndefined();
  });
});

describe('Unicode, punctuation, and capitalization', () => {
  it('preserves apostrophes, accents, hyphens, and capitalization', () => {
    const words = ["O'Brien", 'Café', 'well-known', 'naïve', 'Zoë'];
    expect(decodeOk(encodeOk(words).payload).words).toEqual(words);
  });

  it('preserves a Unicode title', () => {
    const decoded = decodeOk(encodeOk(['cat'], 'Señora García’s Class').payload);
    expect(decoded.title).toBe('Señora García’s Class');
  });
});

describe('malformed payloads', () => {
  it.each<[string, string]>([
    ['', 'empty'],
    ['   ', 'empty'],
    [`${SHARED_LIST_FORMAT_VERSION}.`, 'malformed'],
    [`${SHARED_LIST_FORMAT_VERSION}.not base64!!`, 'malformed'],
  ])('decodes %j as %s', (payload, code) => {
    const result = decodeSharedList(payload);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe(code);
  });

  it('rejects a body that is valid base64url but not valid JSON', () => {
    const garbage = Buffer.from('not json', 'utf8').toString('base64url');
    const result = decodeSharedList(`${SHARED_LIST_FORMAT_VERSION}.${garbage}`);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('malformed');
  });

  it('rejects JSON that is valid but not a words envelope', () => {
    const body = Buffer.from(JSON.stringify({ v: 1, notWords: true }), 'utf8').toString('base64url');
    const result = decodeSharedList(`${SHARED_LIST_FORMAT_VERSION}.${body}`);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('malformed');
  });

  it('reports invalid_encoding for non-UTF-8 bytes', () => {
    // 0xFF is never a valid lone UTF-8 byte. base64url of [0xFF] -> "_w".
    const result = decodeSharedList(`${SHARED_LIST_FORMAT_VERSION}._w`);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('invalid_encoding');
  });
});

describe('version handling', () => {
  it('rejects a legacy (v1 word-list) payload as unsupported_version', () => {
    const legacy = encodeWordList(['cat', 'dog']);
    if (!legacy.ok) throw new Error('setup failed');
    const result = decodeSharedList(legacy.payload);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('unsupported_version');
  });

  it('rejects a hypothetical future version as unsupported_version', () => {
    const body = Buffer.from(JSON.stringify({ v: 1, words: ['cat'] }), 'utf8').toString('base64url');
    const result = decodeSharedList(`3.${body}`);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('unsupported_version');
  });

  it('a shared-list payload is rejected by the legacy decodeWordList', () => {
    const { payload } = encodeOk(['cat', 'dog']);
    const result = decodeWordList(payload);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('malformed');
  });

  it('produces payloads prefixed with the shared-list version, distinct from the legacy version', () => {
    const { payload } = encodeOk(['cat']);
    expect(payload.startsWith(`${SHARED_LIST_FORMAT_VERSION}.`)).toBe(true);
    expect(SHARED_LIST_FORMAT_VERSION).not.toBe(SERIALIZATION_FORMAT_VERSION);
  });
});

describe('limits', () => {
  it('encodes exactly MAX_SHARED_WORD_COUNT words', () => {
    const words = Array.from({ length: MAX_SHARED_WORD_COUNT }, (_, i) => `word${i}`);
    expect(encodeSharedList(words).ok).toBe(true);
  });

  it('rejects more than MAX_SHARED_WORD_COUNT words on encode', () => {
    const words = Array.from({ length: MAX_SHARED_WORD_COUNT + 1 }, (_, i) => `word${i}`);
    const result = encodeSharedList(words);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('too_many_words');
  });

  it('rejects a single word over MAX_SHARED_WORD_LENGTH', () => {
    const result = encodeSharedList(['a'.repeat(MAX_SHARED_WORD_LENGTH + 1)]);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('word_too_long');
  });

  it('accepts a word at exactly MAX_SHARED_WORD_LENGTH', () => {
    const result = encodeSharedList(['a'.repeat(MAX_SHARED_WORD_LENGTH)]);
    expect(result.ok).toBe(true);
  });

  it('rejects a title over MAX_SHARED_TITLE_LENGTH', () => {
    const result = encodeSharedList(['cat'], 'x'.repeat(MAX_SHARED_TITLE_LENGTH + 1));
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('title_too_long');
  });

  it('accepts a title at exactly MAX_SHARED_TITLE_LENGTH', () => {
    const result = encodeSharedList(['cat'], 'x'.repeat(MAX_SHARED_TITLE_LENGTH));
    expect(result.ok).toBe(true);
  });

  it('rejects an over-length payload when decoding', () => {
    const payload = `${SHARED_LIST_FORMAT_VERSION}.${'A'.repeat(MAX_SHARED_PAYLOAD_LENGTH)}`;
    const result = decodeSharedList(payload);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('too_long');
  });

  it('rejects a decoded envelope carrying too many words (crafted payload, bypassing encode-side check)', () => {
    // Letter-only words (not `word${i}`) — decoding now filters through the
    // spelling character policy, and digits are never a valid spelling
    // character, so a digit-bearing fixture would be filtered to empty
    // before this test's actual target (the count guard) ever ran.
    const words = Array.from({ length: MAX_SHARED_WORD_COUNT + 1 }, (_, i) => `word${'a'.repeat(i + 1)}`);
    const body = Buffer.from(JSON.stringify({ v: 1, words }), 'utf8').toString('base64url');
    const result = decodeSharedList(`${SHARED_LIST_FORMAT_VERSION}.${body}`);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('too_many_words');
  });

  it('rejects a decoded envelope carrying an over-length title (crafted payload)', () => {
    const body = Buffer.from(
      JSON.stringify({ v: 1, words: ['cat'], title: 'x'.repeat(MAX_SHARED_TITLE_LENGTH + 1) }),
      'utf8',
    ).toString('base64url');
    const result = decodeSharedList(`${SHARED_LIST_FORMAT_VERSION}.${body}`);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('title_too_long');
  });

  it('the practice limit (200) and the share limit (30) are independent: a list too big to share still practices fine locally', () => {
    const words = Array.from({ length: MAX_SHARED_WORD_COUNT + 5 }, (_, i) => `word${i}`);

    const shareResult = encodeSharedList(words);
    expect(shareResult.ok).toBe(false);
    if (!shareResult.ok) expect(shareResult.code).toBe('too_many_words');

    // The same list is well within encodeWordList's much higher ceiling —
    // sharing being unavailable never blocks ordinary local practice.
    const practiceResult = encodeWordList(words);
    expect(practiceResult.ok).toBe(true);
  });
});

describe('empty input', () => {
  it('rejects an empty array when encoding', () => {
    const result = encodeSharedList([]);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('empty');
  });
});

describe('injection safety — data passes through as inert text, never executed or specially escaped', () => {
  it('a word containing script-like text is rejected by the spelling character policy on decode, not specially escaped or stripped to something markup-safe', () => {
    // `<script>alert(1)</script>` was never HTML-escaped anywhere in this
    // codebase (feedback rendering uses textContent, never innerHTML) — but
    // it also isn't a legitimate spelling word: the interior `(`, `)`, `/`
    // fail the character policy audited into `validateWordInput`, so
    // `filterValidSpellingWords` drops it on decode rather than letting it
    // through as if it were real spelling content.
    const raw = '<script>alert(1)</script>';
    const result = decodeSharedList(encodeOk([raw]).payload);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('empty');
  });

  it('round-trips a title containing HTML-attribute-injection-like text completely unmodified (titles are not passed through word normalization)', () => {
    const title = '"><img src=x onerror=alert(1)>';
    const decoded = decodeOk(encodeOk(['cat'], title).payload);
    expect(decoded.title).toBe(title);
  });
});

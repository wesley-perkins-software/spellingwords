import { describe, expect, it } from 'vitest';

import {
  MAX_PAYLOAD_LENGTH,
  MAX_WORD_COUNT,
  SERIALIZATION_FORMAT_VERSION,
  createShareableListPayload,
  decodeWordList,
  encodeWordList,
  isValidSerializedList,
  parseShareableListPayload,
} from './serialization';

/** Helper: encode and assert success, returning the payload. */
function encodeOk(input: string[] | string): { payload: string; words: string[] } {
  const result = encodeWordList(input);
  if (!result.ok) {
    throw new Error(`expected encode to succeed, got code "${result.code}"`);
  }
  return { payload: result.payload, words: result.words };
}

/** Helper: decode and assert success, returning the words. */
function decodeOk(payload: string): string[] {
  const result = decodeWordList(payload);
  if (!result.ok) {
    throw new Error(`expected decode to succeed, got code "${result.code}"`);
  }
  return result.words;
}

describe('encodeWordList / decodeWordList round trips', () => {
  it('round-trips a clean array, preserving order', () => {
    const words = ['cat', 'dog', 'bird', 'fish'];
    expect(decodeOk(encodeOk(words).payload)).toEqual(words);
  });

  it('round-trips raw pasted text into a clean array', () => {
    const text = '1. Cat\n2. dog, BIRD\n  - fish\n\n"mouse"';
    expect(decodeOk(encodeOk(text).payload)).toEqual([
      'Cat',
      'dog',
      'BIRD',
      'fish',
      'mouse',
    ]);
  });

  it('encodes array and equivalent messy text to the same payload', () => {
    const fromArray = encodeOk(['cat', 'dog', 'bird']).payload;
    const fromText = encodeOk('1. cat\n- dog\ncat, bird').payload;
    expect(fromText).toBe(fromArray);
  });

  it('preserves original casing through a round trip', () => {
    const words = ['England', 'Tuesday', 'McDonald'];
    expect(decodeOk(encodeOk(words).payload)).toEqual(words);
  });
});

describe('custom names', () => {
  it('round-trips custom names exactly', () => {
    const names = ['cotton', 'cooper', 'freddy', 'binx', 'melinda'];
    expect(decodeOk(encodeOk(names).payload)).toEqual(names);
  });

  it('normalizes a messy custom-name list and round-trips it', () => {
    const text = ' Cotton ,cooper\n- Freddy\n3) binx\n\nmelinda,';
    expect(decodeOk(encodeOk(text).payload)).toEqual([
      'Cotton',
      'cooper',
      'Freddy',
      'binx',
      'melinda',
    ]);
  });
});

describe('Unicode and accented words', () => {
  it('preserves accents by default through a round trip', () => {
    const words = ['Café', 'naïve', 'Zoë', 'Mëlinda', 'piñata'];
    expect(decodeOk(encodeOk(words).payload)).toEqual(words);
  });

  it('treats accented and unaccented spellings as distinct words', () => {
    const words = ['café', 'cafe'];
    expect(decodeOk(encodeOk(words).payload)).toEqual(words);
  });
});

describe('deduplication on encode', () => {
  it('collapses case-insensitive duplicates, keeping the first form', () => {
    const { words } = encodeOk(['Cat', 'cat', 'CAT', 'dog']);
    expect(words).toEqual(['Cat', 'dog']);
  });
});

describe('empty / messy input', () => {
  it.each([['', 'empty string'], ['   \n\t  ', 'whitespace'], ['!!!...???', 'punctuation']])(
    'rejects %j (%s) when encoding',
    (input) => {
      const result = encodeWordList(input);
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.code).toBe('empty');
    },
  );

  it('rejects an empty array when encoding', () => {
    const result = encodeWordList([]);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('empty');
  });
});

describe('URL safety', () => {
  it('produces only URL-safe characters with the version prefix', () => {
    const { payload } = encodeOk(['Café', "O'Brien", 'well-known', 'naïve']);
    expect(payload).toMatch(/^1\.[A-Za-z0-9_-]+$/);
    expect(payload.startsWith(`${SERIALIZATION_FORMAT_VERSION}.`)).toBe(true);
  });

  it('needs no escaping inside a query string', () => {
    const { payload } = encodeOk(['Mëlinda', 'cotton', "d'Artagnan"]);
    expect(encodeURIComponent(payload)).toBe(payload);
    // Survives a realistic `?list=` round trip.
    const url = new URL(`https://spellingwords.app/play?list=${payload}`);
    expect(decodeOk(url.searchParams.get('list') ?? '')).toEqual([
      'Mëlinda',
      'cotton',
      "d'Artagnan",
    ]);
  });
});

describe('invalid payloads', () => {
  it.each<[string, string]>([
    ['', 'empty'],
    ['   ', 'empty'],
    ['Y2F0', 'malformed'], // no version prefix
    ['1.', 'malformed'], // empty body
    ['9.Y2F0', 'malformed'], // unknown version
    ['1.not base64!!', 'malformed'], // illegal characters
    ['1.A', 'malformed'], // invalid base64url length (tail of 1)
  ])('decodes %j as %s', (payload, code) => {
    const result = decodeWordList(payload);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe(code);
  });

  it('reports invalid_encoding for non-UTF-8 bytes', () => {
    // 0xFF is never a valid lone UTF-8 byte. base64url of [0xFF] -> "_w".
    const result = decodeWordList('1._w');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('invalid_encoding');
  });

  it('reports empty when a valid payload decodes to no words', () => {
    const payload = `${SERIALIZATION_FORMAT_VERSION}.${encodeBodyForTest('   ')}`;
    const result = decodeWordList(payload);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('empty');
  });
});

describe('limits', () => {
  it('encodes exactly MAX_WORD_COUNT words', () => {
    const words = Array.from({ length: MAX_WORD_COUNT }, (_, i) => `word${i}`);
    const result = encodeWordList(words);
    expect(result.ok).toBe(true);
  });

  it('rejects more than MAX_WORD_COUNT words', () => {
    const words = Array.from({ length: MAX_WORD_COUNT + 1 }, (_, i) => `word${i}`);
    const result = encodeWordList(words);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('too_many_words');
  });

  it('rejects an over-length payload when decoding', () => {
    const payload = `1.${'A'.repeat(MAX_PAYLOAD_LENGTH)}`;
    const result = decodeWordList(payload);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('too_long');
  });
});

describe('isValidSerializedList', () => {
  it('returns true for a real payload and false for garbage', () => {
    const { payload } = encodeOk(['cat', 'dog']);
    expect(isValidSerializedList(payload)).toBe(true);
    expect(isValidSerializedList('not-a-payload')).toBe(false);
    expect(isValidSerializedList('')).toBe(false);
  });
});

describe('shareable aliases', () => {
  it('createShareableListPayload matches encodeWordList', () => {
    expect(createShareableListPayload).toBe(encodeWordList);
    expect(createShareableListPayload(['cat', 'dog'])).toEqual(
      encodeWordList(['cat', 'dog']),
    );
  });

  it('parseShareableListPayload matches decodeWordList', () => {
    expect(parseShareableListPayload).toBe(decodeWordList);
    const { payload } = encodeOk(['cat', 'dog']);
    expect(parseShareableListPayload(payload)).toEqual(decodeWordList(payload));
  });
});

/**
 * Encode arbitrary text into a payload body the same way the module does, so
 * tests can construct payloads that decode to degenerate word lists.
 */
function encodeBodyForTest(text: string): string {
  const bytes = new TextEncoder().encode(text);
  const alphabet =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  let output = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const b1 = bytes[i];
    const b2 = i + 1 < bytes.length ? bytes[i + 1] : undefined;
    const b3 = i + 2 < bytes.length ? bytes[i + 2] : undefined;
    output += alphabet[b1 >> 2];
    output += alphabet[((b1 & 0b11) << 4) | ((b2 ?? 0) >> 4)];
    if (b2 === undefined) break;
    output += alphabet[((b2 & 0b1111) << 2) | ((b3 ?? 0) >> 6)];
    if (b3 === undefined) break;
    output += alphabet[b3 & 0b111111];
  }
  return output;
}

import { describe, expect, it } from 'vitest';
import { validateWordInput } from './validateWordInput';

describe('validateWordInput', () => {
  it('accepts a simple valid word', () => {
    const result = validateWordInput('friend');
    expect(result.valid).toBe(true);
    expect(result.normalized).toBe('friend');
    expect(result.errors).toEqual([]);
  });

  it('accepts accented words', () => {
    expect(validateWordInput('café').valid).toBe(true);
  });

  it('accepts words with apostrophes and hyphens', () => {
    expect(validateWordInput("o'clock").valid).toBe(true);
    expect(validateWordInput('well-known').valid).toBe(true);
  });

  it('flags empty input', () => {
    const result = validateWordInput('   ');
    expect(result.valid).toBe(false);
    expect(result.errors.map((e) => e.code)).toEqual(['empty']);
  });

  it('flags words that exceed maxLength', () => {
    const result = validateWordInput('a'.repeat(50), { maxLength: 45 });
    expect(result.valid).toBe(false);
    expect(result.errors.map((e) => e.code)).toContain('too_long');
  });

  it('flags words shorter than minLength', () => {
    const result = validateWordInput('hi', { minLength: 3 });
    expect(result.valid).toBe(false);
    expect(result.errors.map((e) => e.code)).toContain('too_short');
  });

  it('flags digits by default', () => {
    const result = validateWordInput('h3llo');
    expect(result.valid).toBe(false);
    expect(result.errors.map((e) => e.code)).toContain('contains_digits');
  });

  it('allows digits when allowDigits is set', () => {
    expect(validateWordInput('h3llo', { allowDigits: true }).valid).toBe(true);
  });

  it('flags disallowed punctuation', () => {
    const result = validateWordInput('hel@lo');
    expect(result.valid).toBe(false);
    expect(result.errors.map((e) => e.code)).toContain('invalid_characters');
  });

  it('rejects internal spaces by default but allows them with allowSpaces', () => {
    expect(validateWordInput('mother in law').valid).toBe(false);
    expect(validateWordInput('mother in law', { allowSpaces: true }).valid).toBe(true);
  });

  it('validates against the normalized form', () => {
    const result = validateWordInput('  Friend,  ');
    expect(result.valid).toBe(true);
    expect(result.normalized).toBe('Friend');
  });

  it('accepts a trailing-apostrophe plural possessive (audited canonical form)', () => {
    expect(validateWordInput("boys'").valid).toBe(true);
    expect(validateWordInput("teachers'").valid).toBe(true);
  });

  it('accepts a name with an internal apostrophe', () => {
    expect(validateWordInput("O'Brien").valid).toBe(true);
  });

  it('rejects malformed repeated punctuation', () => {
    expect(validateWordInput('cat---dog').valid).toBe(false);
    expect(validateWordInput("don''t").valid).toBe(false);
  });

  it('rejects a digit-only entry', () => {
    const result = validateWordInput('123');
    expect(result.valid).toBe(false);
    expect(result.errors.map((e) => e.code)).toContain('contains_digits');
  });

  it('rejects an emoji-only entry as empty (stripped entirely by normalization)', () => {
    const result = validateWordInput('😀');
    expect(result.valid).toBe(false);
    expect(result.errors.map((e) => e.code)).toEqual(['empty']);
  });

  it('rejects the reported bug case outright', () => {
    expect(validateWordInput('!/3428922').valid).toBe(false);
  });

  describe('completed-word validation rejects a mid-typing partial shape', () => {
    // These are legitimate transient states in the live `/play` field
    // sanitizer (sanitizeSpellingCharacters) — a trailing joiner while the
    // student keeps typing — but a *submitted*/completed word ending in a
    // bare hyphen or apostrophe is not a real spelling target.
    it('rejects a trailing hyphen with nothing after it', () => {
      expect(validateWordInput('in-').valid).toBe(false);
    });

    it('allows a single trailing apostrophe on a completed word (the same shape a real plural possessive uses, e.g. boys\')', () => {
      // validateWordInput's completed-word grammar allows one trailing
      // apostrophe on any word — this is what makes `boys'`/`teachers'`
      // valid; it doesn't (and isn't asked to) distinguish "typing was cut
      // off after the apostrophe" from "this is a genuine possessive". The
      // hyphen case below has no such legitimate completed form, which is
      // why it's rejected instead.
      expect(validateWordInput("don'").valid).toBe(true);
      expect(validateWordInput("boys'").valid).toBe(true);
    });

    it('accepts the completed word once typing finishes', () => {
      expect(validateWordInput('in-depth').valid).toBe(true);
      expect(validateWordInput("don't").valid).toBe(true);
    });
  });
});

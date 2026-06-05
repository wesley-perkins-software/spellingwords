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
});

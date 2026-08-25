import { describe, expect, it } from 'vitest';
import { sanitizePageLocation } from './sanitizePageLocation';

describe('sanitizePageLocation', () => {
  it('strips a ?session= query param', () => {
    const url = new URL('https://spellingwords.app/play?session=CanarySession123');
    const result = sanitizePageLocation(url);
    expect(result).toBe('https://spellingwords.app/play');
    expect(result).not.toContain('CanarySession123');
    expect(result).not.toContain('session');
  });

  it('strips a ?list= query payload', () => {
    const url = new URL('https://spellingwords.app/play?list=CanaryPayload456');
    const result = sanitizePageLocation(url);
    expect(result).toBe('https://spellingwords.app/play');
    expect(result).not.toContain('CanaryPayload456');
  });

  it('strips a #list= fragment', () => {
    const url = new URL(
      'https://spellingwords.app/practice-your-own-words#list=CanaryFragmentZXQ731',
    );
    const result = sanitizePageLocation(url);
    expect(result).toBe('https://spellingwords.app/practice-your-own-words');
    expect(result).not.toContain('CanaryFragmentZXQ731');
  });

  it('strips combined query and fragment state', () => {
    const url = new URL('https://spellingwords.app/play?session=abc&list=def#list=ghi');
    const result = sanitizePageLocation(url);
    expect(result).toBe('https://spellingwords.app/play');
  });

  it.each([
    '/',
    '/grades',
    '/grades/2nd-grade',
    '/skills',
    '/skills/silent-e',
    '/practice-your-own-words',
    '/play',
    '/privacy',
  ])('preserves ordinary pathname %s unchanged', (pathname) => {
    const url = new URL(`https://spellingwords.app${pathname}`);
    expect(sanitizePageLocation(url)).toBe(`https://spellingwords.app${pathname}`);
  });
});

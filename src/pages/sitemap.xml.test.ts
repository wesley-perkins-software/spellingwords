import { describe, expect, it } from 'vitest';
import { GET } from './sitemap.xml';

describe('canonical sitemap', () => {
  it('contains exactly 157 unique URLs including the four corrected curriculum destinations', async () => {
    const response = await GET();
    const body = await response.text();
    const locations = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

    expect(locations).toHaveLength(157);
    expect(new Set(locations).size).toBe(157);
    expect(locations).toEqual(
      expect.arrayContaining([
        'https://spellingwords.app/2nd-grade/long-e-ee-ea',
        'https://spellingwords.app/2nd-grade/long-i-ie-igh',
        'https://spellingwords.app/2nd-grade/r-controlled-er-ir-ur',
        'https://spellingwords.app/3rd-grade/suffix-spelling-changes',
      ]),
    );
    expect(body).not.toContain('/3rd-grade/dropping-silent-e');
  });
});

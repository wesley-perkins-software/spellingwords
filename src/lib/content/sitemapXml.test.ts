import { describe, expect, it } from 'vitest';
import { GET } from '@/pages/sitemap.xml';

describe('canonical sitemap', () => {
  it('contains exactly 173 unique URLs including the four corrected curriculum destinations', async () => {
    const response = await GET();
    const body = await response.text();
    const locations = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

    expect(locations).toHaveLength(173);
    expect(new Set(locations).size).toBe(173);
    expect(locations).toEqual(
      expect.arrayContaining([
        'https://spellingwords.app/2nd-grade/core-spelling/long-e-ee-ea',
        'https://spellingwords.app/2nd-grade/core-spelling/long-i-ie-igh',
        'https://spellingwords.app/2nd-grade/core-spelling/r-controlled-er-ir-ur',
        'https://spellingwords.app/3rd-grade/core-spelling/suffix-spelling-changes',
      ]),
    );
    expect(body).not.toContain('/3rd-grade/dropping-silent-e');
  });
});

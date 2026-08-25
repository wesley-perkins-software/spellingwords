import { describe, expect, it } from 'vitest';
import { GET } from '@/pages/sitemap.xml';

describe('canonical sitemap', () => {
  it('contains exactly 183 unique URLs including supporting, legal, curriculum, and the three cross-grade strand gateway destinations', async () => {
    const response = await GET();
    const body = await response.text();
    const locations = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

    expect(locations).toHaveLength(183);
    expect(new Set(locations).size).toBe(183);
    expect(locations).toEqual(
      expect.arrayContaining([
        'https://spellingwords.app/about',
        'https://spellingwords.app/accessibility',
        'https://spellingwords.app/curriculum',
        'https://spellingwords.app/practice-your-own-words',
        'https://spellingwords.app/privacy',
        'https://spellingwords.app/terms',
        'https://spellingwords.app/core-spelling',
        'https://spellingwords.app/high-frequency-words',
        'https://spellingwords.app/themed-spelling-practice',
        'https://spellingwords.app/grades/2nd-grade/core-spelling/long-e-ee-ea',
        'https://spellingwords.app/grades/2nd-grade/core-spelling/long-i-ie-igh',
        'https://spellingwords.app/grades/2nd-grade/core-spelling/r-controlled-er-ir-ur',
        'https://spellingwords.app/grades/3rd-grade/core-spelling/suffix-spelling-changes',
      ]),
    );
    expect(body).not.toContain('/grades/3rd-grade/dropping-silent-e');
  });
});

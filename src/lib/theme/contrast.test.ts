import { describe, expect, it } from 'vitest';
import { contrastRatio, meetsContrast, relativeLuminance } from './contrast';

describe('relativeLuminance', () => {
  it('is 0 for black', () => {
    expect(relativeLuminance('#000000')).toBe(0);
  });

  it('is 1 for white', () => {
    expect(relativeLuminance('#ffffff')).toBeCloseTo(1, 6);
  });
});

describe('contrastRatio', () => {
  it('is 21 for black against white (max possible ratio)', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 6);
  });

  it('is 1 for identical colors', () => {
    expect(contrastRatio('#ffffff', '#ffffff')).toBeCloseTo(1, 6);
    expect(contrastRatio('#4a78c7', '#4a78c7')).toBeCloseTo(1, 6);
  });

  it('matches the canonical WCAG "AA gray" reference pair (#767676 vs white ~4.5)', () => {
    expect(contrastRatio('#767676', '#ffffff')).toBeCloseTo(4.5, 1);
  });

  it('matches a known published reference value for pure blue vs white (~8.59)', () => {
    expect(contrastRatio('#0000ff', '#ffffff')).toBeCloseTo(8.59, 1);
  });

  it('is order-independent', () => {
    expect(contrastRatio('#123456', '#fedcba')).toBeCloseTo(contrastRatio('#fedcba', '#123456'), 10);
  });
});

describe('meetsContrast', () => {
  it('is true when the ratio is at or above the default 4.5 threshold', () => {
    expect(meetsContrast('#000000', '#ffffff')).toBe(true);
  });

  it('is false when the ratio is below the default 4.5 threshold', () => {
    expect(meetsContrast('#767676', '#808080')).toBe(false);
  });

  it('respects a custom minRatio', () => {
    expect(meetsContrast('#767676', '#ffffff', 4.5)).toBe(true);
    expect(meetsContrast('#767676', '#ffffff', 5)).toBe(false);
  });
});

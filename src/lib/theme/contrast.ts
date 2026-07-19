/**
 * WCAG 2.x contrast math. Pure, dependency-free — used to guarantee the
 * grapheme highlight in Grade Unit heroes always meets a minimum readability
 * bar against its background, independent of which world kit it renders on.
 */

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

/** Parses a `#rrggbb` hex string into 0-255 channel values. Callers only ever pass authored literals, never user input. */
export function hexToRgb(hex: string): RgbColor {
  const normalized = hex.replace('#', '');
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function linearizeChannel(channel: number): number {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/** WCAG relative luminance (0-1) of an sRGB color. */
export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * linearizeChannel(r) + 0.7152 * linearizeChannel(g) + 0.0722 * linearizeChannel(b);
}

/** WCAG contrast ratio (1-21) between two colors, order-independent. */
export function contrastRatio(hexA: string, hexB: string): number {
  const luminanceA = relativeLuminance(hexA);
  const luminanceB = relativeLuminance(hexB);
  const lighter = Math.max(luminanceA, luminanceB);
  const darker = Math.min(luminanceA, luminanceB);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Does `foreground` meet `minRatio` (default WCAG AA 4.5:1) against `background`? */
export function meetsContrast(foreground: string, background: string, minRatio = 4.5): boolean {
  return contrastRatio(foreground, background) >= minRatio;
}

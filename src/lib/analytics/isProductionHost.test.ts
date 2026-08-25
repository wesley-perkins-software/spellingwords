import { describe, expect, it } from 'vitest';
import { isProductionHost } from './isProductionHost';

describe('isProductionHost', () => {
  it('accepts the exact production apex hostname', () => {
    expect(isProductionHost('spellingwords.app')).toBe(true);
  });

  it('rejects the www subdomain', () => {
    expect(isProductionHost('www.spellingwords.app')).toBe(false);
  });

  it('rejects localhost', () => {
    expect(isProductionHost('localhost')).toBe(false);
  });

  it('rejects loopback IPs', () => {
    expect(isProductionHost('127.0.0.1')).toBe(false);
  });

  it('rejects Netlify deploy previews', () => {
    expect(isProductionHost('deploy-preview-42--spellingwords.netlify.app')).toBe(false);
  });

  it('rejects Netlify branch deploys', () => {
    expect(isProductionHost('some-branch--spellingwords.netlify.app')).toBe(false);
  });

  it('rejects other netlify.app hosts', () => {
    expect(isProductionHost('spellingwords.netlify.app')).toBe(false);
  });

  it('rejects an empty hostname', () => {
    expect(isProductionHost('')).toBe(false);
  });

  it('rejects a hostname that merely contains the production host as a substring', () => {
    expect(isProductionHost('spellingwords.app.evil.example')).toBe(false);
    expect(isProductionHost('notspellingwords.app')).toBe(false);
  });
});

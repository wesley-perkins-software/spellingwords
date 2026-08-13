import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const BASE = 'http://localhost:4321';
const OUT = '/tmp/claude-0/-home-user-spellingwords/85bfc4a1-6a72-56b9-8ac3-4dfa4a615113/scratchpad/canvas-studies';
mkdirSync(OUT, { recursive: true });

const pages = ['b4-a', 'b4-b', 'f2-a', 'f2-b'];
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

for (const p of pages) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(`${BASE}/design-explore/canvas-studies/${p}`, { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: 'astro-dev-toolbar { display: none !important; }' });
  await page.waitForTimeout(150);
  await page.screenshot({ path: path.join(OUT, `${p}.png`), fullPage: true });
  console.log('saved', p);
  await page.close();
}
await browser.close();
console.log('DONE');

import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const BASE = 'http://localhost:4321';
const OUT = '/tmp/claude-0/-home-user-spellingwords/85bfc4a1-6a72-56b9-8ac3-4dfa4a615113/scratchpad/design-explore-screenshots';

const directions = ['a-spoken-shape', 'b-signage-system', 'c-quiet-system'];
const surfaces = ['home', 'skill', 'play-question', 'grade-hub'];
const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

async function hideDevToolbar(page) {
  await page.addStyleTag({ content: 'astro-dev-toolbar { display: none !important; }' });
}

for (const direction of directions) {
  const dir = path.join(OUT, direction);
  mkdirSync(dir, { recursive: true });
  for (const surface of surfaces) {
    for (const [vpName, vp] of Object.entries(viewports)) {
      const page = await browser.newPage({ viewport: vp });
      await page.goto(`${BASE}/design-explore/${direction}/${surface}`, { waitUntil: 'networkidle' });
      await hideDevToolbar(page);
      await page.waitForTimeout(150);
      const file = path.join(dir, `${surface}-${vpName}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log('saved', file);
      await page.close();
    }
  }
}

// Focus-state screenshots: primary CTA / input on each direction's play-question surface
for (const direction of directions) {
  const page = await browser.newPage({ viewport: viewports.desktop });
  await page.goto(`${BASE}/design-explore/${direction}/play-question`, { waitUntil: 'networkidle' });
  await hideDevToolbar(page);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.waitForTimeout(100);
  const file = path.join(OUT, direction, 'play-question-focus.png');
  await page.screenshot({ path: file, fullPage: false });
  console.log('saved', file);
  await page.close();
}

await browser.close();
console.log('DONE');

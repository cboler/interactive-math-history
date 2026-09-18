import { chromium } from '@playwright/test';
import path from 'path';

const artifactsDir = 'C:\\Users\\chris\\.gemini\\antigravity-ide\\brain\\a8939f8c-82c1-4140-9081-134bd244d34b';

async function capture() {
  const browser = await chromium.launch();

  for (const scheme of ['dark', 'light']) {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      colorScheme: scheme,
    });
    const page = await context.newPage();

    const urls = [
      { url: 'http://localhost:4200/foundations/origins-of-addition', name: `unit-01-${scheme}.png` },
      { url: 'http://localhost:4200/foundations/euclids-common-notions', name: `unit-02-${scheme}.png` },
      { url: 'http://localhost:4200/elementary/spatial-invariance-multiplication', name: `unit-03-${scheme}.png` },
      { url: 'http://localhost:4200/elementary/egyptian-unit-fractions-rhind', name: `unit-04-${scheme}.png` },
    ];

    for (const item of urls) {
      await page.goto(item.url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(400);
      const dest = path.join(artifactsDir, item.name);
      await page.screenshot({ path: dest, fullPage: false });
      console.log(`Captured ${item.name}`);
    }

    await context.close();
  }

  await browser.close();
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});

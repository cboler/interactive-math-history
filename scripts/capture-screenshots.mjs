import { chromium } from '@playwright/test';
import path from 'path';

const artifactsDir =
  'C:\\Users\\chris\\.gemini\\antigravity-ide\\brain\\9ac1cc21-20b0-4b55-9d63-a1ee10eabca9';

async function capture() {
  const browser = await chromium.launch();

  // Desktop Light
  {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      colorScheme: 'light',
    });
    const page = await context.newPage();
    await page.goto('http://localhost:4200/foundations/aristotelian-logic-circuits', {
      waitUntil: 'networkidle',
    });
    await page.waitForTimeout(400);

    // Streamlined header
    await page.screenshot({
      path: path.join(artifactsDir, 'streamlined-header-light.png'),
      clip: { x: 0, y: 0, width: 1280, height: 260 },
    });

    // Scroll down to test Back-to-Top button
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(artifactsDir, 'back-to-top-button-visible.png'),
    });

    // Bottom navigation
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(artifactsDir, 'lesson-bottom-nav.png'),
    });

    await context.close();
  }

  // Desktop Dark
  {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      colorScheme: 'dark',
    });
    const page = await context.newPage();
    await page.goto('http://localhost:4200/foundations/aristotelian-logic-circuits', {
      waitUntil: 'networkidle',
    });
    await page.waitForTimeout(400);

    await page.screenshot({
      path: path.join(artifactsDir, 'streamlined-header-dark.png'),
      clip: { x: 0, y: 0, width: 1280, height: 260 },
    });

    await context.close();
  }

  // Mobile Viewport (iPhone 13 - 390x844)
  {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      colorScheme: 'light',
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:4200/foundations/aristotelian-logic-circuits', {
      waitUntil: 'networkidle',
    });
    await page.waitForTimeout(400);

    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(artifactsDir, 'mobile-back-to-top.png'),
    });

    await context.close();
  }

  await browser.close();
  console.log('Screenshots captured successfully!');
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});

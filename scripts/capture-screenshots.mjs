import { chromium } from '@playwright/test';
import path from 'path';

const artifactsDir =
  'C:\\Users\\chris\\.gemini\\antigravity-ide\\brain\\3262c97a-73a0-42d2-8753-82a2ffcedcd0';

async function capture() {
  const browser = await chromium.launch();

  // Desktop Light
  {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      colorScheme: 'light',
    });
    const page = await context.newPage();
    await page.goto('http://localhost:4200/geometry/euclids-first-construction-equilateral', {
      waitUntil: 'networkidle',
    });
    await page.waitForTimeout(500);

    // 1. Initial State (Step 1: Baseline AB)
    await page.screenshot({
      path: path.join(artifactsDir, 'unit-06-desktop-light-step1.png'),
    });

    // 2. Step 2 (Sweep Circle A)
    const nextBtn = page.locator('#next-step-btn');
    await nextBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(artifactsDir, 'unit-06-desktop-light-step2.png'),
    });

    // 3. Step 3 (Sweep Circle B)
    await nextBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(artifactsDir, 'unit-06-desktop-light-step3.png'),
    });

    // 4. Step 4 (Triangle completed & QED)
    await nextBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(artifactsDir, 'unit-06-desktop-light-step4.png'),
    });

    // 5. Open drawer and filter by Geometry
    const drawerToggle = page.locator('#drawer-toggle-btn');
    await drawerToggle.click();
    await page.waitForTimeout(300);
    const geomFilterBtn = page.locator('.strand-filter-btn', { hasText: 'Geometry' });
    await geomFilterBtn.click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(artifactsDir, 'unit-06-drawer-geometry-filter.png'),
    });

    await context.close();
  }

  // Desktop Dark
  {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      colorScheme: 'dark',
    });
    const page = await context.newPage();
    await page.goto('http://localhost:4200/geometry/euclids-first-construction-equilateral', {
      waitUntil: 'networkidle',
    });
    await page.waitForTimeout(500);

    // Jump to Step 4
    const step4Tab = page.locator('.stepper-tab', { hasText: 'Equilateral △ABC' });
    await step4Tab.click();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: path.join(artifactsDir, 'unit-06-desktop-dark-step4.png'),
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
    await page.goto('http://localhost:4200/geometry/euclids-first-construction-equilateral', {
      waitUntil: 'networkidle',
    });
    await page.waitForTimeout(500);

    const step4Tab = page.locator('.stepper-tab', { hasText: 'Equilateral △ABC' });
    await step4Tab.click();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: path.join(artifactsDir, 'unit-06-mobile-step4.png'),
    });

    await context.close();
  }

  // Theme Toggle Demo (Light & Dark toggle action)
  {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      colorScheme: 'light',
    });
    const page = await context.newPage();
    await page.goto('http://localhost:4200/geometry/euclids-first-construction-equilateral', {
      waitUntil: 'networkidle',
    });
    await page.waitForTimeout(500);

    // Initial Light state with theme button (Moon icon)
    await page.screenshot({
      path: path.join(artifactsDir, 'theme-toggle-light-mode.png'),
    });

    // Click theme toggle button -> switches to Dark mode (Sun icon)
    const themeBtn = page.locator('#theme-toggle-btn');
    await themeBtn.click();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: path.join(artifactsDir, 'theme-toggle-dark-mode.png'),
    });

    await context.close();
  }

  // Slide-Over Drawer Demo: Scrolled to bottom of Unit 01, opening outline via #bottom-drawer-toggle-btn
  {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      colorScheme: 'dark',
    });
    const page = await context.newPage();
    await page.goto('http://localhost:4200/foundations/origins-of-addition', {
      waitUntil: 'networkidle',
    });
    await page.waitForTimeout(500);

    // Scroll to the bottom where the user was
    const bottomDrawerBtn = page.locator('#bottom-drawer-toggle-btn');
    await bottomDrawerBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Click bottom outline button
    await bottomDrawerBtn.click();
    await page.waitForTimeout(400);

    // Capture screenshot showing the slide-over drawer visible at the bottom of the page!
    await page.screenshot({
      path: path.join(artifactsDir, 'slide-over-drawer-bottom-scrolled.png'),
    });

    await context.close();
  }

  // Mobile Slide-Over Drawer Demo
  {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      colorScheme: 'light',
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:4200/foundations/origins-of-addition', {
      waitUntil: 'networkidle',
    });
    await page.waitForTimeout(500);

    // Open drawer
    const drawerToggle = page.locator('#drawer-toggle-btn');
    await drawerToggle.click();
    await page.waitForTimeout(400);

    await page.screenshot({
      path: path.join(artifactsDir, 'slide-over-drawer-mobile.png'),
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

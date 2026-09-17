import { test, expect } from '@playwright/test';

test.describe('Responsive Shell & Curriculum Smoke Tests', () => {
  test('should load application cleanly and navigate through curriculum units', async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', (err) => {
      consoleErrors.push(err.message);
    });

    await page.goto('/');

    // 1. Root shell and brand verification
    await expect(page.locator('.brand-title')).toHaveText('Interactive Math & History');
    await expect(page.locator('.brand-logo')).toHaveText('∑');

    // 2. Primary layout elements are visible
    await expect(page.locator('header[role="banner"]')).toBeVisible();
    await expect(page.locator('main[role="main"]')).toBeVisible();
    await expect(page.locator('footer[role="contentinfo"]')).toBeVisible();

    // 3. Reader article and narrative content for Unit 01
    const article = page.locator('article.reader-article');
    await expect(article).toBeVisible();
    await expect(page.locator('h1')).toContainText('The Origin of Combining');
    await expect(page.locator('.formula-badge code')).toHaveText('a + b = c');
    await expect(page.locator('.historical-card')).toBeVisible();

    // 4. Interactive stage and vector visualizer
    await expect(page.locator('.interactive-stage')).toBeVisible();
    await expect(page.locator('figure.visualizer-container svg')).toBeVisible();
    await expect(page.locator('#quantity-a-input')).toBeVisible();
    await expect(page.locator('#quantity-b-input')).toBeVisible();

    // 5. Navigate to Unit 02 via Next button
    const nextBtn = page.locator('#next-lesson-btn');
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();

    await expect(page.locator('h1')).toContainText("Euclid's Common Notions");
    await expect(page.locator('.formula-badge code')).toHaveText('If A = B and B = C, then A = C');

    // 6. Navigate to Unit 03 via Next button
    await nextBtn.click();
    await expect(page.locator('h1')).toContainText('Spatial Invariance');
    await expect(page.locator('.formula-badge code')).toHaveText('A × B = B × A');

    // 7. Navigate back to Unit 02 via Previous button
    const prevBtn = page.locator('#prev-lesson-btn');
    await expect(prevBtn).toBeVisible();
    await prevBtn.click();
    await expect(page.locator('h1')).toContainText("Euclid's Common Notions");

    // 8. Prevent accidental horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBeFalsy();

    // 9. Zero unhandled console errors or exceptions
    expect(consoleErrors).toEqual([]);
  });
});

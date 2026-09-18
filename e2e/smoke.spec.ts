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
    await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveAttribute(
      'href',
      'favicon.svg',
    );
    await expect(page.locator('link[rel="icon"][type="image/x-icon"]')).toHaveAttribute(
      'href',
      'favicon.ico',
    );

    // 2. Primary layout elements are visible
    await expect(page.locator('header[role="banner"]')).toBeVisible();
    await expect(page.locator('main[role="main"]')).toBeVisible();
    await expect(page.locator('footer[role="contentinfo"]')).toBeVisible();

    // 3. Reader article and narrative content for Unit 01
    const article = page.locator('article.reader-article');
    await expect(article).toBeVisible();
    await expect(page.locator('h1')).toContainText('The Origin of Combining');
    await expect(page.locator('.formula-badge code')).toHaveText('a + b = c');
    await expect(page.locator('.discovery-card')).toBeVisible();
    await expect(page.locator('.artifact-plate')).toBeVisible();
    await expect(page.locator('.epistemic-card')).toBeVisible();

    // 4. Interactive stage and vector visualizer (Addition and Subtraction)
    await expect(page.locator('.interactive-stage')).toBeVisible();
    await expect(page.locator('figure.visualizer-container svg')).toBeVisible();
    await expect(page.locator('#quantity-a-input')).toBeVisible();
    await expect(page.locator('#quantity-b-input')).toBeVisible();

    // Verify subtraction vector direction (arrow pointing left towards result)
    const subtractBtn = page.locator('#subtract-op-btn');
    await expect(subtractBtn).toBeVisible();
    await subtractBtn.click();
    const vectorB = page.locator('line.vector-b');
    await expect(vectorB).toBeAttached();
    await expect(vectorB).toHaveAttribute('x1', '190');
    await expect(vectorB).toHaveAttribute('x2', '85');
    await expect(vectorB).toHaveAttribute('marker-end', 'url(#arrow-amber)');

    // 5. Navigate to Unit 02 via Next button
    const navLink = page.locator('#nav-link-curriculum');
    await expect(navLink).toHaveText('Unit 01: Addition');
    await expect(page).toHaveTitle(/Unit 01: Addition/);

    const nextBtn = page.locator('#next-lesson-btn');
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();

    await expect(page.locator('h1')).toContainText("Euclid's Common Notions");
    await expect(page.locator('.formula-badge code')).toHaveText(
      '\\text{If } A = B \\text{ and } B = C \\text{, then } A = C',
    );
    await expect(navLink).toHaveText('Unit 02: Equality');
    await expect(page).toHaveTitle(/Unit 02: Equality/);

    // Verify Balance Scale visualizer is active and controls are adapted
    await expect(page.locator('app-balance-scale')).toBeVisible();
    await expect(page.locator('app-number-line')).toBeHidden();
    await expect(page.locator('label[for="quantity-a-input"]')).toContainText('Left Pan (A):');
    await expect(page.locator('label[for="quantity-b-input"]')).toContainText('Right Pan (B):');
    await expect(page.locator('.btn-group')).toBeHidden();

    // Verify Equilibrium badge on 5 = 5
    const eqBadge = page.locator('#equilibrium-indicator');
    await expect(eqBadge).toBeVisible();
    await expect(eqBadge).toContainText('Equilibrium');
    await expect(eqBadge).toContainText('(5 = 5)');

    // Test tipping the scale: Increase Left Pan (A) to 8
    const sliderA = page.locator('#quantity-a-input');
    await sliderA.fill('8');
    await expect(eqBadge).toBeHidden();
    const tiltBadge = page.locator('.tilt-badge');
    await expect(tiltBadge).toBeVisible();
    await expect(tiltBadge).toContainText('Tipped Left: Pan A is heavier (+3)');

    // Restore to 5 = 5
    await sliderA.fill('5');
    await expect(eqBadge).toBeVisible();

    // 6. Navigate to Unit 03 via Next button
    await nextBtn.click();
    await expect(page.locator('h1')).toContainText('Spatial Invariance');
    await expect(page.locator('.formula-badge code')).toHaveText('a \\times b = b \\times a');
    await expect(navLink).toHaveText('Unit 03: Multiplication');
    await expect(page).toHaveTitle(/Unit 03: Multiplication/);

    // Verify Grid Array visualizer is active and controls are adapted
    await expect(page.locator('app-grid-array')).toBeVisible();
    await expect(page.locator('app-balance-scale')).toBeHidden();
    await expect(page.locator('app-number-line')).toBeHidden();
    await expect(page.locator('label[for="quantity-a-input"]')).toContainText('Rows (A):');
    await expect(page.locator('label[for="quantity-b-input"]')).toContainText('Columns (B):');
    await expect(page.locator('.btn-group')).toBeHidden();

    // Verify formula banner in standard layout (3 rows × 5 columns)
    const gridFormula = page.locator('#grid-formula');
    await expect(gridFormula).toHaveText('3 × 5 = 15 dots');

    // Test Transpose button
    const transposeBtn = page.locator('#transpose-btn');
    await expect(transposeBtn).toBeVisible();
    await transposeBtn.click();
    await expect(gridFormula).toHaveText('5 × 3 = 15 dots');

    // 7. Navigate to Unit 04 via Next button
    await nextBtn.click();
    await expect(page.locator('h1')).toContainText('The Bread Partition');
    await expect(page.locator('.formula-badge code')).toHaveText(
      '\\frac{3}{5} = \\frac{1}{2} + \\frac{1}{10}',
    );
    await expect(navLink).toHaveText('Unit 04: Fractions');
    await expect(page).toHaveTitle(/Unit 04: Fractions/);

    // Verify Bread Slicer visualizer is active and slider controls are hidden
    await expect(page.locator('app-bread-slicer')).toBeVisible();
    await expect(page.locator('.controls-panel')).toBeHidden();
    await expect(page.locator('app-grid-array')).toBeHidden();

    // Verify Rhind Papyrus plate and Epistemic Card
    await expect(page.locator('.artifact-plate img')).toHaveAttribute(
      'src',
      /.*Rhind_Mathematical_Papyrus\.jpg/,
    );
    await expect(page.locator('.epistemic-card')).toBeVisible();

    // Test Ahmes Solution trigger in bread slicer
    const demoBtn = page.locator('.btn-demo');
    await expect(demoBtn).toBeVisible();
    await demoBtn.click();

    const solvedBanner = page.locator('.solved-banner');
    await expect(solvedBanner).toBeVisible();
    await expect(solvedBanner).toContainText("Ahmes' Equilibrium Achieved!");

    // 8. Navigate back to Unit 03 via Previous button
    const prevBtn = page.locator('#prev-lesson-btn');
    await expect(prevBtn).toBeVisible();
    await prevBtn.click();
    await expect(page.locator('h1')).toContainText('Spatial Invariance');
    await expect(navLink).toHaveText('Unit 03: Multiplication');
    await expect(page).toHaveTitle(/Unit 03: Multiplication/);
    await expect(page.locator('app-grid-array')).toBeVisible();

    // 9. Prevent accidental horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBeFalsy();

    // 10. Zero unhandled console errors or exceptions
    expect(consoleErrors).toEqual([]);
  });

  test('should support direct URL deep-linking to curriculum levels and units', async ({
    page,
  }) => {
    // 1. Direct deep-link to Unit 03
    await page.goto('/arithmetic/spatial-invariance-multiplication');
    await expect(page.locator('h1')).toContainText('Spatial Invariance');
    await expect(page.locator('#grid-formula')).toHaveText('3 × 5 = 15 dots');
    await expect(page.locator('app-grid-array')).toBeVisible();
    await expect(page.locator('#nav-link-curriculum')).toHaveText('Unit 03: Multiplication');

    // 2. Direct deep-link to Unit 04
    await page.goto('/elementary/egyptian-unit-fractions-rhind');
    await expect(page.locator('h1')).toContainText('The Bread Partition');
    await expect(page.locator('app-bread-slicer')).toBeVisible();
    await expect(page.locator('#nav-link-curriculum')).toHaveText('Unit 04: Fractions');

    // 3. Direct deep-link to Unit 02 via order/alias
    await page.goto('/foundations/unit-02');
    await expect(page.locator('h1')).toContainText("Euclid's Common Notions");
    await expect(page.locator('app-balance-scale')).toBeVisible();

    // 4. Fallback on invalid route redirecting to canonical Unit 01
    await page.goto('/nonexistent/unknown');
    await expect(page).toHaveURL(/.*foundations\/origins-of-addition/);
    await expect(page.locator('h1')).toContainText('The Origin of Combining');
    await expect(page.locator('app-number-line')).toBeVisible();
  });
});

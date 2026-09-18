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

    // Verify Theme Toggle Button
    const themeBtn = page.locator('#theme-toggle-btn');
    await expect(themeBtn).toBeVisible();
    await themeBtn.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await themeBtn.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    // 3. Reader article and narrative content for Unit 01
    const article = page.locator('article.reader-article');
    await expect(article).toBeVisible();
    await expect(page.locator('h1')).toContainText('The Origin of Combining');
    await expect(page.locator('.formula-badge .katex')).toBeVisible();
    await expect(page.locator('.formula-badge')).toContainText('a');
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
    const unitBadge = page.locator('.unit-level-badge');
    await expect(unitBadge).toContainText('Unit 1 of 6');
    await expect(page).toHaveTitle(/Unit 01: Addition/);

    const nextBtn = page.locator('#next-lesson-btn');
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();

    await expect(page.locator('h1')).toContainText("Euclid's Common Notions");
    await expect(page.locator('.formula-badge .katex')).toBeVisible();
    await expect(page.locator('.formula-badge')).toContainText('A = B');
    await expect(unitBadge).toContainText('Unit 2 of 6');
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
    await expect(page.locator('.formula-badge .katex')).toBeVisible();
    await expect(page.locator('.formula-badge')).toContainText('a');
    await expect(unitBadge).toContainText('Unit 3 of 6');
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
    await expect(page.locator('.formula-badge .katex')).toBeVisible();
    await expect(page.locator('.formula-badge')).toContainText('3');
    await expect(unitBadge).toContainText('Unit 4 of 6');
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

    // 8. Navigate to Unit 05 via Next button
    await nextBtn.click();
    await expect(page.locator('h1')).toContainText('Architecture of Reason');
    await expect(page.locator('.formula-badge .katex')).toBeVisible();
    await expect(unitBadge).toContainText('Unit 5 of 6');
    await expect(page).toHaveTitle(/Unit 05: Logic/);

    // Verify Logic Circuit visualizer is active and slider controls are hidden
    await expect(page.locator('app-logic-circuit')).toBeVisible();
    await expect(page.locator('.controls-panel')).toBeHidden();
    await expect(page.locator('app-bread-slicer')).toBeHidden();

    // Verify Aristotle bust plate and Epistemic Card
    await expect(page.locator('.artifact-plate img')).toHaveAttribute(
      'src',
      /.*Aristotle_Altemps_Inv8575\.jpg/,
    );
    await expect(page.locator('.epistemic-card')).toBeVisible();

    // Verify initial circuit state: AND gate, P=true, Q=false -> Lamp Extinguished
    const circuitBadge = page.locator('.circuit-status-badge');
    await expect(circuitBadge).toContainText('Circuit Open · Lamp Extinguished');

    // Toggle switch Q to close circuit in AND mode (P=true, Q=true)
    const switchQBtn = page.locator('#switch-q-btn');
    await switchQBtn.click();
    await expect(circuitBadge).toContainText('Circuit Closed · Lamp Lit');

    // Switch to OR mode
    const gateOrBtn = page.locator('#gate-or-btn');
    await gateOrBtn.click();
    await expect(circuitBadge).toContainText('Circuit Closed · Lamp Lit');

    // Toggle switch P to false in OR mode (P=false, Q=true) -> Still Lit
    const switchPBtn = page.locator('#switch-p-btn');
    await switchPBtn.click();
    await expect(circuitBadge).toContainText('Circuit Closed · Lamp Lit');

    // Toggle switch Q to false in OR mode (P=false, Q=false) -> Extinguished
    await switchQBtn.click();
    await expect(circuitBadge).toContainText('Circuit Open · Lamp Extinguished');

    // 9. Navigate to Unit 06 via Next button
    await nextBtn.click();
    await expect(page.locator('h1')).toContainText('The First Construction');
    await expect(page.locator('.formula-badge .katex')).toBeVisible();
    await expect(unitBadge).toContainText('Unit 6 of 6');
    await expect(page).toHaveTitle(/Unit 06: Geometry/);

    // Verify Geometric Compass visualizer is active and slider controls are hidden
    await expect(page.locator('app-geometric-compass')).toBeVisible();
    await expect(page.locator('.controls-panel')).toBeHidden();
    await expect(page.locator('app-logic-circuit')).toBeHidden();

    // Verify Byzantine manuscript plate and Epistemic Card
    await expect(page.locator('.artifact-plate img')).toHaveAttribute(
      'src',
      /.*Byzantine_Euclid\.png/,
    );
    await expect(page.locator('.epistemic-card')).toBeVisible();

    // Verify initial compass state: step 1 (baseline AB only)
    const compassContainer = page.locator('app-geometric-compass');
    await expect(compassContainer.locator('.baseline-ab')).toBeAttached();
    await expect(compassContainer.locator('.circle-a')).not.toBeAttached();
    await expect(compassContainer.locator('.circle-b')).not.toBeAttached();
    await expect(compassContainer.locator('.equilateral-fill')).not.toBeAttached();

    // Step 2: Sweep Circle A
    const compassNextBtn = compassContainer.locator('#next-step-btn');
    await compassNextBtn.click();
    await expect(compassContainer.locator('.circle-a')).toBeAttached();

    // Step 3: Sweep Circle B
    await compassNextBtn.click();
    await expect(compassContainer.locator('.circle-b')).toBeAttached();

    // Step 4: Complete Equilateral Triangle
    await compassNextBtn.click();
    await expect(compassContainer.locator('.equilateral-fill')).toBeAttached();
    await expect(compassContainer.locator('.qed-badge')).toBeVisible();

    // Test Baseline Length Slider
    const baseSlider = compassContainer.locator('#base-length-slider');
    await baseSlider.fill('200');
    await expect(compassContainer.locator('.dimension-label')).toContainText('L = 200px');

    // 10. Test Curriculum Drawer & Domain Strand Filtering
    const drawerToggle = page.locator('#drawer-toggle-btn');
    await drawerToggle.click();
    const drawerPanel = page.locator('#curriculum-drawer');
    await expect(drawerPanel).toBeVisible();

    // Filter to Logic strand
    const logicFilterBtn = drawerPanel.locator('.strand-filter-btn', { hasText: 'Logic' });
    await logicFilterBtn.click();
    await expect(drawerPanel.locator('.stepper-item')).toHaveCount(2);

    // Filter to Numeracy strand
    const numFilterBtn = drawerPanel.locator('.strand-filter-btn', { hasText: 'Numeracy' });
    await numFilterBtn.click();
    await expect(drawerPanel.locator('.stepper-item')).toHaveCount(1);

    // Filter to Geometry strand
    const geomFilterBtn = drawerPanel.locator('.strand-filter-btn', { hasText: 'Geometry' });
    await geomFilterBtn.click();
    await expect(drawerPanel.locator('.stepper-item')).toHaveCount(1);
    await expect(drawerPanel.locator('.stepper-item .stepper-title')).toContainText(
      'The First Construction',
    );

    // Filter to All
    const allFilterBtn = drawerPanel.locator('.strand-filter-btn', { hasText: 'All' });
    await allFilterBtn.click();
    await expect(drawerPanel.locator('.stepper-item')).toHaveCount(6);

    // Close drawer
    const drawerCloseBtn = drawerPanel.locator('.drawer-close-btn');
    await drawerCloseBtn.click();
    await expect(drawerPanel).toBeHidden();

    // 11. Verify navigation aids: End-of-Lesson Navigation & Floating Back-to-Top Button
    const bottomPrevBtn = page.locator('#bottom-prev-lesson-btn');
    const bottomNextBtn = page.locator('#bottom-next-lesson-btn');
    const bottomDrawerBtn = page.locator('#bottom-drawer-toggle-btn');
    await expect(bottomPrevBtn).toBeVisible();
    await expect(bottomNextBtn).toBeDisabled(); // On last unit (Unit 06)
    await expect(bottomDrawerBtn).toBeVisible();

    // Verify Bottom Drawer Toggle opens the slide-over drawer visibly
    await bottomDrawerBtn.click();
    await expect(drawerPanel).toBeVisible();
    const backdrop = page.locator('.drawer-backdrop');
    await expect(backdrop).toBeVisible();
    await backdrop.click({ position: { x: 10, y: 10 } });
    await expect(drawerPanel).toBeHidden();

    // Scroll down to test Back-to-Top floating button
    await page.evaluate(() => window.scrollTo(0, 1000));
    const backToTopBtn = page.locator('#back-to-top-btn');
    await expect(backToTopBtn).toBeVisible();
    await backToTopBtn.click();
    await page.waitForFunction(() => window.scrollY < 100);
    expect(await page.evaluate(() => window.scrollY)).toBeLessThan(100);

    // 12. Navigate back to Unit 05 via bottom Previous button
    await bottomPrevBtn.click();
    await expect(page.locator('h1')).toContainText('Architecture of Reason');
    await expect(unitBadge).toContainText('Unit 5 of 6');
    await expect(page.locator('app-logic-circuit')).toBeVisible();

    // 13. Prevent accidental horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBeFalsy();

    // 14. Zero unhandled console errors or exceptions
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
    await expect(page.locator('.unit-level-badge')).toContainText('Unit 3 of 6');
    await expect(page).toHaveTitle(/Unit 03: Multiplication/);

    // 2. Direct deep-link to Unit 04
    await page.goto('/elementary/egyptian-unit-fractions-rhind');
    await expect(page.locator('h1')).toContainText('The Bread Partition');
    await expect(page.locator('app-bread-slicer')).toBeVisible();
    await expect(page.locator('.unit-level-badge')).toContainText('Unit 4 of 6');
    await expect(page).toHaveTitle(/Unit 04: Fractions/);

    // 3. Direct deep-link to Unit 05
    await page.goto('/foundations/aristotelian-logic-circuits');
    await expect(page.locator('h1')).toContainText('Architecture of Reason');
    await expect(page.locator('app-logic-circuit')).toBeVisible();
    await expect(page.locator('.unit-level-badge')).toContainText('Unit 5 of 6');
    await expect(page).toHaveTitle(/Unit 05: Logic/);

    // 4. Direct deep-link to Unit 06
    await page.goto('/geometry/euclids-first-construction-equilateral');
    await expect(page.locator('h1')).toContainText('The First Construction');
    await expect(page.locator('app-geometric-compass')).toBeVisible();
    await expect(page.locator('.unit-level-badge')).toContainText('Unit 6 of 6');
    await expect(page).toHaveTitle(/Unit 06: Geometry/);

    // 5. Direct deep-link to Unit 06 via order/alias
    await page.goto('/foundations/unit-06');
    await expect(page.locator('h1')).toContainText('The First Construction');
    await expect(page.locator('app-geometric-compass')).toBeVisible();

    // 6. Direct deep-link to Unit 05 via order/alias
    await page.goto('/foundations/unit-05');
    await expect(page.locator('h1')).toContainText('Architecture of Reason');
    await expect(page.locator('app-logic-circuit')).toBeVisible();

    // 7. Direct deep-link to Unit 02 via order/alias
    await page.goto('/foundations/unit-02');
    await expect(page.locator('h1')).toContainText("Euclid's Common Notions");
    await expect(page.locator('app-balance-scale')).toBeVisible();

    // 8. Fallback on invalid route redirecting to canonical Unit 01
    await page.goto('/nonexistent/unknown');
    await expect(page).toHaveURL(/.*foundations\/origins-of-addition/);
    await expect(page.locator('h1')).toContainText('The Origin of Combining');
    await expect(page.locator('app-number-line')).toBeVisible();
  });
});

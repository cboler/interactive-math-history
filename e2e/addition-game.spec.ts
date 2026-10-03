import { test, expect } from '@playwright/test';

for (const theme of ['light', 'dark'] as const) {
  test(`addition game supports typed and calculator answers, navigation and replay in ${theme}`, async ({
    page,
  }, testInfo) => {
    await page.emulateMedia({ colorScheme: theme });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/foundations/origins-of-addition');
    const game = page.locator('app-addition-game');
    const equation = game.locator('.question-equation');
    const answer = game.locator('#addition-answer');
    const previous = game.getByRole('button', { name: 'Previous question' });
    const next = game.getByRole('button', { name: 'Next question' });
    const operands = async () => {
      await expect(equation).toHaveText(/^\s*\d \+ \d = \?\s*$/);
      const match = (await equation.innerText()).trim().match(/^(\d) \+ (\d) = \?$/)!;
      expect(match).toBeTruthy();
      return [Number(match[1]), Number(match[2])];
    };
    await expect(previous).toBeDisabled();
    await expect(game.locator('.calculator-total')).toHaveText('0');
    await answer.fill('0');
    await answer.press('Enter');
    await expect(game.locator('.game-feedback')).toHaveText('Try again');
    await expect(game.locator('.game-progress')).toHaveText('0/6 ★');
    const first = await operands();
    await answer.fill(String(first[0] + first[1]));
    await answer.press('Enter');
    await expect(game.locator('.game-progress')).toHaveText('1/6 ★');
    await next.click();
    await expect(answer).toHaveValue('');
    await expect(game.getByRole('spinbutton', { name: 'First number', exact: true })).toHaveValue(
      '0',
    );
    await expect(game.getByRole('spinbutton', { name: 'Second number', exact: true })).toHaveValue(
      '0',
    );
    const second = await operands();
    await game.getByRole('slider', { name: 'First number slider' }).fill(String(second[0]));
    await game.getByRole('slider', { name: 'Second number slider' }).fill(String(second[1]));
    await expect(game.locator('.game-progress')).toHaveText('1/6 ★');
    await game.locator('.calculator-total').click();
    await expect(game.locator('.game-progress')).toHaveText('2/6 ★');
    await previous.click();
    await expect(equation).toHaveText(`${first[0]} + ${first[1]} = ${first[0] + first[1]}`);
    await expect(game.locator('.calculator-total')).toHaveText('0');
    await game.getByRole('spinbutton', { name: 'First number', exact: true }).fill('');
    await next.click();
    await expect(game.getByRole('spinbutton', { name: 'First number', exact: true })).toHaveValue(
      '0',
    );
    await next.click();
    await expect(game.locator('.question-position')).toHaveText('3/6');
    const third = await equation.innerText();
    await page.reload();
    await expect(equation).toHaveText(third);
    await expect(game.locator('.game-progress')).toHaveText('2/6 ★');
    await expect(game.locator('.calculator-total')).toHaveText('0');
    await game.scrollIntoViewIfNeeded();
    await expect(game.locator('.question-equation')).toBeInViewport({ ratio: 1 });
    await expect(game.locator('.calculator')).toBeInViewport({ ratio: 1 });
    await game.screenshot({ path: testInfo.outputPath(`addition-game-${theme}.png`) });
    await page.screenshot({ path: testInfo.outputPath(`addition-page-${theme}.png`) });
    await game.getByRole('button', { name: 'Play again' }).click();
    await expect(game.locator('.game-progress')).toHaveText('0/6 ★');
    await expect(previous).toBeDisabled();
    const seen = new Set<string>();
    for (let i = 0; i < 6; i++) {
      const [a, b] = await operands();
      expect(a + b).toBeLessThan(10);
      expect(a).toBeGreaterThan(0);
      expect(b).toBeGreaterThan(0);
      seen.add(`${a}+${b}`);
      await answer.fill(String(a + b));
      await game.getByRole('button', { name: 'Check', exact: true }).click();
      await expect(game.locator('.game-progress')).toHaveText(`${i + 1}/6 ★`);
      if (i < 5) await next.click();
    }
    expect(seen.size).toBe(6);
    await expect(next).toBeDisabled();
    await expect(game.locator('.game-feedback')).toHaveText('Six stars! ★');
    await page.getByRole('button', { name: 'All Lessons', exact: true }).first().click();
    await expect(page.locator('.stepper-item').first()).toContainText('6 of 6 stars');
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
    expect(errors).toEqual([]);
  });
}

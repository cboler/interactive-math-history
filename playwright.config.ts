import { defineConfig } from '@playwright/test';

// Set E2E_PORT when another project's dev server already occupies 4200
const port = process.env['E2E_PORT'] ?? '4200';
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  workers: process.env['CI'] ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'phone-portrait',
      use: {
        viewport: { width: 390, height: 844 },
      },
    },
    {
      name: 'phone-landscape',
      use: {
        viewport: { width: 844, height: 390 },
      },
    },
    {
      name: 'tablet-portrait',
      use: {
        viewport: { width: 768, height: 1024 },
      },
    },
    {
      name: 'desktop',
      use: {
        viewport: { width: 1280, height: 800 },
      },
    },
  ],
  webServer: {
    command: `npm start -- --port ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env['CI'],
    timeout: 120 * 1000,
  },
});

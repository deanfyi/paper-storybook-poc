// Runs every story as a test in headless Chromium: each story must render without errors and
// its play function (e.g. CopyButton's copy → copied → reset) must pass. Same Vite config as
// Storybook (main.ts viteFinal), so Tailwind and tokens apply.
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [storybookTest({ configDir: '.storybook' })],
  test: {
    name: 'storybook',
    browser: { enabled: true, headless: true, provider: playwright(), instances: [{ browser: 'chromium' }] },
    setupFiles: ['.storybook/vitest.setup.ts'],
  },
})

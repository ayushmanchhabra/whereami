import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['json', 'json-summary'],
      reportOnFailure: true,
    },
    environment: 'jsdom',
    setupFiles: ['./src/setup.ts']
  },
})

/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config'

/**
 * The test runner reads the same configuration as the site, so the addresses a test builds carry the
 * base the site is published under.
 */
export default getViteConfig({
  test: {
    include: ['src/**/*.test.ts', 'tools/**/*.test.mjs'],
  },
})

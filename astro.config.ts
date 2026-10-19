import { unified } from '@astrojs/markdown-remark'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import { rehypeSections, remarkNotes, runnableKotlin } from './src/content/markdown'
import { SITE } from './src/content/site'

/** The module Vite imports its preload helper from, a virtual one it resolves on its own. */
const PRELOAD_HELPER = '\0vite/preload-helper.js'

/**
 * The bundler plugin that replaces the preload helper with one that only imports.
 *
 * The stock helper preloads the stylesheets and shared files of what is imported, and ships with the
 * first file that defers an import. Here that file is the search page, whose only deferred import is the
 * Pagefind index, which has nothing to preload. The stock helper would cost that page more than a
 * kilobyte of script for nothing.
 */
function importWithoutPreload() {
  return {
    name: 'k4n:import-without-preload',
    enforce: 'pre' as const,
    resolveId: (id: string): string | null => (id === PRELOAD_HELPER ? id : null),
    load: (id: string): string | null =>
      id === PRELOAD_HELPER ? 'export const __vitePreload = (load) => load()' : null,
  }
}

/**
 * Served by GitHub Pages as a project site, so every address lives under the name of the repository and
 * every link is built on `import.meta.env.BASE_URL` rather than on the root.
 */
export default defineConfig({
  site: 'https://gustavofreze.github.io',
  base: `/${SITE.repository}`,
  trailingSlash: 'always',
  output: 'static',
  i18n: {
    defaultLocale: 'en-US',
    locales: ['en-US', { path: 'pt-br', codes: ['pt-BR'] }],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  /**
   * The notes are the Markdown files of the repository. Code is colored at build time in both themes, and
   * the stylesheet picks the one in force. The high contrast editions are used because the comments of
   * the plain ones fall to 3:1 on their own ground.
   */
  markdown: {
    processor: unified({ remarkPlugins: [remarkNotes], rehypePlugins: [rehypeSections] }),
    shikiConfig: {
      themes: { light: 'github-light-high-contrast', dark: 'github-dark-high-contrast' },
      defaultColor: false,
      transformers: [runnableKotlin],
    },
  },
  vite: {
    plugins: [tailwindcss(), importWithoutPreload()],
    /**
     * Every script is served as a file rather than inlined into the page. An inlined script never reaches
     * the step where Vite fills in the preload list of a dynamic import, so the import of the search index
     * would ship with a placeholder that throws. As files, the scripts are also cached across pages.
     */
    build: {
      assetsInlineLimit: 0,
    },
  },
})

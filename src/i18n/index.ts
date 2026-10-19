/**
 * Locale routing helpers. Astro's native i18n owns the routing (see astro.config.ts): en-US is the
 * default locale at the root with no prefix, pt-BR lives under `pt-br/`. Every address is built on the base
 * the site is served under, because GitHub Pages publishes it below the name of the repository.
 */
import { SITE } from '../content/site'
import type { Locale } from './strings'

export const DEFAULT_LOCALE: Locale = 'en-US'

/** The locales the site ships, in the order the language menu offers them. */
export const LOCALES: readonly Locale[] = ['en-US', 'pt-BR']

const PREFIX: Readonly<Record<Locale, string>> = { 'en-US': '', 'pt-BR': 'pt-br/' }

const BASE = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`

/** The address of a page in a locale: the home with no slug, a topic with one. */
export function pageHref(locale: Locale, slug?: string): string {
  return `${BASE}${PREFIX[locale]}${slug ? `${slug}/` : ''}`
}

/** The address of the same page in every locale, which is what the language menu and the alternates use. */
export function pagePaths(slug?: string): Record<Locale, string> {
  return { 'en-US': pageHref('en-US', slug), 'pt-BR': pageHref('pt-BR', slug) }
}

/** The address of a file published from `public/`. */
export function assetHref(path: string): string {
  return `${BASE}${path}`
}

export const REPOSITORY_HREF = `https://github.com/gustavofreze/${SITE.repository}`

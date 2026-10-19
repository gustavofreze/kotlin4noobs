import type { APIRoute } from 'astro'
import { topicsOf } from '../content'
import { DEFAULT_LOCALE, LOCALES, pagePaths } from '../i18n'

/**
 * The list of addresses the site asks to have indexed, each with its twin in the other language.
 *
 * It carries the pages that are content: the home and every topic. The search page is a
 * tool and declares itself out of the index, so it stays out of here too. No `lastmod`, `changefreq` or
 * `priority` is published, because the site has no real date per page and the large engines stopped
 * reading the other two.
 */
export const GET: APIRoute = ({ site, url }) => {
  const origin = site ?? new URL(url.origin)
  const slugs = [undefined, ...topicsOf(DEFAULT_LOCALE).map((topic) => topic.slug)]
  const entries = slugs.flatMap((slug) => {
    const paths = pagePaths(slug)
    const alternates = LOCALES.map(
      (locale) =>
        `    <xhtml:link rel="alternate" hreflang="${locale}" href="${new URL(paths[locale], origin).href}"/>`,
    )
    return LOCALES.map((locale) =>
      ['  <url>', `    <loc>${new URL(paths[locale], origin).href}</loc>`, ...alternates, '  </url>'].join('\n'),
    )
  })

  const document = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n')

  return new Response(document, { headers: { 'content-type': 'application/xml; charset=utf-8' } })
}

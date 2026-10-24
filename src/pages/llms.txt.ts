import type { APIRoute } from 'astro'
import { topicsOf } from '../content'
import { LOCALES, pageHref, REPOSITORY_HREF } from '../i18n'
import { getCopy } from '../i18n/strings'

/**
 * The map of the site for language models, in the format of llmstxt.org: what the guide is, then every
 * topic in each language, with the one sentence that says what it covers.
 *
 * It is built from the same notes as the pages, so it never lists a page that does not exist.
 */
export const GET: APIRoute = ({ site, url }) => {
  const origin = site ?? new URL(url.origin)
  const absolute = (path: string): string => new URL(path, origin).href
  const english = getCopy('en-US')

  const sections = LOCALES.flatMap((locale) => {
    const copy = getCopy(locale)
    return [
      `## ${copy.localeSwitch.names[locale]}`,
      '',
      `- [${copy.home.title}](${absolute(pageHref(locale))}): ${copy.meta.description}`,
      ...topicsOf(locale).map(
        (topic) => `- [${topic.title}](${absolute(pageHref(locale, topic.slug))}): ${topic.summary}`,
      ),
      '',
    ]
  })

  const document = [
    `# ${english.home.title}`,
    '',
    `> ${english.meta.description}`,
    '',
    `The notes are published in English and in Portuguese (Brazil), with the same topics in both. Source: ${REPOSITORY_HREF}`,
    '',
    ...sections,
  ].join('\n')

  return new Response(document, { headers: { 'content-type': 'text/plain; charset=utf-8' } })
}

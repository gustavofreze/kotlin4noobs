/**
 * The topics of the notes in each language, in the order the roadmap walks them.
 *
 * The Portuguese notes are the Markdown files under `doc/readmes/roadmap/`, the English ones mirror them
 * under `doc/readmes/en-us/roadmap/`. Every topic of `site.ts` must have its file in both languages, with
 * the same number of sections, so a page in one language always has its twin in the other. The build
 * stops when they drift apart.
 */
import type { AstroComponentFactory } from 'astro/runtime/server/index.js'
import type { Locale } from '../i18n/strings'
import { TOPICS, type TopicGroup } from './site'
import { headingText, sectionSlugger, topicSlug } from './slug'

export type { TopicGroup }

interface MarkdownFile {
  readonly Content: AstroComponentFactory
  readonly rawContent: () => string
}

export interface Section {
  readonly id: string
  readonly name: string
}

export interface Topic {
  readonly slug: string
  readonly group: TopicGroup
  readonly glyph: string
  readonly name: string
  /** The title of the page for search engines, set by the topic or made of its name. */
  readonly headline: string | undefined
  readonly title: string
  readonly summary: string
  readonly sections: readonly Section[]
  readonly Content: AstroComponentFactory
}

const FILES: Readonly<Record<Locale, Record<string, MarkdownFile>>> = {
  'pt-BR': import.meta.glob<MarkdownFile>('../../doc/readmes/roadmap/*/*.md', { eager: true }),
  'en-US': import.meta.glob<MarkdownFile>('../../doc/readmes/en-us/roadmap/*/*.md', { eager: true }),
}

/** Reads the title and the sections of a file from its Markdown, the way the pipeline draws them. */
function outline(markdown: string): { readonly title: string; readonly sections: readonly Section[] } {
  const title = /^# (.+)$/m.exec(markdown)?.[1]
  if (title === undefined) {
    throw new Error('A file of the notes opens with no `#` title.')
  }
  const slug = sectionSlugger()
  const sections = [...markdown.replace(/^```[\s\S]*?^```/gm, '').matchAll(/^### (.+)$/gm)].map((match) => {
    const name = headingText(match[1] ?? '')
    return { id: slug(name), name }
  })
  return { title: headingText(title), sections }
}

function topicsIn(locale: Locale): readonly Topic[] {
  const files = new Map(Object.entries(FILES[locale]).map(([path, file]) => [topicSlug(path), file]))
  return TOPICS.map((entry) => {
    const file = files.get(entry.slug)
    if (file === undefined) {
      throw new Error(`No ${locale} file of notes for the topic "${entry.slug}".`)
    }
    return {
      slug: entry.slug,
      group: entry.group,
      glyph: entry.glyph,
      name: entry.name[locale],
      headline: entry.headline?.[locale],
      summary: entry.summary[locale],
      Content: file.Content,
      ...outline(file.rawContent()),
    }
  })
}

const TOPICS_OF: Readonly<Record<Locale, readonly Topic[]>> = {
  'pt-BR': topicsIn('pt-BR'),
  'en-US': topicsIn('en-US'),
}

const drift = TOPICS_OF['pt-BR'].find(
  (topic, index) => topic.sections.length !== TOPICS_OF['en-US'][index]?.sections.length,
)
if (drift !== undefined) {
  throw new Error(`The pt-BR and en-US notes of "${drift.slug}" must have the same sections.`)
}

/** A fenced Kotlin block that is a whole program, the kind a page offers to run (see `markdown.ts`). */
const PROGRAM = /^[ \t]*```kotlin[^\n]*\n([\s\S]*?)^[ \t]*```/gm

/** Answers how many programs of the notes in a language a reader can run on the Playground. */
export function programCount(locale: Locale): number {
  return Object.values(FILES[locale])
    .flatMap((file) => [...file.rawContent().matchAll(PROGRAM)])
    .filter((match) => /\bfun\s+main\s*\(/.test(match[1] ?? '')).length
}

export function topicsOf(locale: Locale): readonly Topic[] {
  return TOPICS_OF[locale]
}

/** The topic at a slug, with the ones before and after it on the roadmap. */
export function topicAt(
  locale: Locale,
  slug: string,
): { readonly topic: Topic; readonly previous?: Topic; readonly next?: Topic } {
  const topics = TOPICS_OF[locale]
  const index = topics.findIndex((topic) => topic.slug === slug)
  const topic = topics[index]
  if (topic === undefined) {
    throw new Error(`No topic at "${slug}" in ${locale}.`)
  }
  const previous = topics[index - 1]
  const next = topics[index + 1]
  return { topic, ...(previous ? { previous } : {}), ...(next ? { next } : {}) }
}

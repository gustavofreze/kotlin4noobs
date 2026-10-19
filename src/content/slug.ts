/**
 * The identifiers the notes are addressed by, worked out the same way wherever they are needed: by the
 * Markdown pipeline that draws the sections of a page and by the code that lists them in the bar of tabs.
 */

/** The slug of a topic from the name of its Markdown file: `NULL_SAFETY.md` is `null-safety`. */
export function topicSlug(file: string): string {
  const name = file.split('/').at(-1) ?? file
  return name.replace(/\.md$/i, '').toLowerCase().replaceAll('_', '-')
}

/** The plain text of a heading as written in Markdown, without the marks of code, emphasis or links. */
export function headingText(markdown: string): string {
  return markdown
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[`*]/g, '')
    .trim()
}

/**
 * The anchor of a section from its heading. Accents are dropped and every run of other characters becomes
 * one hyphen, so `Operador Elvis (?:)` is `operador-elvis`.
 */
export function sectionSlug(text: string): string {
  const slug = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return slug === '' ? 'section' : slug
}

/** Hands out section anchors in order, numbering the repeats of a heading so no two collide. */
export function sectionSlugger(): (text: string) => string {
  const seen = new Map<string, number>()
  return (text) => {
    const base = sectionSlug(text)
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    return count === 0 ? base : `${base}-${count + 1}`
  }
}

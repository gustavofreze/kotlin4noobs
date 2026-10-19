/**
 * The steps the Markdown of the notes goes through on its way to a page.
 *
 * The files are written to be read on GitHub, so they carry what a page of the site draws on its own: the
 * title, the spacing between files and the line that leads to the next one. Those are dropped here, the
 * links between files become links between pages, and each `###` heading opens a section drawn as a
 * card, which is what the bar of tabs of a topic page points at.
 *
 * The trees are walked with a small structural type rather than the full Markdown and HTML syntax trees,
 * because only a handful of their fields are read.
 */
import type { ShikiTransformer } from 'shiki'
import { sectionSlugger, topicSlug } from './slug'

interface Node {
  type: string
  value?: string
  url?: string
  depth?: number
  tagName?: string
  properties?: Record<string, unknown>
  children?: Node[]
}

/** The paragraph that leads to the next file or back to the README, at the end of every file. */
const NAVIGATION = /^(Ir para|Go to|Back to)\b/

/** A link to another file of the notes, relative to the one it is written in. */
const NOTE_LINK = /^(?!\w+:)(?:[\w.-]+\/)*([A-Z_]+\.md)(#.*)?$/

/** Spacing written as raw HTML, `<br>` and its variants, which the cards of a page already provide. */
const BREAK = /^\s*(<br\s*\/?>\s*)+$/i

function textOf(node: Node): string {
  return node.value ?? (node.children ?? []).map(textOf).join('')
}

function removeBreaks(node: Node): void {
  if (node.children) {
    node.children = node.children.filter((child) => !(child.type === 'html' && BREAK.test(child.value ?? '')))
    node.children.forEach(removeBreaks)
  }
}

function rewriteLinks(node: Node): void {
  if (node.type === 'link' && node.url) {
    const match = NOTE_LINK.exec(node.url)
    if (match?.[1]) {
      node.url = `../${topicSlug(match[1])}/${match[2] ?? ''}`
    }
  }
  node.children?.forEach(rewriteLinks)
}

/** The Markdown side: drops the title and the navigation, and points links between files at pages. */
export function remarkNotes() {
  return (tree: Node): void => {
    removeBreaks(tree)
    const children = tree.children ?? []
    const title = children.findIndex((child) => child.type === 'heading' && child.depth === 1)
    if (title !== -1) {
      children.splice(title, 1)
    }
    while (children.length > 0) {
      const last = children.at(-1)
      if (last?.type === 'paragraph' && NAVIGATION.test(textOf(last).trim())) {
        children.pop()
      } else if (last?.type === 'thematicBreak') {
        children.pop()
      } else {
        break
      }
    }
    rewriteLinks(tree)
  }
}

function element(tagName: string, properties: Record<string, unknown>, children: Node[]): Node {
  return { type: 'element', tagName, properties, children }
}

function isBlank(node: Node): boolean {
  return node.type === 'text' && (node.value ?? '').trim() === ''
}

function markExternalLinks(node: Node): void {
  if (node.type === 'element' && node.tagName === 'a') {
    const href = String(node.properties?.href ?? '')
    if (/^https?:/.test(href)) {
      node.properties = { ...node.properties, target: '_blank', rel: 'noopener noreferrer' }
    }
  }
  node.children?.forEach(markExternalLinks)
}

/**
 * The HTML side: groups the page into cards. What comes before the first `###` is the introduction, and
 * each `###` opens a section addressed by the anchor `sectionSlug` gives its heading, the same one the bar
 * of tabs links to. The page title is the only `h1`, so a section heading becomes an `h2` and a `####`
 * inside it an `h3`.
 */
export function rehypeSections() {
  return (tree: Node): void => {
    markExternalLinks(tree)
    const slug = sectionSlugger()
    const intro: Node[] = []
    const sections: Node[] = []
    let body = intro

    for (const child of tree.children ?? []) {
      if (child.type === 'element' && child.tagName === 'h3') {
        const id = slug(textOf(child))
        const title = element('h2', { id: `${id}-title`, className: ['kt-section__title'] }, [
          element('a', { href: `#${id}`, className: ['kt-section__anchor'] }, child.children ?? []),
        ])
        body = []
        sections.push(
          element('section', { id, className: ['kt-section'], ariaLabelledBy: `${id}-title` }, [
            element('header', { className: ['kt-section__head'] }, [title]),
            element('div', { className: ['kt-md'] }, body),
          ]),
        )
      } else {
        if (child.type === 'element' && child.tagName === 'h4') {
          child.tagName = 'h3'
        }
        body.push(child)
      }
    }

    const cards = intro.every(isBlank)
      ? sections
      : [
          element('div', { className: ['kt-section', 'kt-section--intro'] }, [
            element('div', { className: ['kt-md'] }, intro),
          ]),
          ...sections,
        ]
    tree.children = cards
  }
}

/** Matches a Kotlin program the Playground can run as it stands: one with an entry point. */
const PROGRAM = /\bfun\s+main\s*\(/

/** Marks the Kotlin blocks that are whole programs, which the page offers to run on the Playground. */
export const runnableKotlin: ShikiTransformer = {
  name: 'k4n:runnable-kotlin',
  pre(node) {
    if (this.options.lang === 'kotlin' && PROGRAM.test(this.source)) {
      node.properties['data-runnable'] = ''
    }
  },
}

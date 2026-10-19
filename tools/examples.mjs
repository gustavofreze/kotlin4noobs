/**
 * The Kotlin programs of the notes: every fenced Kotlin block with a `main`, which are the blocks a page
 * offers to run on the Playground (see `runnableKotlin` in `src/content/markdown.ts`, which marks them by
 * the same pattern).
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'

/** Matches a Kotlin program the Playground can run as it stands: one with an entry point. */
export const PROGRAM = /\bfun\s+main\s*\(/

const FENCE = /^([ \t]*)```(\S*)[^\n]*\n([\s\S]*?)^\1```[ \t]*$/gm

/** Answers the runnable programs of one Markdown file, each with the line its fence opens on. */
export function programsIn(markdown) {
  return [...markdown.matchAll(FENCE)]
    .filter((match) => match[2] === 'kotlin' && PROGRAM.test(match[3]))
    .map((match) => ({
      line: markdown.slice(0, match.index).split('\n').length,
      code: match[3]
        .split('\n')
        .map((text) => text.slice(match[1].length))
        .join('\n'),
    }))
}

/** Lists the Markdown files under a folder, at any depth. */
function markdownFiles(folder) {
  return readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    const path = join(folder, entry.name)
    if (entry.isDirectory()) {
      return markdownFiles(path)
    }
    return entry.name.endsWith('.md') ? [path] : []
  })
}

/** Answers every runnable program of the notes in both languages, each named by its file and line. */
export function programsOfTheNotes(root) {
  return [join(root, 'doc/readmes/roadmap'), join(root, 'doc/readmes/en-us/roadmap')]
    .flatMap(markdownFiles)
    .flatMap((file) =>
      programsIn(readFileSync(file, 'utf8')).map((program) => ({ ...program, file: relative(root, file) })),
    )
}

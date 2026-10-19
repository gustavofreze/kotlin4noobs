/**
 * The guard on the script every page of the built site ships.
 *
 * A page loads the script inlined into it and every file its script tags name, along with what those
 * files import statically. Together that stays at or under 4,000 bytes uncompressed, counting 1 KB as
 * 1,000 B: the theme before first paint and the small enhancements every page carries fit, and anything
 * heavier is a sign that behavior crept onto a page that does not need it. A dynamic import is left
 * out, because it loads on demand, which is how the search index and the runner of the programs are
 * fetched. Structured data is data the browser never runs, so it is left out too.
 *
 * It reads `dist/`, so it runs after the build, prints every page and fails when any is over.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'

const DIST = 'dist'
const BUDGET = 4000
/** The site is served below the name of the repository, which is also the name of the package. */
const BASE = `/${JSON.parse(readFileSync('package.json', 'utf8')).name}/`

/** Lists every page of the site, leaving out the search index Pagefind writes beside it. */
function pages(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name)
    if (statSync(path).isDirectory()) {
      return name === 'pagefind' ? [] : pages(path)
    }
    return name.endsWith('.html') ? [path] : []
  })
}

/** Answers the files a module loads statically, itself included, each counted once. */
function moduleClosure(file, seen) {
  if (seen.has(file)) {
    return
  }
  seen.add(file)
  const source = readFileSync(file, 'utf8')
  for (const match of source.matchAll(/(?:import|from)\s*["']([^"']+\.js)["']/g)) {
    moduleClosure(join(dirname(file), match[1]), seen)
  }
}

/** Answers how many bytes of script one page ships. */
function scriptBytes(page) {
  const html = readFileSync(page, 'utf8')
  const inline = [
    ...html.matchAll(/<script(?![^>]*\b(?:src=|type="application\/ld\+json"))[^>]*>([\s\S]*?)<\/script>/g),
  ].reduce((total, match) => total + Buffer.byteLength(match[1]), 0)
  const files = new Set()
  for (const match of html.matchAll(/<script[^>]*\bsrc="([^"]+)"/g)) {
    moduleClosure(join(DIST, match[1].replace(BASE, '')), files)
  }
  return [...files].reduce((total, file) => total + statSync(file).size, inline)
}

const results = pages(DIST).map((page) => ({ page: relative(DIST, page), bytes: scriptBytes(page) }))
for (const { page, bytes } of results) {
  console.log(`${bytes > BUDGET ? 'OVER' : 'ok  '}  ${String(bytes).padStart(5)} B  ${page}`)
}

const over = results.filter(({ bytes }) => bytes > BUDGET)
if (over.length > 0) {
  console.error(`\n${over.length} page(s) over the ${BUDGET} B script budget.`)
  process.exit(1)
}
console.log(`\nEvery page is within the ${BUDGET} B script budget.`)

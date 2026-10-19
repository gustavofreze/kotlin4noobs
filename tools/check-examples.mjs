/**
 * The guard on the programs of the notes: every one of them compiles and runs on the Kotlin Playground,
 * on the version of Kotlin a reader gets when pressing the run control of a page.
 *
 * Each program is sent to the same service the Playground uses, on its latest stable version unless
 * `KOTLIN_VERSION` names another, and fails on a compile error or an exception. Warnings are printed and
 * never fail. It also compares the Playground the pages load with the latest one published, and prints
 * what to write in `src/scripts/playground.ts` when a newer one exists.
 *
 * Both a failing program and a newer Playground fail the run, so the scheduled run opens an issue that
 * says what to change. `--programs-only` leaves the Playground out, for a pull request that should not
 * fail because JetBrains published something. It needs the network, so it runs on demand, on pull
 * requests that touch the notes and on a schedule, rather than inside the tests. With `--report <file>`
 * it also writes the result as Markdown, for that issue.
 */
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { programsOfTheNotes } from './examples.mjs'

const API = 'https://api.kotlinlang.org'
const PLAYGROUND_SCRIPT = 'src/scripts/playground.ts'
/** How many programs are compiled at once, to stay gentle with a public service. */
const CONCURRENCY = 4

/** Answers the version of Kotlin to check against: the one asked for, or the latest stable one. */
async function kotlinVersion() {
  if (process.env.KOTLIN_VERSION) {
    return process.env.KOTLIN_VERSION
  }
  const versions = await (await fetch(`${API}/versions`)).json()
  const stable = versions.find((entry) => entry.latestStable)
  if (stable === undefined) {
    throw new Error('The Playground names no latest stable version of Kotlin.')
  }
  return stable.version
}

/** Answers what went wrong with one program, nothing when it compiled and ran. */
async function run(program, version) {
  const response = await fetch(`${API}/api/${version}/compiler/run`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      args: '',
      confType: 'java',
      files: [{ name: 'File.kt', text: program.code, publicId: '' }],
    }),
  })
  if (!response.ok) {
    return { errors: [`The Playground answered ${response.status}.`], warnings: [] }
  }
  const result = await response.json()
  const diagnostics = Object.values(result.errors ?? {}).flat()
  const describe = (entry) => `line ${entry.interval.start.line + 1}: ${entry.message}`
  const errors = diagnostics.filter((entry) => entry.severity === 'ERROR').map(describe)
  if (result.exception) {
    errors.push(`${result.exception.fullName ?? 'Exception'}: ${result.exception.message ?? ''}`.trim())
  }
  return { errors, warnings: diagnostics.filter((entry) => entry.severity === 'WARNING').map(describe) }
}

/** Runs every program, a few at a time, keeping the order they were found in. */
async function runAll(programs, version) {
  const results = new Array(programs.length)
  let next = 0
  const worker = async () => {
    while (next < programs.length) {
      const index = next++
      results[index] = { ...programs[index], ...(await run(programs[index], version)) }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker))
  return results
}

/** Answers the Playground the pages pin and the latest one published, with the hash of the latest. */
async function playgroundVersions() {
  const pinned = /kotlin-playground@([\d.]+)\//.exec(readFileSync(PLAYGROUND_SCRIPT, 'utf8'))?.[1]
  const latest = (await (await fetch('https://registry.npmjs.org/kotlin-playground/latest')).json()).version
  if (pinned === latest) {
    return { pinned, latest }
  }
  const source = `https://unpkg.com/kotlin-playground@${latest}/dist/playground.min.js`
  const body = Buffer.from(await (await fetch(source)).arrayBuffer())
  return { pinned, latest, source, integrity: `sha384-${createHash('sha384').update(body).digest('base64')}` }
}

const version = await kotlinVersion()
const results = await runAll(programsOfTheNotes(process.cwd()), version)
const programsOnly = process.argv.includes('--programs-only')
const playground = programsOnly ? {} : await playgroundVersions()
const failed = results.filter((result) => result.errors.length > 0)

const lines = [`# Programs of the notes on Kotlin ${version}`, '']
for (const result of results) {
  const status = result.errors.length > 0 ? 'FAIL' : 'ok  '
  console.log(`${status}  ${result.file}:${result.line}`)
  for (const message of result.errors) {
    console.log(`        error: ${message}`)
  }
  for (const message of result.warnings) {
    console.log(`        warning: ${message}`)
  }
}
lines.push(`${results.length - failed.length} of ${results.length} programs compile and run.`, '')
for (const result of failed) {
  lines.push(`- \`${result.file}:${result.line}\``, ...result.errors.map((message) => `  - ${message}`))
}
if (playground.integrity) {
  lines.push(
    '',
    `The pages load kotlin-playground ${playground.pinned}, and ${playground.latest} is published. To move to it,`,
    `set in \`${PLAYGROUND_SCRIPT}\`:`,
    '',
    '```ts',
    `const SOURCE = '${playground.source}'`,
    `const INTEGRITY = '${playground.integrity}'`,
    '```',
  )
}
const report = lines.join('\n')
console.log(`\n${report.split('\n').slice(2).join('\n')}`)

const reportAt = process.argv.indexOf('--report')
if (reportAt !== -1 && process.argv[reportAt + 1]) {
  writeFileSync(process.argv[reportAt + 1], `${report}\n`)
}
process.exit(failed.length > 0 || playground.integrity ? 1 : 0)

/**
 * Runs the programs of the notes in place, on the Kotlin Playground.
 *
 * The pipeline marks every Kotlin block that is a whole program, one with a `main`. This adds a control to
 * each of them, and the first time a reader runs one the Playground is fetched, the block turns into its
 * editor and the program runs. The code is compiled and run by the Playground service of JetBrains, so
 * nothing of it is sent anywhere until the reader asks.
 *
 * The Playground is loaded as the script its package publishes, pinned to one version and checked against
 * its hash, because its editor does not survive being bundled again. The page is complete without it:
 * with no script every block stays as highlighted code.
 */
const SOURCE = 'https://unpkg.com/kotlin-playground@1.34.0/dist/playground.min.js'
const INTEGRITY = 'sha384-FrPdRsJvxU1cJiPib7Wrlt6XX6XPz9qwMCWuNCGaG7d5w/SWsE0WAEm5mXtXXxr/'

interface PlaygroundInstance {
  execute(): void
}

type Playground = (
  target: Element,
  options: { readonly getInstance: (instance: PlaygroundInstance) => void },
) => Promise<unknown>

declare global {
  interface Window {
    KotlinPlayground?: Playground
  }
}

let loaded: Promise<Playground> | undefined

/** Loads the Playground once, as the global its script defines. */
function loadPlayground(): Promise<Playground> {
  loaded ??= new Promise<Playground>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = SOURCE
    script.integrity = INTEGRITY
    script.crossOrigin = 'anonymous'
    script.addEventListener('load', () =>
      window.KotlinPlayground ? resolve(window.KotlinPlayground) : reject(new Error('No Playground.')),
    )
    script.addEventListener('error', () => reject(new Error('The Playground could not be loaded.')))
    document.head.append(script)
  }).catch((error: unknown) => {
    loaded = undefined
    throw error
  })
  return loaded
}

function isDark(): boolean {
  return document.documentElement.dataset.theme === 'dark'
}

/**
 * Turns one block into the editor of the Playground and runs it. When the Playground fails, the block is
 * put back as it was and its control says so.
 */
async function run(block: HTMLPreElement, button: HTMLButtonElement, labels: DOMStringMap): Promise<void> {
  button.disabled = true
  button.textContent = labels.loading ?? ''
  const frame = block.closest('.kt-code')
  const host = document.createElement('div')
  try {
    const playground = await loadPlayground()
    const code = document.createElement('code')
    code.textContent = block.textContent ?? ''
    code.setAttribute('theme', isDark() ? 'darcula' : 'idea')
    code.setAttribute('none-markers', '')
    host.className = 'kt-playground'
    host.append(code)
    frame?.replaceWith(host)
    let editor: PlaygroundInstance | undefined
    await playground(code, {
      getInstance: (instance) => {
        editor = instance
      },
    })
    editor?.execute()
  } catch {
    if (frame !== null && host.isConnected) {
      host.replaceWith(frame)
    }
    button.disabled = false
    button.textContent = labels.unavailable ?? ''
  }
}

function init(): void {
  const main = document.querySelector<HTMLElement>('[data-playground]')
  if (main === null) {
    return
  }
  const labels = main.dataset
  for (const block of main.querySelectorAll<HTMLPreElement>('pre[data-runnable]')) {
    const frame = document.createElement('div')
    frame.className = 'kt-code'
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'kt-run'
    button.textContent = labels.run ?? ''
    button.addEventListener('click', () => void run(block, button, labels))
    block.replaceWith(frame)
    frame.append(block, button)
  }
}

init()

export {}

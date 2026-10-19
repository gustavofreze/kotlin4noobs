/**
 * Theme control. A binary light and dark choice. With no explicit choice the theme follows the OS
 * (prefers-color-scheme) and keeps reacting to OS changes in real time. The first press persists an
 * explicit light or dark, and from then on the OS is ignored.
 *
 * The choice is a UI setting, so localStorage is the right home for it. A matching inline script in the
 * head of BaseLayout resolves the same key before first paint to avoid a flash.
 */
type Theme = 'light' | 'dark'

const KEY = 'k4n:theme'

/** The question the page asks the system while nobody chose a theme. */
const SYSTEM_DARK = '(prefers-color-scheme: dark)'

function isTheme(value: string | null | undefined): value is Theme {
  return value === 'light' || value === 'dark'
}

function storedChoice(): Theme | null {
  try {
    const value = localStorage.getItem(KEY)
    return isTheme(value) ? value : null
  } catch {
    return null
  }
}

function resolve(choice: Theme | null): Theme {
  return choice ?? (window.matchMedia(SYSTEM_DARK).matches ? 'dark' : 'light')
}

function apply(theme: Theme, choices: readonly HTMLElement[]): void {
  document.documentElement.dataset.theme = theme

  const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  const color = themeColor?.dataset[theme]
  if (themeColor && color) {
    themeColor.content = color
  }

  for (const button of choices) {
    button.toggleAttribute('data-active', button.dataset.themeChoice === theme)
    button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme))
  }
}

function init(): void {
  const choices = [...document.querySelectorAll<HTMLElement>('[data-theme-choice]')]
  if (choices.length === 0) {
    return
  }

  let choice = storedChoice()
  apply(resolve(choice), choices)

  for (const button of choices) {
    button.addEventListener('click', () => {
      const pressed = button.dataset.themeChoice
      if (!isTheme(pressed)) {
        return
      }
      choice = pressed
      try {
        localStorage.setItem(KEY, pressed)
      } catch {}
      apply(pressed, choices)
    })
  }

  window.matchMedia(SYSTEM_DARK).addEventListener('change', () => {
    if (choice === null) {
      apply(resolve(choice), choices)
    }
  })
}

init()

export {}

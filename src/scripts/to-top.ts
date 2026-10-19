/**
 * Progressive enhancement for the control that takes a reader back to the top of the page.
 *
 * The control is a link to the top of the document, which the browser follows on its own. This marks the
 * root so the stylesheet draws the control at all, shows it once the reader is most of a window down and
 * hides it again near the top, where it would cover the page for nothing. Pressing it also hands the
 * focus to the first link of the page, so a keyboard that went back up continues from the top.
 */
const SHOWN = 'is-shown'

/** How far down, in windows, the control appears. */
const THRESHOLD = 0.75

function init(): void {
  const control = document.querySelector<HTMLAnchorElement>('a[data-to-top]')
  if (control === null) {
    return
  }

  document.documentElement.dataset.toTop = 'on'

  let frame = 0
  const update = (): void => {
    frame = 0
    control.classList.toggle(SHOWN, window.scrollY > window.innerHeight * THRESHOLD)
  }

  window.addEventListener(
    'scroll',
    () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update)
      }
    },
    { passive: true },
  )
  update()

  control.addEventListener('click', (event) => {
    event.preventDefault()
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: calm ? 'auto' : 'smooth' })
    history.replaceState(null, '', window.location.pathname)
    document.querySelector<HTMLElement>('header a[href]')?.focus({ preventScroll: true })
  })
}

init()

export {}

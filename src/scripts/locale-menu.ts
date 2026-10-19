/**
 * Progressive enhancement for the native <details> language menu of the bar: close it on Escape and on an
 * outside click, returning focus to the summary on Escape. The menu works without this.
 *
 * It also carries the section being read across the switch. The anchors of a section are made from its
 * heading, so they differ between languages, but both languages have the same sections in the same order.
 * Each link of the menu lists the anchors of its page, and the one at the same position is followed.
 */
function init(): void {
  const menus = [...document.querySelectorAll<HTMLDetailsElement>('details.locale-menu')]
  if (menus.length === 0) {
    return
  }

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
      return
    }
    for (const menu of menus) {
      if (menu.open) {
        menu.open = false
        menu.querySelector('summary')?.focus()
      }
    }
  })

  document.addEventListener('click', (event) => {
    for (const menu of menus) {
      if (menu.open && !menu.contains(event.target as Node)) {
        menu.open = false
      }
    }
  })

  for (const link of document.querySelectorAll<HTMLAnchorElement>('a[data-locale-link]')) {
    link.addEventListener('click', () => {
      const here = [...document.querySelectorAll<HTMLElement>('[data-section-link]')].map(
        (section) => section.dataset.sectionLink,
      )
      const position = here.indexOf(window.location.hash.slice(1))
      const twin = link.dataset.sections?.split(' ')[position]
      if (position !== -1 && twin) {
        link.hash = twin
      }
    })
  }
}

init()

export {}

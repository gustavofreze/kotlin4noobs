/**
 * Progressive enhancement for the search. The link of the bar to the search page opens the search as a
 * dialog over the page instead, and a press outside the dialog closes it, as its `closedby` asks. The
 * search itself, which binds the form of the dialog as it loads, and the index behind it, load the first
 * time the dialog opens, so a page that is never searched pays only for this.
 */
const control = document.querySelector('[data-search-open]')
const dialog = document.querySelector<HTMLDialogElement>('dialog[data-search-dialog]')

if (control && dialog) {
  control.addEventListener('click', (event) => {
    event.preventDefault()
    dialog.showModal()
    void import('./search.ts')
  })
}

export {}

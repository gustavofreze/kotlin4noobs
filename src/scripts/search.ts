/**
 * The search box of the notes, bound to a form wherever it sits: the search page, or the dialog the bar
 * opens on every page. It loads the Pagefind index on the first search, so a page ships only the form,
 * and it writes the results as plain links to the section that matched.
 *
 * On the search page the term follows into the address, which is what makes a search shareable. In the
 * dialog the results come as the reader types. Either way pressing enter submits the form the native way,
 * to the search page with the term in the address.
 * The index exists only in the site the build produces. Under the development server the import fails,
 * and the box says so instead of failing silently.
 */
interface PagefindResult {
  readonly url: string
  readonly excerpt: string
  readonly meta: { readonly title?: string }
  readonly sub_results?: readonly { readonly url: string; readonly title: string; readonly excerpt: string }[]
}

interface Pagefind {
  readonly debouncedSearch: (
    term: string,
  ) => Promise<{ readonly results: readonly { readonly data: () => Promise<PagefindResult> }[] } | null>
}

/** How many pages a search lists, each with the sections inside it that matched. */
const MAX_PAGES = 8
const MAX_SECTIONS = 3

let pagefind: Promise<Pagefind> | undefined

/** Loads the index once, from the folder Pagefind writes beside the site. The base ends in a slash, as every address of the site does. */
function loadPagefind(): Promise<Pagefind> {
  pagefind ??= import(/* @vite-ignore */ `${import.meta.env.BASE_URL}pagefind/pagefind.js`)
  return pagefind
}

/**
 * Builds one result: the page, and under it the sections that matched, each linking to its anchor.
 *
 * It is written as markup because everything in it comes from the index of the notes themselves: the
 * titles are their headings, the addresses are their pages, and the excerpts arrive from Pagefind
 * already escaped, with the matched words marked.
 */
function resultItem(result: PagefindResult): string {
  const sections = (result.sub_results ?? []).filter((sub) => sub.url.includes('#')).slice(0, MAX_SECTIONS)
  const entries = sections.length > 0 ? sections : [{ url: result.url, title: '', excerpt: result.excerpt }]
  const links = entries.map(
    (entry) => `<li><a href="${entry.url}"><strong>${entry.title}</strong><span>${entry.excerpt}</span></a></li>`,
  )
  return `<li class="kt-result"><a class="kt-result__page" href="${result.url}">${result.meta.title ?? ''}</a><ul class="kt-result__sections">${links.join('')}</ul></li>`
}

/** Binds the search to the form inside a root, writing the term to the address when asked to. */
function bind(root: ParentNode, followAddress: boolean): void {
  const form = root.querySelector<HTMLFormElement>('[data-search]')
  const input = form?.querySelector('input')
  const status = root.querySelector<HTMLElement>('[data-search-status]')
  const results = root.querySelector<HTMLOListElement>('[data-search-results]')
  if (!form || !input || !status || !results) {
    return
  }
  const say = (key: string, count = 0): void => {
    status.textContent = (form.dataset[key] ?? '').replace('{count}', String(count))
  }

  const run = async (): Promise<void> => {
    const term = input.value.trim()
    if (followAddress) {
      history.replaceState(null, '', term ? `?q=${encodeURIComponent(term)}` : '?')
    }
    if (term.length < 2) {
      results.innerHTML = ''
      say('idle')
      return
    }
    say('loading')
    try {
      const search = await (await loadPagefind()).debouncedSearch(term)
      if (search) {
        const pages = await Promise.all(search.results.slice(0, MAX_PAGES).map((result) => result.data()))
        results.innerHTML = pages.map(resultItem).join('')
        say(search.results.length ? 'count' : 'empty', search.results.length)
      }
    } catch {
      say('unavailable')
    }
  }

  input.addEventListener('input', () => void run())
  if (!followAddress) {
    return
  }
  input.value = new URLSearchParams(window.location.search).get('q') ?? ''
  if (input.value) {
    void run()
  }
}

// The dialog of the bar holds the form on every page but the search page, where the form is the page and
// follows the address.
const dialog = document.querySelector('dialog[data-search-dialog]')
bind(dialog ?? document, dialog === null)

export {}

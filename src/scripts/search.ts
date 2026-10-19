/**
 * The search box of the notes. It loads the Pagefind index on the first search, so the page itself
 * ships only the form, and it writes the results as plain links to the section that matched.
 *
 * Pressing enter submits the form the native way, to this page with the term in the address, which is
 * also what makes a search shareable. The index exists only in the site the build produces. Under the development server the import fails,
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

/** Loads the index once, from the folder Pagefind writes beside the site. */
function loadPagefind(): Promise<Pagefind> {
  pagefind ??= import(/* @vite-ignore */ `${import.meta.env.BASE_URL.replace(/\/?$/, '/')}pagefind/pagefind.js`)
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

function init(): void {
  const form = document.querySelector<HTMLFormElement>('[data-search]')
  const input = form?.querySelector('input')
  const status = document.querySelector<HTMLElement>('[data-search-status]')
  const results = document.querySelector<HTMLOListElement>('[data-search-results]')
  if (!form || !input || !status || !results) {
    return
  }
  const say = (key: string, count = 0): void => {
    status.textContent = (form.dataset[key] ?? '').replace('{count}', String(count))
  }

  const run = async (): Promise<void> => {
    const term = input.value.trim()
    history.replaceState(null, '', term === '' ? '?' : `?q=${encodeURIComponent(term)}`)
    if (term.length < 2) {
      results.innerHTML = ''
      say('idle')
      return
    }
    say('loading')
    try {
      const search = await (await loadPagefind()).debouncedSearch(term)
      if (search !== null) {
        const pages = await Promise.all(search.results.slice(0, MAX_PAGES).map((result) => result.data()))
        results.innerHTML = pages.map(resultItem).join('')
        say(search.results.length === 0 ? 'empty' : 'count', search.results.length)
      }
    } catch {
      say('unavailable')
    }
  }

  input.addEventListener('input', () => void run())
  input.value = new URLSearchParams(window.location.search).get('q') ?? ''
  if (input.value !== '') {
    void run()
  }
}

init()

export {}

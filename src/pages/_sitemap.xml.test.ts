import type { APIContext } from 'astro'
import { describe, expect, it } from 'vitest'
import { topicsOf } from '../content'
import { GET } from './sitemap.xml'

/** Renders the sitemap the way the build does, for the published origin. */
async function sitemap(): Promise<string> {
  const site = new URL('https://gustavofreze.github.io')
  const response = await GET({ site, url: site } as APIContext)
  return response.text()
}

describe('the sitemap', () => {
  it('lists the home and every topic in both languages', async () => {
    // Given the published site
    const expected = 2 * (1 + topicsOf('pt-BR').length)

    // When the sitemap is rendered
    const document = await sitemap()

    // Then it lists one address per page and language
    expect(document.match(/<loc>/g)).toHaveLength(expected)
  })

  it('leaves the search page out', async () => {
    // Given the search page declares itself out of the index

    // When the sitemap is rendered
    const document = await sitemap()

    // Then it does not list it
    expect(document).not.toContain('/search/')
  })
})

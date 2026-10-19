import { describe, expect, it } from 'vitest'
import { headingText, sectionSlugger, topicSlug } from './slug'

describe('the identifiers of the notes', () => {
  it('name a topic after its file', () => {
    // Given the path of a file of the notes
    const path = '../../doc/readmes/roadmap/error-handling/NULL_SAFETY.md'

    // When its slug is worked out
    const slug = topicSlug(path)

    // Then it is the name of the file, lowercased and with hyphens
    expect(slug).toBe('null-safety')
  })

  it('read a heading without its marks', () => {
    // Given a heading with code and emphasis
    const heading = 'Operador **Elvis** `?:`'

    // When its text is read
    const text = headingText(heading)

    // Then only the words are left
    expect(text).toBe('Operador Elvis ?:')
  })

  it('anchor a section without accents and number the repeats', () => {
    // Given a slugger and two sections with the same heading
    const slug = sectionSlugger()

    // When both are anchored
    const anchors = [slug('Expressões condicionais'), slug('Expressões condicionais')]

    // Then the second is numbered
    expect(anchors).toEqual(['expressoes-condicionais', 'expressoes-condicionais-2'])
  })
})

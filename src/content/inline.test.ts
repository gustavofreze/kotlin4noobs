import { describe, expect, it } from 'vitest'
import { plainText, renderInline } from './inline'

describe('the markup of the notes', () => {
  it('escapes text before applying any markup', () => {
    // Given a note that carries markup of its own
    const note = 'Use <script>alert(1)</script> & "quotes"'

    // When it is rendered
    const html = renderInline(note)

    // Then nothing in it reaches the page as markup
    expect(html).toBe('Use &lt;script&gt;alert(1)&lt;/script&gt; &amp; &quot;quotes&quot;')
  })

  it('renders bold text', () => {
    // Given a note with a bold word
    const note = 'Pay **only** for what you use'

    // When it is rendered
    const html = renderInline(note)

    // Then the word is strong
    expect(html).toBe('Pay <strong>only</strong> for what you use')
  })

  it('opens every link in a new tab', () => {
    // Given a note with a link
    const note = 'See [S3](https://aws.amazon.com/s3/)'

    // When it is rendered
    const html = renderInline(note)

    // Then the link opens in a new tab without handing over the opener
    expect(html).toBe('See <a href="https://aws.amazon.com/s3/" target="_blank" rel="noopener noreferrer">S3</a>')
  })

  it('keeps markup inside a code span literal', () => {
    // Given a code span holding characters the other rules read
    const note = 'Name it `**bucket**`'

    // When it is rendered
    const html = renderInline(note)

    // Then the span keeps them as text
    expect(html).toBe('Name it <code>**bucket**</code>')
  })

  it('reads as plain text without its markup', () => {
    // Given a note with code, bold text and a link
    const note = '`val` is **read-only**, see [the docs](https://kotlinlang.org)'

    // When it is read as plain text
    const text = plainText(note)

    // Then only the words are left
    expect(text).toBe('val is read-only, see the docs')
  })
})

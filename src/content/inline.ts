/**
 * Renders the small markup the notes are written in into HTML.
 *
 * The text is escaped first and the markup applied after, so nothing in the notes can reach the page as
 * markup of its own. Code spans are lifted out before the other rules run, so an asterisk or a bracket
 * inside one stays literal.
 */
/** Running text in the small markup: `**bold**`, `` `code` `` and `[label](address)`. */
export type Inline = string

const ESCAPES: Readonly<Record<string, string>> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (char) => ESCAPES[char] ?? char)
}

export function renderInline(text: Inline): string {
  const codes: string[] = []
  const lifted = escapeHtml(text).replace(/`([^`]+)`/g, (_, code: string) => {
    codes.push(`<code>${code}</code>`)
    return `\uE000${codes.length - 1}\uE000`
  })

  return lifted
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\uE000(\d+)\uE000/g, (_, index: string) => codes[Number(index)] ?? '')
}

/** Answers the words of a note without its markup, for a place that takes plain text, such as a meta tag. */
export function plainText(text: Inline): string {
  return text
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, '$1')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
}

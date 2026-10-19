import { describe, expect, it } from 'vitest'
import { programsIn } from './examples.mjs'

describe('the programs of the notes', () => {
  it('are the Kotlin blocks with a main', () => {
    // Given a file with a program, a fragment and a block in another language
    const markdown = [
      '# Title',
      '```kotlin',
      'fun main() {',
      '    println("hi")',
      '}',
      '```',
      '```kotlin',
      'val name = "Kotlin"',
      '```',
      '```bash',
      'fun main() {}',
      '```',
    ].join('\n')

    // When its programs are read
    const programs = programsIn(markdown)

    // Then only the program is found, with the line its fence opens on
    expect(programs).toEqual([{ line: 2, code: 'fun main() {\n    println("hi")\n}\n' }])
  })

  it('read a program indented inside a list without its indentation', () => {
    // Given a program inside a list item
    const markdown = ['- Run it:', '    ```kotlin', '    fun main() {', '    }', '    ```'].join('\n')

    // When its programs are read
    const programs = programsIn(markdown)

    // Then the code comes out flush left
    expect(programs.map((program) => program.code)).toEqual(['fun main() {\n}\n'])
  })
})

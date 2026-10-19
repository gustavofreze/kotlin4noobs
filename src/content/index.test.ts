import { describe, expect, it } from 'vitest'
import { programCount, topicAt, topicsOf } from '.'
import { TOPICS } from './site'

describe('the notes in both languages', () => {
  it('publish every topic of the roadmap in the same order', () => {
    // Given the topics of the roadmap
    const slugs = TOPICS.map((topic) => topic.slug)

    // When the notes of each language are read
    const [portuguese, english] = [topicsOf('pt-BR'), topicsOf('en-US')].map((topics) => topics.map((t) => t.slug))

    // Then both publish them all, in order
    expect({ portuguese, english }).toEqual({ portuguese: slugs, english: slugs })
  })

  it('have the same number of sections in each topic', () => {
    // Given the notes of each language
    const count = (locale: 'pt-BR' | 'en-US') => topicsOf(locale).map((topic) => topic.sections.length)

    // When their sections are counted
    const [portuguese, english] = [count('pt-BR'), count('en-US')]

    // Then they match
    expect(english).toEqual(portuguese)
  })

  it('never repeat a section inside a topic', () => {
    // Given every topic in both languages
    const topics = [...topicsOf('pt-BR'), ...topicsOf('en-US')]

    // When the sections that share an identifier are collected
    const repeated = topics.flatMap((topic) =>
      topic.sections.map((section) => section.id).filter((id, index, ids) => ids.indexOf(id) !== index),
    )

    // Then there are none
    expect(repeated).toEqual([])
  })

  it('take the title of each topic from its file', () => {
    // Given the topic on variables
    const { topic } = topicAt('pt-BR', 'variables')

    // When its title is read
    const title = topic.title

    // Then it is the heading of the file
    expect(title).toBe('Variáveis')
  })

  it('place the first topic with no previous one', () => {
    // Given the first slug of the roadmap
    const [first] = topicsOf('en-US')

    // When it is looked up
    const neighbors = topicAt('en-US', first?.slug ?? '')

    // Then it has a next topic and no previous one
    expect({ previous: neighbors.previous, next: neighbors.next?.slug }).toEqual({
      previous: undefined,
      next: topicsOf('en-US')[1]?.slug,
    })
  })

  it('offer the same number of runnable programs in both languages', () => {
    // Given the notes of each language

    // When their programs are counted
    const [portuguese, english] = [programCount('pt-BR'), programCount('en-US')]

    // Then both offer the same ones
    expect(english).toBe(portuguese)
  })
})

/**
 * What sets these notes apart: their names, the groups of the roadmap, the topics inside each group and
 * the words of the home. The notes themselves are the Markdown files under `doc/readmes/`, the same files
 * the repository shows on GitHub, so the site and the repository never drift apart.
 */
import type { Locale } from '../i18n/strings'

export const SITE = {
  /** Prefixes what the site keeps in the browser, which every site under the same domain shares. */
  id: 'k4n',
  repository: 'kotlin4noobs',
  /** The name of the notes as the home and the preview card draw them, the second part highlighted. */
  name: { lead: 'Kotlin', highlight: '4Noobs' },
  playground: 'https://play.kotlinlang.org',
  /** The initiative the guide is part of, a collection of guides for beginners. */
  community: 'https://github.com/he4rt/4noobs',
  /** The groups of the roadmap, in the order the home lists them. */
  groups: [
    'environment',
    'principles',
    'data-structures',
    'error-handling',
    'asynchronous-programming',
    'best-practices',
  ],
} as const

export type TopicGroup = (typeof SITE.groups)[number]

/**
 * One topic of the roadmap. The slug is the name of its Markdown file, lowercased and with hyphens, so a
 * relative link between two files of the notes can be turned into a link between two pages.
 */
export interface TopicEntry {
  readonly slug: string
  readonly group: TopicGroup
  /** The piece of Kotlin syntax that marks the topic on its card and on its cover. */
  readonly glyph: string
  /** The short name of the topic, for its card and for the way to it from the topics beside it. The page
   * itself is titled by the heading of its file, which is longer. */
  readonly name: Readonly<Record<Locale, string>>
  /** The title of the page for search engines and link previews, when "<name> in Kotlin" does not read well. */
  readonly headline?: Readonly<Record<Locale, string>>
  /** One sentence, for the card on the home and for the description of the page. */
  readonly summary: Readonly<Record<Locale, string>>
}

/** The topics, in the order the roadmap walks them. */
export const TOPICS: readonly TopicEntry[] = [
  {
    slug: 'linux',
    group: 'environment',
    glyph: '$ sdk',
    name: { 'pt-BR': 'Linux', 'en-US': 'Linux' },
    headline: { 'pt-BR': 'Instalando o Kotlin no Linux', 'en-US': 'Installing Kotlin on Linux' },
    summary: {
      'pt-BR': 'Instalando o Kotlin no Linux com o SDKMAN.',
      'en-US': 'Installing Kotlin on Linux with SDKMAN.',
    },
  },
  {
    slug: 'variables',
    group: 'principles',
    glyph: 'val',
    name: { 'pt-BR': 'Variáveis', 'en-US': 'Variables' },
    summary: {
      'pt-BR': '`val` e `var`, mutabilidade e escopo das variáveis.',
      'en-US': '`val` and `var`, mutability and the scope of variables.',
    },
  },
  {
    slug: 'data-types',
    group: 'principles',
    glyph: 'Int',
    name: { 'pt-BR': 'Tipos de dados', 'en-US': 'Data types' },
    summary: {
      'pt-BR': 'Números, caracteres, booleanos, strings e arrays.',
      'en-US': 'Numbers, characters, booleans, strings and arrays.',
    },
  },
  {
    slug: 'functions',
    group: 'principles',
    glyph: 'fun',
    name: { 'pt-BR': 'Funções', 'en-US': 'Functions' },
    summary: {
      'pt-BR': 'Declaração, parâmetros, retorno e funções de expressão única.',
      'en-US': 'Declaration, parameters, return values and single-expression functions.',
    },
  },
  {
    slug: 'operators',
    group: 'principles',
    glyph: '+=',
    name: { 'pt-BR': 'Operadores', 'en-US': 'Operators' },
    summary: {
      'pt-BR': 'Operadores aritméticos, de comparação, lógicos, de intervalo e de tipo.',
      'en-US': 'Arithmetic, comparison, logical, range and type operators.',
    },
  },
  {
    slug: 'conditions',
    group: 'principles',
    glyph: 'when',
    name: { 'pt-BR': 'Expressões condicionais', 'en-US': 'Conditional expressions' },
    summary: {
      'pt-BR': '`if` e `when` como expressões que devolvem valor.',
      'en-US': '`if` and `when` as expressions that return a value.',
    },
  },
  {
    slug: 'loops',
    group: 'principles',
    glyph: 'for',
    name: { 'pt-BR': 'Loops', 'en-US': 'Loops' },
    summary: {
      'pt-BR': '`for`, `while`, `do-while`, intervalos e controle de fluxo.',
      'en-US': '`for`, `while`, `do-while`, ranges and flow control.',
    },
  },
  {
    slug: 'scope-functions',
    group: 'principles',
    glyph: 'apply',
    name: { 'pt-BR': 'Funções de escopo', 'en-US': 'Scope functions' },
    summary: {
      'pt-BR': '`let`, `run`, `with`, `apply` e `also`, e quando usar cada uma.',
      'en-US': '`let`, `run`, `with`, `apply` and `also`, and when to use each one.',
    },
  },
  {
    slug: 'collections',
    group: 'data-structures',
    glyph: 'List',
    name: { 'pt-BR': 'Coleções', 'en-US': 'Collections' },
    summary: {
      'pt-BR': 'Listas, conjuntos e mapas, imutáveis e mutáveis.',
      'en-US': 'Lists, sets and maps, read-only and mutable.',
    },
  },
  {
    slug: 'classes-objects',
    group: 'data-structures',
    glyph: 'class',
    name: { 'pt-BR': 'Classes e objetos', 'en-US': 'Classes and objects' },
    summary: {
      'pt-BR': 'Classes, construtores, herança, data classes e objetos.',
      'en-US': 'Classes, constructors, inheritance, data classes and objects.',
    },
  },
  {
    slug: 'generics',
    group: 'data-structures',
    glyph: '<T>',
    name: { 'pt-BR': 'Genéricos', 'en-US': 'Generics' },
    summary: {
      'pt-BR': 'Classes e funções genéricas, restrições e variância.',
      'en-US': 'Generic classes and functions, constraints and variance.',
    },
  },
  {
    slug: 'exceptions',
    group: 'error-handling',
    glyph: 'throw',
    name: { 'pt-BR': 'Exceções', 'en-US': 'Exceptions' },
    summary: {
      'pt-BR': '`try`, `catch`, `finally` e o lançamento de exceções.',
      'en-US': '`try`, `catch`, `finally` and throwing exceptions.',
    },
  },
  {
    slug: 'null-safety',
    group: 'error-handling',
    glyph: '?.',
    name: { 'pt-BR': 'Operadores seguros', 'en-US': 'Null safety' },
    headline: { 'pt-BR': 'Null safety e operadores seguros em Kotlin', 'en-US': 'Null safety in Kotlin' },
    summary: {
      'pt-BR': 'Tipos anuláveis, chamada segura, Elvis e o operador `!!`.',
      'en-US': 'Nullable types, safe calls, Elvis and the `!!` operator.',
    },
  },
  {
    slug: 'coroutines',
    group: 'asynchronous-programming',
    glyph: 'suspend',
    name: { 'pt-BR': 'Corrotinas', 'en-US': 'Coroutines' },
    summary: {
      'pt-BR': 'Concorrência estruturada com `launch`, `async`, `suspend` e dispatchers.',
      'en-US': 'Structured concurrency with `launch`, `async`, `suspend` and dispatchers.',
    },
  },
  {
    slug: 'conventions',
    group: 'best-practices',
    glyph: '.kt',
    name: { 'pt-BR': 'Convenções de código', 'en-US': 'Coding conventions' },
    summary: {
      'pt-BR': 'As convenções de código do Kotlin: nomes, formatação e organização.',
      'en-US': 'The Kotlin coding conventions: naming, formatting and layout.',
    },
  },
]

export interface Link {
  readonly label: string
  readonly href: string
}

export interface SiteText {
  readonly meta: { readonly title: string; readonly description: string }
  readonly brand: string
  readonly home: {
    readonly eyebrow: string
    readonly title: string
    readonly lede: string
    readonly groups: Readonly<Record<TopicGroup, { readonly title: string; readonly lede: string }>>
    readonly others: { readonly title: string; readonly lede: string; readonly links: readonly Link[] }
  }
  readonly searchPlaceholder: string
}

/** The links of the home that lead out of the notes: tools, examples and the community. */
const POCS: readonly Link[] = [
  { label: 'financial', href: 'https://github.com/gustavofreze/financial' },
  { label: 'transactional-outbox', href: 'https://github.com/gustavofreze/transactional-outbox' },
  { label: 'kotlin-script-examples', href: 'https://github.com/Kotlin/kotlin-script-examples' },
  { label: 'example-kotlin-springboot-rest', href: 'https://github.com/justiandre/example-kotlin-springboot-rest' },
]

export const SITE_TEXT: Readonly<Record<Locale, SiteText>> = {
  'en-US': {
    meta: {
      title: 'Learn Kotlin from scratch · Kotlin4Noobs',
      description:
        'Learn Kotlin from scratch with a free guide in English and Portuguese: variables, functions, collections, classes, null safety and coroutines, with examples that run in the browser.',
    },
    brand: 'Kotlin4Noobs',
    home: {
      eyebrow: 'Kotlin · From scratch',
      title: 'Kotlin4Noobs',
      lede: 'From your first `val` to coroutines, one step at a time. A free guide in English and Portuguese, with examples you run right in the page.',
      groups: {
        environment: { title: 'Environment setup', lede: 'Getting Kotlin onto your machine.' },
        principles: { title: 'Principles', lede: 'The building blocks of every Kotlin program.' },
        'data-structures': { title: 'Data structures', lede: 'Collections, classes and generic types.' },
        'error-handling': { title: 'Error handling', lede: 'Exceptions and the type system against null.' },
        'asynchronous-programming': { title: 'Asynchronous programming', lede: 'Concurrent code with coroutines.' },
        'best-practices': { title: 'Best practices', lede: 'Writing Kotlin the way Kotlin is written.' },
      },
      others: {
        title: 'More',
        lede: 'Tools, examples of real code and the community.',
        links: [
          { label: 'IntelliJ IDEA', href: 'https://www.jetbrains.com/idea/download/' },
          ...POCS,
          { label: 'Brazilian companies using Kotlin', href: 'https://github.com/Kotlin-BR/kotlin-no-backend' },
        ],
      },
    },
    searchPlaceholder: 'E.g. data class, when, coroutines',
  },
  'pt-BR': {
    meta: {
      title: 'Aprenda Kotlin do zero · Kotlin4Noobs',
      description:
        'Aprenda Kotlin do zero com um guia gratuito em português e inglês: variáveis, funções, coleções, classes, null safety e corrotinas, com exemplos que rodam no navegador.',
    },
    brand: 'Kotlin4Noobs',
    home: {
      eyebrow: 'Kotlin · Do zero ao avançado',
      title: 'Kotlin4Noobs',
      lede: 'Do primeiro `val` às corrotinas, um passo de cada vez. Um guia gratuito em português e inglês, com exemplos que você executa direto na página.',
      groups: {
        environment: { title: 'Configuração de ambiente', lede: 'Colocando o Kotlin na sua máquina.' },
        principles: { title: 'Fundamentos', lede: 'As peças de todo programa em Kotlin.' },
        'data-structures': { title: 'Estruturas de dados', lede: 'Coleções, classes e tipos genéricos.' },
        'error-handling': { title: 'Tratamento de erros', lede: 'Exceções e o sistema de tipos contra o null.' },
        'asynchronous-programming': { title: 'Programação assíncrona', lede: 'Código concorrente com corrotinas.' },
        'best-practices': { title: 'Boas práticas', lede: 'Escrevendo Kotlin do jeito que Kotlin é escrito.' },
      },
      others: {
        title: 'Outros',
        lede: 'Ferramentas, exemplos de código real e a comunidade.',
        links: [
          { label: 'IntelliJ IDEA', href: 'https://www.jetbrains.com/idea/download/' },
          ...POCS,
          { label: 'Empresas brasileiras que usam Kotlin', href: 'https://github.com/Kotlin-BR/kotlin-no-backend' },
        ],
      },
    },
    searchPlaceholder: 'Ex.: data class, when, corrotinas',
  },
}

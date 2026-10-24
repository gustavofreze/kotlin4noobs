/**
 * The words of the interface around the notes, in each language the site ships. The notes themselves
 * live in `content/`, and this table holds only the chrome: the bar, the controls, the home and the
 * labels of a topic page.
 */
import { SITE_TEXT, type SiteText } from '../content/site'

export type Locale = 'pt-BR' | 'en-US'

/** The id of the main landmark, which the skip link jumps to. */
export const MAIN_ID = 'content'

export interface SiteCopy {
  readonly meta: SiteText['meta'] & { readonly ogLocale: string }
  readonly brand: string
  readonly skipLink: string
  readonly theme: { readonly label: string; readonly light: string; readonly dark: string }
  readonly localeSwitch: { readonly ariaLabel: string; readonly names: Readonly<Record<Locale, string>> }
  readonly nav: {
    readonly home: string
    readonly toTop: string
    readonly roadmap: string
    readonly breadcrumb: string
    readonly search: string
  }
  readonly home: SiteText['home'] & {
    readonly start: string
    readonly playground: string
    readonly community: string
    readonly console: string
    readonly finished: string
    /** The facts of the guide under the words of the hero, with `{topics}` and `{programs}` standing for the numbers. */
    readonly facts: string
  }
  readonly topic: {
    readonly onThisPage: string
    /** The title of a topic page for search engines, made of the short name of the topic. */
    readonly headline: (name: string) => string
    /** What closes the description of a topic page, after its summary. */
    readonly pitch: string
    readonly previous: string
    readonly next: string
    /** The control that runs a program of the notes on the Kotlin Playground, and what it says meanwhile. */
    readonly run: string
    readonly loading: string
    readonly unavailable: string
    readonly step: (index: number, total: number) => string
  }
  readonly search: {
    readonly title: string
    readonly lede: string
    readonly label: string
    readonly placeholder: string
    readonly idle: string
    readonly loading: string
    readonly empty: string
    readonly unavailable: string
    /** How many pages matched, with `{count}` standing for the number. */
    readonly count: string
    readonly close: string
  }
  readonly footer: { readonly source: string }
  readonly notFound: { readonly title: string; readonly lede: string; readonly back: string }
}

const ptBR: SiteCopy = {
  meta: { ...SITE_TEXT['pt-BR'].meta, ogLocale: 'pt_BR' },
  brand: SITE_TEXT['pt-BR'].brand,
  skipLink: 'Pular para o conteúdo',
  theme: { label: 'Tema', light: 'Tema claro', dark: 'Tema escuro' },
  localeSwitch: {
    ariaLabel: 'Idioma',
    names: { 'pt-BR': 'Português (Brasil)', 'en-US': 'English (US)' },
  },
  nav: {
    home: 'Início',
    toTop: 'Voltar ao topo',
    roadmap: 'Roteiro',
    breadcrumb: 'Você está em',
    search: 'Buscar',
  },
  home: {
    ...SITE_TEXT['pt-BR'].home,
    start: 'Começar',
    playground: 'Playground',
    community: '4noobs',
    console: 'Saída',
    finished: 'Processo finalizado com código de saída 0',
    facts: '{topics} tópicos · {programs} exemplos executáveis',
  },
  topic: {
    onThisPage: 'Nesta página',
    headline: (name) => `${name} em Kotlin`,
    pitch: 'Parte do Kotlin4Noobs, um guia gratuito de Kotlin em português e inglês.',
    previous: 'Anterior',
    next: 'Próximo',
    run: 'Executar',
    loading: 'Carregando',
    unavailable: 'Indisponível',
    step: (index, total) => `${String(index).padStart(2, '0')} de ${String(total).padStart(2, '0')}`,
  },
  search: {
    title: 'Buscar nas notas',
    lede: 'Procure um conceito, uma palavra-chave ou um trecho de código.',
    label: 'Termo de busca',
    placeholder: SITE_TEXT['pt-BR'].searchPlaceholder,
    idle: 'Digite pelo menos duas letras.',
    loading: 'Buscando...',
    empty: 'Nada encontrado. Tente outra palavra.',
    unavailable: 'A busca só funciona no site gerado pelo build.',
    count: 'Resultados: {count}',
    close: 'Fechar a busca',
  },
  footer: { source: 'Código no GitHub' },
  notFound: {
    title: 'Página não encontrada',
    lede: 'O endereço não existe ou mudou de lugar.',
    back: 'Voltar ao início',
  },
}

const enUS: SiteCopy = {
  meta: { ...SITE_TEXT['en-US'].meta, ogLocale: 'en_US' },
  brand: SITE_TEXT['en-US'].brand,
  skipLink: 'Skip to content',
  theme: { label: 'Theme', light: 'Light theme', dark: 'Dark theme' },
  localeSwitch: {
    ariaLabel: 'Language',
    names: { 'pt-BR': 'Português (Brasil)', 'en-US': 'English (US)' },
  },
  nav: {
    home: 'Home',
    toTop: 'Back to top',
    roadmap: 'Roadmap',
    breadcrumb: 'You are here',
    search: 'Search',
  },
  home: {
    ...SITE_TEXT['en-US'].home,
    start: 'Start',
    playground: 'Playground',
    community: '4noobs',
    console: 'Output',
    finished: 'Process finished with exit code 0',
    facts: '{topics} topics · {programs} runnable examples',
  },
  topic: {
    onThisPage: 'On this page',
    headline: (name) => `${name} in Kotlin`,
    pitch: 'Part of Kotlin4Noobs, a free Kotlin guide in English and Portuguese.',
    previous: 'Previous',
    next: 'Next',
    run: 'Run',
    loading: 'Loading',
    unavailable: 'Unavailable',
    step: (index, total) => `${String(index).padStart(2, '0')} of ${String(total).padStart(2, '0')}`,
  },
  search: {
    title: 'Search the notes',
    lede: 'Look up a concept, a keyword or a piece of code.',
    label: 'Search term',
    placeholder: SITE_TEXT['en-US'].searchPlaceholder,
    idle: 'Type at least two letters.',
    loading: 'Searching...',
    empty: 'Nothing found. Try another word.',
    unavailable: 'Search only works on the site produced by the build.',
    count: 'Results: {count}',
    close: 'Close the search',
  },
  footer: { source: 'Source on GitHub' },
  notFound: {
    title: 'Page not found',
    lede: 'This address does not exist or has moved.',
    back: 'Back to home',
  },
}

const COPY: Readonly<Record<Locale, SiteCopy>> = { 'pt-BR': ptBR, 'en-US': enUS }

export function getCopy(locale: Locale): SiteCopy {
  return COPY[locale]
}

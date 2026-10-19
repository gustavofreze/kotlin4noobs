# Contribuindo

* [Overview](#overview)
* [Como posso contribuir?](#contributing)
    - [Relatando bugs](#reporting-bugs)
    - [Sugerindo melhorias](#suggesting-improvements)
    - [Desenvolvendo](#developing)

<div id='overview'></div> 

## Overview

Obrigado por investir seu tempo em contribuir para o projeto.

Estas são as principais diretrizes, use seu bom senso e sinta-se à vontade para propor alterações a este documento em
um pull request.

<div id='contributing'></div> 

## Como posso contribuir?

Esta seção orienta você as possíveis maneiras de contribuir.

<div id='reporting-bugs'></div> 

### Relatando bugs

Os bugs são rastreados como [issues](https://github.com/gustavofreze/kotlin4noobs/issues) no GitHub, crie um problema e
forneça as seguintes informações:

- Use um título claro e descritivo para identificar o problema.
- Descreva as etapas exatas que reproduzem o problema com o máximo de detalhes possível.

<div id='suggesting-improvements'></div> 

### Sugerindo melhorias

As sugestões de melhorias são rastreadas como [issues](https://github.com/gustavofreze/kotlin4noobs/issues) no
GitHub, crie sua sugestão e forneça a informação a seguir:

- Use um título claro e descritivo para identificar a sugestão.
- Descreva o comportamento atual e explique qual comportamento você esperava ver e por quê.
- Explique porque esse aprimoramento seria útil para a maioria dos usuários.

<div id='developing'></div> 

### Desenvolvendo

Para iniciar o desenvolvimento, você precisará seguir alguns passos:

- Fork este repositório.
- Faça um clone do repositório que você fez seu fork.
- Crie uma branch a partir da branch `main`.
- Adicione sua contribuição, faça o commit e push.
- Abra um [pull request](https://github.com/gustavofreze/kotlin4noobs/pulls).

Ao alterar o conteúdo, mantenha as duas línguas em sincronia:

- As notas em português ficam em `doc/readmes/roadmap/` e as em inglês em `doc/readmes/en-us/roadmap/`, com os mesmos
  arquivos e as mesmas seções (`###`) na mesma ordem.
- Um tópico novo também precisa ser registrado em `src/content/site.ts`, com o seu grupo, glifo, nome e resumo.
- Todo bloco `kotlin` com `fun main` vira um exemplo executável no site, então ele precisa compilar e rodar sozinho.

Antes de abrir o pull request, rode `make tests`, `make review` e `make examples`.

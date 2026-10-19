<!--suppress HtmlDeprecatedAttribute -->
<p align="center"><img src="doc/images/header-4noobs.svg" alt="4noobs header."></p>

# Kotlin4Noobs

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

* [Overview](#overview)
    - [Topics](#topics)
    - [Runnable examples](#runnable-examples)
    - [Other resources](#other-resources)
* [Installation](#installation)
    - [Repository](#repository)
    - [Configuration](#configuration)
    - [Tests](#tests)
    - [Review](#review)
    - [Examples](#examples)
    - [Maintenance](#maintenance)
* [Environment setup](#environment-setup)
    - [Access URLs](#access-urls)
* [Deployment](#deployment)
* [Contributing](#contributing)

## Overview

A guide to learn Kotlin from scratch, part of the [4noobs](https://github.com/he4rt/4noobs) initiative, in Portuguese
and English, published at [gustavofreze.github.io/kotlin4noobs](https://gustavofreze.github.io/kotlin4noobs/). The
notes are the Markdown files under `doc/readmes/`, read the same way on GitHub and on the site, which adds search and
runs the examples in the page.

### Topics

| Group                    | Topic                   | Portuguese                                                              | English                                                                     |
|:-------------------------|:------------------------|:------------------------------------------------------------------------|:----------------------------------------------------------------------------|
| Environment setup        | Linux                   | [Português](doc/readmes/roadmap/environment/LINUX.md)                   | [English](doc/readmes/en-us/roadmap/environment/LINUX.md)                   |
| Principles               | Variables               | [Português](doc/readmes/roadmap/principles/VARIABLES.md)                | [English](doc/readmes/en-us/roadmap/principles/VARIABLES.md)                |
| Principles               | Data types              | [Português](doc/readmes/roadmap/principles/DATA_TYPES.md)               | [English](doc/readmes/en-us/roadmap/principles/DATA_TYPES.md)               |
| Principles               | Functions               | [Português](doc/readmes/roadmap/principles/FUNCTIONS.md)                | [English](doc/readmes/en-us/roadmap/principles/FUNCTIONS.md)                |
| Principles               | Operators               | [Português](doc/readmes/roadmap/principles/OPERATORS.md)                | [English](doc/readmes/en-us/roadmap/principles/OPERATORS.md)                |
| Principles               | Conditional expressions | [Português](doc/readmes/roadmap/principles/CONDITIONS.md)               | [English](doc/readmes/en-us/roadmap/principles/CONDITIONS.md)               |
| Principles               | Loops                   | [Português](doc/readmes/roadmap/principles/LOOPS.md)                    | [English](doc/readmes/en-us/roadmap/principles/LOOPS.md)                    |
| Principles               | Scope functions         | [Português](doc/readmes/roadmap/principles/SCOPE_FUNCTIONS.md)          | [English](doc/readmes/en-us/roadmap/principles/SCOPE_FUNCTIONS.md)          |
| Data structures          | Collections             | [Português](doc/readmes/roadmap/data-structures/COLLECTIONS.md)         | [English](doc/readmes/en-us/roadmap/data-structures/COLLECTIONS.md)         |
| Data structures          | Classes and objects     | [Português](doc/readmes/roadmap/data-structures/CLASSES_OBJECTS.md)     | [English](doc/readmes/en-us/roadmap/data-structures/CLASSES_OBJECTS.md)     |
| Data structures          | Generics                | [Português](doc/readmes/roadmap/data-structures/GENERICS.md)            | [English](doc/readmes/en-us/roadmap/data-structures/GENERICS.md)            |
| Error handling           | Exceptions              | [Português](doc/readmes/roadmap/error-handling/EXCEPTIONS.md)           | [English](doc/readmes/en-us/roadmap/error-handling/EXCEPTIONS.md)           |
| Error handling           | Null safety             | [Português](doc/readmes/roadmap/error-handling/NULL_SAFETY.md)          | [English](doc/readmes/en-us/roadmap/error-handling/NULL_SAFETY.md)          |
| Asynchronous programming | Coroutines              | [Português](doc/readmes/roadmap/asynchronous-programming/COROUTINES.md) | [English](doc/readmes/en-us/roadmap/asynchronous-programming/COROUTINES.md) |
| Best practices           | Coding conventions      | [Português](doc/readmes/roadmap/best-practices/CONVENTIONS.md)          | [English](doc/readmes/en-us/roadmap/best-practices/CONVENTIONS.md)          |

### Runnable examples

Every Kotlin block with a `fun main` is a runnable example. On the site it runs in place on the
[Kotlin Playground](https://play.kotlinlang.org), on the latest stable version of Kotlin. The `Validate examples`
workflow compiles and runs every example on that same version on each pull request that changes the notes and every
Monday. The weekly run also checks for a newer Kotlin Playground, and opens an issue saying what to change when either
check fails.

### Other resources

| Resource                         | Link                                                   |
|:---------------------------------|:-------------------------------------------------------|
| IntelliJ IDEA                    | [Link](https://www.jetbrains.com/idea/download/)       |
| Kotlin Playground                | [Link](https://play.kotlinlang.org)                    |
| Kotlin POCs                      | [Link](doc/readmes/POCs.md)                            |
| Brazilian companies using Kotlin | [Link](https://github.com/Kotlin-BR/kotlin-no-backend) |

## Installation

### Repository

To clone the repository using the command line, run:

```bash
git clone https://github.com/gustavofreze/kotlin4noobs.git
```

### Configuration

To install project dependencies locally, run:

```bash
make configure
```

To start the development server with live reload, run:

```bash
make start
```

To stop the development server, run:

```bash
make stop
```

To build the site and its search index into `dist/`, run:

```bash
make build
```

To serve the built site, search included, as it is published, run:

```bash
make preview
```

### Tests

Run the unit tests:

```bash
make tests
```

Check the script every built page ships against its budget (run after `make build`):

```bash
make budgets
```

### Review

Run the linter, the formatter check and the Astro and TypeScript checks:

```bash
make review
```

Fix linter and formatter issues:

```bash
make fix-review
```

### Examples

Compile and run every example of the notes on the latest stable Kotlin of the Playground:

```bash
make examples
```

### Maintenance

Remove dependencies and generated artifacts:

```bash
make clean
```

> You can check other available commands by running `make help`.

## Environment setup

### Access URLs

| Environment  | URL                                           |
|:-------------|:----------------------------------------------|
| `Local`      | http://localhost:4321/kotlin4noobs/           |
| `Production` | https://gustavofreze.github.io/kotlin4noobs   |

## Deployment

The `CD (Deploy site)` workflow builds the site and publishes it on GitHub Pages. It runs on demand from the Actions tab.

## Contributing

Follow the [contribution guidelines](CONTRIBUTING.md) to contribute to the project.

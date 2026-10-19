# Funções de escopo

As funções de escopo executam um bloco de código no contexto de um objeto. Dentro do bloco, o objeto é acessado sem
repetir o seu nome, o que deixa o código mais curto e mais fácil de ler. São cinco: `let`, `run`, `with`, `apply` e
`also`.

Elas diferem em duas coisas: como o objeto é acessado dentro do bloco (`it` ou `this`) e o que a função devolve (o
resultado do bloco ou o próprio objeto).

| Função  | Objeto no bloco | Devolve               | Uso comum                                   |
|:--------|:----------------|:----------------------|:--------------------------------------------|
| `let`   | `it`            | o resultado do bloco  | Executar código só quando o valor não é nulo |
| `run`   | `this`          | o resultado do bloco  | Configurar um objeto e calcular um resultado |
| `with`  | `this`          | o resultado do bloco  | Agrupar várias chamadas sobre um objeto     |
| `apply` | `this`          | o próprio objeto      | Configurar um objeto                        |
| `also`  | `it`            | o próprio objeto      | Efeitos colaterais, como logs               |

### let

`let` é muito usado com o operador de chamada segura `?.`, para executar um bloco apenas quando o valor não é nulo:

```kotlin
fun main() {
    val name: String? = "Kotlin"

    val length = name?.let {
        println("O nome é $it")
        it.length
    }

    println("Tamanho: $length") // Tamanho: 6
}
```

### apply

`apply` devolve o próprio objeto, por isso é a escolha natural para configurá-lo logo após criá-lo:

```kotlin
class Account {
    var owner: String = ""
    var balance: Double = 0.0
}

fun main() {
    val account = Account().apply {
        owner = "Gustavo"
        balance = 100.0
    }

    println("${account.owner}: ${account.balance}") // Gustavo: 100.0
}
```

### also

`also` também devolve o próprio objeto, mas acessa o objeto como `it`. Serve para fazer algo a mais com o valor, como
registrar um log, sem alterar o fluxo:

```kotlin
fun main() {
    val numbers = mutableListOf(3, 1, 2)
        .also { println("Lista original: $it") }
        .apply { sort() }

    println("Lista ordenada: $numbers") // Lista ordenada: [1, 2, 3]
}
```

### run e with

`run` e `with` acessam o objeto como `this` e devolvem o resultado do bloco. A diferença é que `run` é chamado sobre o
objeto, enquanto `with` recebe o objeto como argumento:

```kotlin
fun main() {
    val text = "Kotlin4Noobs"

    val summary = text.run { "$this tem $length caracteres" }

    val report = with(StringBuilder()) {
        append("Linguagem: ")
        append("Kotlin")
        toString()
    }

    println(summary) // Kotlin4Noobs tem 12 caracteres
    println(report) // Linguagem: Kotlin
}
```

> Use funções de escopo quando elas deixam o código mais claro. Encadear muitas delas, ou aninhar uma dentro da outra,
> costuma ter o efeito contrário.

<br>

Ir para o [início](https://github.com/gustavofreze/kotlin4noobs#topics).

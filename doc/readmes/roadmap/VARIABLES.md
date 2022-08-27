# Variáveis

Em Kotlin, as variáveis podem ser declaradas usando dois tipos de palavras-chave, `val` ou `var`.

## Val

Quando você precisar de variáveis em um escopo local, e que a atribuição de valor seja feita uma única vez,
então você utiliza a palavra-chave `val`:

```kotlin
val name: String = "kotlin"
```

## Val

Quando você precisar de variáveis em um escopo global, ou, que possam receber uma atribuição de valor mais de uma vez,
então você utiliza a palavra-chave `var`:

```kotlin
var name: String = "kotlin"
name = "kotlin 123"
```

Ir para [tipos de dados](TYPES.md).

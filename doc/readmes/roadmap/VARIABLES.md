# Variáveis

* [Val](#val)
* [Var](#var)
* [Escopos](#scopes)

Em Kotlin, as variáveis podem ser declaradas usando dois tipos de palavras-chave, `val` ou `var`.

<div id='val'></div> 

## Val

Quando você precisar de variáveis em que a atribuição de valor seja feita uma única vez, então você utiliza a
palavra-chave `val`:

```kotlin
val name: String = "kotlin"
```

<div id='var'></div> 

## Var

Quando você precisar de variáveis que possam receber uma atribuição de valor mais de uma vez, então você utiliza a
palavra-chave `var`:

```kotlin
var name: String = "kotlin"
name = "kotlin 123"
```

<div id='scopes'></div> 

## Escopos

As variáveis em Kotlin podem ser declaradas em escopos diferentes, isto é, podem ser variáveis locais ou com um escopo
global.

Vejamos um exemplo em uma [classe](CLASS.md):

```kotlin
class Language {
    val name = "Kotlin"

    fun register() {
        val template = "Language: %s."
        println(template.format(name))
    }
}
```

Nesse exemplo, a variável `name` está no nível mais elevado/global, e a variável `template` é local porque está na
função `register`. A variável de nível elevado `name` pode ser utilizada em qualquer lugar, inclusive em outros
arquivos, enquanto a variável local `template` pode ser utilizada somente na função onde foi declarada:

```kotlin
fun main() {
    val language = Language()
    language.register()    // Imprime "Language: Kotlin.".
    println(language.name) // Eu posso acessar a variável name, pois ela é global. Imprime "Kotlin".
}
```

_Você pode testar esse código [online](https://pl.kotl.in/2EZqH2QuF)._

<br>

Ir para [tipos de dados](TYPES.md).

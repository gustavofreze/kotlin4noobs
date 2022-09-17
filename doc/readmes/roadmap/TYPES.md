# Tipos de dados

Em Kotlin, tudo é um objeto no sentido de que você pode chamar funções de membro, e propriedades em qualquer variável.

* [Numbers](#numbers)
    - [Integers](#integers)
        - [Byte](#byte)
        - [Short](#short)
        - [Int](#int)
        - [Long](#long)
        - [Funções auxiliares](#integers-functions)
    - [Floating](#floating)
        - [Float](#float)
        - [Double](#double)
        - [Funções auxiliares](#floating-functions)
* [Booleans](#booleans)
* [Strings](#strings)
* [Arrays](#arrays)

<div id='numbers'></div> 

## Numbers

<div id='integers'></div> 

### Integers

Kotlin fornece um conjunto de tipos internos que representam números. Para números inteiros, existem quatro tipos com
tamanhos diferentes e, intervalos de valores:

<div id='byte'></div> 

#### Byte

É representado pela palavra-chave `Byte`. Seu tamanho em bits é 8. Com valor mínimo sendo -128 e valor máximo 127:

```kotlin
val one: Byte = 1
```

<div id='short'></div> 

#### Short

É representado pela palavra-chave `Short`. Seu tamanho em bits é 16. Com valor mínimo sendo -32768 e valor máximo 32767:

```kotlin
val one: Short = 1
```

<div id='int'></div> 

#### Int

É representado pela palavra-chave `Int`. Seu tamanho em bits é 32. Com valor mínimo sendo
-2.147.483.648 (-2<sup>31</sup>) e valor máximo 2.147.483.647 (2<sup>31</sup> - 1):

```kotlin
val one: Int = 1
val two = 2
```

<div id='long'></div> 

#### Long

É representado pela palavra-chave `Long`. Seu tamanho em bits é 64. Com valor mínimo sendo
-9.223.372.036.854.775.808 (-2<sup>63</sup>) e valor máximo 9.223.372.036.854.775.807 (2<sup>63</sup> - 1):

```kotlin
val one: Long = 1
val two = 2L
val threeBillion = 3000000000
```

<div id='integers-functions'></div> 

#### Funções auxiliares

Cada tipo de número tem funções auxiliares que convertem de um tipo de número para outro:

```kotlin
val value: Int = 1234567

fun main() {
    println(value.toByte())  // Imprime "-121".
    println(value.toLong())  // Imprime "1234567".
    println(value.toShort()) // Imprime "-10617".
}
```

_Você pode testar esse código [online](https://pl.kotl.in/ZNnMuVnMf)._

**Nota**
> Quando você inicializa uma variável sem especificação de tipo explícita, o compilador infere automaticamente o tipo
> com o menor intervalo suficiente para representar o valor.
> Se não estiver excedendo o intervalo de `Int`, o tipo será `Int`. Se exceder, o tipo é `Long`.

<div id='floating'></div> 

### Floating

Para [números reais](https://pt.wikipedia.org/wiki/N%C3%BAmero_real), Kotlin fornece os tipos de ponto flutuante `Float`
e `Double`, que seguem o padrão [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754).

<div id='float'></div> 

#### Float

É representado pela palavra-chave `Float`. Seu tamanho em bits é 32. Com dígitos decimais entre 6-7:

```kotlin
val one: Float = 1.0
val withDecimal = 2.1234567
```

<div id='double'></div> 

#### Double

É representado pela palavra-chave `Double`. Seu tamanho em bits é 64. Com dígitos decimais entre 15-16:

```kotlin
val one: Double = 1.0
val withDecimal = 2.123456789
```

<div id='floating-functions'></div> 

#### Funções auxiliares

Cada tipo de número tem funções auxiliares que convertem de um tipo de número para outro:

```kotlin
val value: Double = 9999.999

fun main() {
    println(value.toFloat()) // Imprime "9999.999".
}
```

_Você pode testar esse código [online](https://pl.kotl.in/XcmN3AU3P)._

## Booleans

<div id='booleans'></div> 

O tipo `Boolean` representa objetos booleanos que podem ter dois valores: `true` ou `false`:

```kotlin
val isFull: Boolean = true
val isEmpty: Boolean = false
```

O tipo `Boolean` em Kotlin é o mesmo que em Java. As operações de disjunção `||`,
conjunção `&&` e negação `!`, podem ser executadas em tipos booleanos, como em Java.

```kotlin
val one: Int = 1
val two: Int = 2
val three: Int = 3

fun main() {
    println(one < two)                // Imprime "true".
    println(one > two)                // Imprime "false".
    println(one <= two)               // Imprime "true".
    println(one >= two)               // Imprime "false".
    println(one == two)               // Imprime "false".
    println(one != three)             // Imprime "true".
    println(one < two && one < three) // Imprime "true".
    println(one < two || one < three) // Imprime "true".
}
```

_Você pode testar esse código [online](https://pl.kotl.in/Y-qzMlJwj)._

<div id='strings'></div>

## Strings

Em Kotlin as strings são representadas pelo tipo `String`. Geralmente, um valor de string é uma sequência de
caracteres entre aspas duplas ou aspas triplas:

```kotlin
val name: String = "Kotlin"
val name = "Kotlin 123"
```

Strings são imutáveis. Depois de inicializar uma string, você não pode alterar seu valor ou atribuir um novo valor a
ela. Todas as operações que transformam strings retornam seus resultados em um novo `String` objeto, deixando a string
original inalterada:

```kotlin
val name = "Kotlin"

fun main() {
    println(name.uppercase()) // Cria e imprime um novo objeto String. Imprime "KOTLIN".
    println(name)             // A string original permanece a mesma. Imprime "Kotlin".
}
```

_Você pode testar esse código [online](https://pl.kotl.in/HzzvtZb2F)._

Para criar uma sequêcia de caracteres que abrange várias linhas no arquivo de origem, nós usamos aspas triplas:

```kotlin
val json = """        
    {
        "id": "b87a002a-d2a9-4f31-8e95-271ea510b85f",
        "amount": {
            "value": "1.00",
            "currency": "BRL"
        }
    }
    """

fun main() {
    println(json)  // Imprime o json.
}
```

_Você pode testar esse código [online](https://pl.kotl.in/x8dJfuIjs)._

Kotlin também oferece suporte a interpolação de strings ou de string templates. Esta é uma maneira mais fácil de
construir strings dinâmicas do que a concatenação, que é o que usamos em Java. Usando string templates, podemos
inserir variáveis e expressões em uma string:

```kotlin
val kotlin = "Kotlin"
val template = "$kotlin is a programming language."

fun main() {
    println(template)  // Imprime "Kotlin is a programming language.".
}
```

Também é possível obter o mesmo resultado usando a função `format`:

```kotlin
val kotlin = "Kotlin"
val template = "%s is a programming language."

fun main() {
    println(template.format(kotlin))  // Imprime "Kotlin is a programming language.".
}
```

_Você pode testar esse código [online](https://pl.kotl.in/GCWMkEuHf)._

<div id='arrays'></div> 

## Arrays

Em Kotlin os arrays são representadas pelo tipo `Array`. Para criar um array, use a função `arrayOf()`
e passe os valores dos itens para ela:

```kotlin
val names = arrayOf("Kotlin", "Java", "PHP")
val values = arrayOf(1, 2, 3)
val mixedValues = arrayOf(1, "Kotlin", true, 2.51)

fun main() {
    println(names.contentToString())       // Imprime "[Kotlin, Java, PHP]".
    println(values.contentToString())      // Imprime "[1, 2, 3]".
    println(mixedValues.contentToString()) // Imprime "[1, Kotlin, true, 2.51]".
}
```

_Você pode testar esse código [online](https://pl.kotl.in/RDK1wzTW4)._

<br>

Ir para [loops](LOOPS.md).

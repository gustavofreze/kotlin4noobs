# Tipos de dados

Em Kotlin, tudo é um objeto no sentido de que você pode chamar funções de membro e propriedades em qualquer variável.

* [Numbers](#numbers)
    - [Integers](#integers)
        - [Byte](#byte)
        - [Short](#short)
        - [Int](#int)
        - [Long](#long)
    - [Floating](#floating)
        - [Float](#float)
        - [Double](#double)
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

## Booleans

<div id='booleans'></div> 

O tipo `Boolean` representa objetos booleanos que podem ter dois valores: `true` ou `false`:

```kotlin
val isFull: Boolean = true
val isEmpty: Boolean = false
```

<div id='strings'></div>

## Strings

Em Kotlin as strings são representadas pelo tipo `String`. Geralmente, um valor de string é uma sequência de
caracteres entre aspas duplas:

```kotlin
val name: String = "Kotlin"
val name = "Kotlin 123"
```

Strings são imutáveis. Depois de inicializar uma string, você não pode alterar seu valor ou atribuir um novo valor a
ela. Todas as operações que transformam strings retornam seus resultados em um novo `String` objeto, deixando a string
original inalterada:

```kotlin
val name = "Kotlin"

println(name.uppercase()) // Cria e imprime um novo objeto String. O resultado ao imprimir é "KOTLIN".
println(name)             // A string original permanece a mesma. O resultado ao imprimir é "Kotlin".
```

<div id='arrays'></div> 

## Arrays

Em Kotlin os arrays são representadas pelo tipo `Array`. Para criar um array, use a função `arrayOf()`
e passe os valores dos itens para ela.

```kotlin
val names = arrayOf("Kotlin", "Java", "PHP")
val values = arrayOf(1, 2, 3)
```

Ir para [loops](LOOPS.md).

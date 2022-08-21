# Sintaxe básica

Esta é uma coleção de elementos básicos de sintaxe com exemplos. No final de cada seção, você encontrará um link para
uma descrição detalhada do tópico relacionado.

A versão completa, e em inglês você pode encontrar [aqui](https://kotlinlang.org/docs/basic-syntax.html).

* [Definição e importações de pacotes](#package)
* [Ponto de entrada do programa](#entry-point)
* [Funções](#functions)
* [Variáveis](#variables)
* [Classes e instâncias](#class)
* [Expressões condicionais](#expressions)
* [Loop for](#loop-for)
* [Loop while](#loop-while)
* [Intervalos](#ranges)
* [Coleções](#collections)
* [Valores anuláveis e verificações nulas](#nullable)

<div id='package'></div> 

## Definição e importações de pacotes

A especificação do pacote deve estar na parte superior do arquivo de origem.

```kotlin
package my.demo

// ...
```

Não é necessário combinar diretórios e pacotes: os arquivos de origem podem ser colocados arbitrariamente no sistema de
arquivos.

Consulte [pacotes](https://kotlinlang.org/docs/packages.html).

<div id='entry-point'></div> 

## Ponto de entrada do programa

Um ponto de entrada de um aplicativo Kotlin é a função `main`.

```kotlin
fun main() {
    println("Hello world!")
}
```

Outra forma de é a função `main` aceitar um número variável de `String`.

```kotlin
fun main(args: Array<String>) {
    println(args.contentToString())
}
```

<div id='functions'></div> 

## Funções

Uma função com dois `Int` como parâmetros e retorno do tipo `Int`.

```kotlin
fun sum(a: Int, b: Int): Int {
    return a + b
}
```

Um corpo de função pode ser uma expressão. O seu tipo de retorno é inferido.

```kotlin
fun sum(a: Int, b: Int) = a + b
```

Consulte [funções](https://kotlinlang.org/docs/functions.html).

<div id='variables'></div> 

## Variáveis

Variáveis locais somente leitura são definidas usando a palavra-chave `val`. Eles podem receber um valor apenas uma vez.

```kotlin
val a: Int = 1 // Atribuição imediata.
val b = 2      // Tipo `Int` é inferido.
val c: Int     // O tipo é necessário quando nenhum inicializador é fornecido.
c = 3          // Atribuição adiada.
```

Variáveis que podem ser reatribuídas usam a palavra-chave `var`.

```kotlin
var x = 5 // Tipo `Int` é inferido.
x += 1
```

Você pode declarar variáveis no nível superior.

```kotlin
val PI = 3.14
var x = 0

fun incrementX() {
    x += 1
}
```

Consulte [variáveis](https://kotlinlang.org/docs/properties.html).

<div id='class'></div> 

## Classes e instâncias

Para definir uma classe, use a palavra-chave `class`.

```kotlin
class Shape
```

As propriedades de uma classe podem ser listadas em sua declaração ou corpo.

```kotlin
class Rectangle(var height: Double, var length: Double) {
    var perimeter = (height + length) * 2
}
```

O construtor padrão com parâmetros listados na declaração de classe está disponível automaticamente.

```kotlin
val rectangle = Rectangle(5.0, 2.0)
println("The perimeter is ${rectangle.perimeter}")
```

A herança entre classes é declarada por dois pontos `:`. As classes são finais por padrão, para tornar uma classe
herdável, marque-a como `open`.

```kotlin
open class Shape

class Rectangle(var height: Double, var length: Double) : Shape() {
    var perimeter = (height + length) * 2
}
```

Consulte [classes](https://kotlinlang.org/docs/classes.html)
e [objetos e instâncias](https://kotlinlang.org/docs/object-declarations.html).

<div id='expressions'></div> 

## Expressões condicionais

### if

```kotlin
fun maxOf(a: Int, b: Int): Int {
    if (a > b) {
        return a
    } else {
        return b
    }
}
```

Em Kotlin, `if` também pode ser usado como uma expressão.

```kotlin
fun maxOf(a: Int, b: Int) = if (a > b) a else b
```

Consulte [if-expressões](https://kotlinlang.org/docs/control-flow.html#if-expression).

### when

```kotlin
fun describe(obj: Any): String =
    when (obj) {
        1          -> "One"
        "Hello"    -> "Greeting"
        is Long    -> "Long"
        !is String -> "Not a string"
        else       -> "Unknown"
    }
```

Consulte [when-expressões](https://kotlinlang.org/docs/control-flow.html#when-expression).

<div id='loop-for'></div> 

## Loop for

```kotlin
val items = listOf("apple", "banana", "kiwifruit")
for (item in items) {
    println(item)
}
```

ou

```kotlin
val items = listOf("apple", "banana", "kiwifruit")
for (index in items.indices) {
    println("item at $index is ${items[index]}")
}
```

Consulte [loop-for](https://kotlinlang.org/docs/control-flow.html#for-loops).

<div id='loop-while'></div> 

## Loop while

```kotlin
val items = listOf("apple", "banana", "kiwifruit")
var index = 0
while (index < items.size) {
    println("item at $index is ${items[index]}")
    index++
}
```

Consulte [loop-while](https://kotlinlang.org/docs/control-flow.html#while-loops).

<div id='ranges'></div> 

## Intervalos

Verifique se um número está dentro de um intervalo usando o operador `in`.

```kotlin
val x = 10
val y = 9
if (x in 1..y + 1) {
    println("fits in range")
}
```

Verifique se um número está fora do intervalo.

```kotlin
val list = listOf("a", "b", "c")

if (-1 !in 0..list.lastIndex) {
    println("-1 is out of range")
}

if (list.size !in list.indices) {
    println("list size is out of valid list indices range, too")
}
```

Iterar em um intervalo.

```kotlin
for (x in 1..5) {
    print(x)
}
```

Ou sobre uma progressão.

```kotlin
for (x in 1..10 step 2) {
    print(x)
}

println()

for (x in 9 downTo 0 step 3) {
    print(x)
}
```

Consulte [intervalos e progressões](https://kotlinlang.org/docs/ranges.html).

<div id='collections'></div> 

## Coleções

Iterar sobre uma coleção.

```kotlin
for (item in items) {
    println(item)
}
```

Verifique se uma coleção contém um objeto usando o operador `in`.

```kotlin
when {
    "orange" in items -> println("juicy")
    "apple" in items  -> println("apple is fine too")
}
```

Usando expressões lambda para filtrar e mapear coleções:

```kotlin
val fruits = listOf("banana", "avocado", "apple", "kiwifruit")
fruits
    .filter { it.startsWith("a") }
    .sortedBy { it }
    .map { it.uppercase() }
    .forEach { println(it) }
```

Consulte [coleções](https://kotlinlang.org/docs/collections-overview.html).

<div id='nullable'></div> 

## Valores anuláveis e verificações nulas

Uma referência deve ser explicitamente marcada como anulável quando o valor `null` for possível. Os nomes de tipo
anuláveis têm um `?` no final.

Retorna `null` se `str` não contém um inteiro:

```kotlin
fun parseInt(str: String): Int? {
    // ...
}
```

Use uma função que retorna valor anulável:

```kotlin
fun printProduct(arg1: String, arg2: String) {
    val x = parseInt(arg1)
    val y = parseInt(arg2)

    // Usar `x * y` gera erro porque eles podem conter nulos.
    if (x != null && y != null) {
        // x e y são convertidos automaticamente para não anuláveis após a verificação.
        println(x * y)
    } else {
        println("'$arg1' or '$arg2' is not a number")
    }
}
```

ou

```kotlin
// ...
if (x == null) {
    println("Wrong number format in arg1: '$arg1'")
    return
}

if (y == null) {
    println("Wrong number format in arg2: '$arg2'")
    return
}

// x e y são convertidos automaticamente para não anuláveis após a verificação.
println(x * y)
```

Consulte [valores anuláveis](https://kotlinlang.org/docs/null-safety.html).

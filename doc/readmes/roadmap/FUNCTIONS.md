# Funções

* [Sintaxe](#sintaxe)
* [Extensões](#extensions)
* [Operadores aritméticos](#arithmetic-operators)
* [Funções de alta ordem e lambdas](#high-order-functions-and-lambdas)

<div id='sintaxe'></div>

## Sintaxe

Em Kotlin, as funções são declaradas usando a palavra-chave `fun`:

```kotlin
fun add() {
    //...
}
```

Você pode definir parâmetros para a função usando a notação _Pascal_, `name : type`. Os parâmetros são separados
por vírgulas e cada parâmetro deve ser digitado explicitamente:

```kotlin
fun add(augend: Int, addend: Int): Int {
    return augend + addend
}
```

Quando uma função retorna uma única expressão, as chaves podem ser omitidas e o corpo é especificado após um `=`:

```kotlin
fun add(augend: Int, addend: Int): Int = augend + addend
```

Para fazer a chamada da função:

```kotlin
add(1, 1)
```

ou usando argumentos nomeados:

```kotlin
add(augend = 1, addend = 1)
```

_Você pode testar esse código [online](https://pl.kotl.in/fuB8CNime)._

**Nota**
> Usar argumentos nomeados pode ser útil quando uma função tem muitos argumentos e é difícil associar um valor a um
> argumento.

<div id='extensions'></div>

## Extensões

É comum alguma hora querermos adicionar uma funcionalidade a mais em algum objeto.

Pensando nisso, o Kotlin possui o que chamamos de `extension functions`, que é uma forma de adicionarmos novos
comportamentos em algum objeto sem precisarmos fazer alguma modificação no objeto ou criar um objeto com o
novo comportamento.

Para criarmos uma extension function, utilizamos a sintaxe:

```kotlin
fun ClassName.newFunctionName(arguments...) {
    // ...
}
```

Agora vamos extender uma função chamada `screaming` na classe `String`, onde ela irá retornar a própria string em
maiúscula e com três pontos de exclamação no final:

```kotlin
fun String.screaming(): String = this.uppercase() + "!!!"

"Hello World".screaming()
```

_Você pode testar esse código [online](https://pl.kotl.in/vJ2KMqCUv)._

**Nota**
> Como a função faz parte do contexto String, temos acesso ao `this`, que neste caso está correspondendo a própria
> String.

<div id='arithmetic-operators'></div>

## Operadores aritméticos

Kotlin permite que você forneça implementações personalizadas para o conjunto predefinido de operadores em tipos. Esses
operadores têm representação simbólica predefinida como `+` ou `*` e precedência.

As funções são declaradas usando a palavra-chave `operator fun`:

```kotlin
data class BigNumber(val value: Int) {

    operator fun div(divisor: BigNumber): Int = value / divisor.value

    operator fun plus(addend: BigNumber): Int = value + addend.value

    operator fun minus(subtrahend: BigNumber): Int = value - subtrahend.value

    operator fun times(multiplier: BigNumber): Int = value * multiplier.value
}
```

_Você pode testar esse código [online](https://pl.kotl.in/daW6QGiZg)._

<div id='high-order-functions-and-lambdas'></div>

## Funções de alta ordem e lambdas

Em Kotlin as funções são tratadas como _cidadãos de primeira-classe_, isso significa que elas podem ser usadas como
argumentos ou retornos de funções.

Como Kotlin é uma linguagem estaticamente tipada, precisamos definir o que a função recebe e o que a função retorna.
Podemos fazer isso usando as function types que a linguagem nos fornece.

```kotlin
fun discountFactory(ratio: Int): (Double) -> Double {
    val percentage = ratio.toDouble() / 100

    val discount = fun(value: Double): Double {
        return value - (percentage * value)
    }

    return discount
}
```

Declaramos uma função chamada `discountFactory` que vai nos retornar uma função que recebe um `Double` e
retorna um `Double`.

```kotlin
val discountOf15Percent = discountFactory(15)

var amount = 3459.99

amount = discountOf15Percent(amount)
println(amount)
```

Podemos instanciar funções de duas formas: utilizando a expressão lambda ou funções anônimas.

```kotlin
val plusOneLambda = { i: Int -> i + 1 }

val plusOneAnonymous = fun(i: Int): Int {
    return i + 1
}
```

Podemos invocar as funções com o `operator invoke` ou apenas chamando como uma função normal `f(x)`:

```kotlin
plusOneLambda.invoke(41)
plusOneLambda(42)
```

É possível criar um tipo nomeado para funções usando a palavra-chave `typealias`.

```kotlin
typealias PlusOne = (Int) -> Int

val plusOneLambda: PlusOne = { i -> i + 1 }
```

_Você pode testar esse código [online](https://pl.kotl.in/wS1dVy3tT)._

<br>

Ir para [variáveis](VARIABLES.md).

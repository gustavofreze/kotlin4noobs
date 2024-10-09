# Funções

### Sintaxe

Em Kotlin, as funções são declaradas usando a palavra-chave `fun`:

```kotlin
fun add() {
    // ...
}
```

Você pode definir parâmetros para a função usando a notação _Pascal_, `name: type`. Os parâmetros são separados por
vírgulas, e cada parâmetro deve ser explicitamente tipado:

```kotlin
fun add(augend: Int, addend: Int): Int {
    return augend + addend
}
```

Quando uma função retorna uma única expressão, as chaves podem ser omitidas, e o corpo é especificado após um `=`:

```kotlin
fun add(augend: Int, addend: Int): Int = augend + addend
```

Para fazer a chamada da função:

```kotlin
add(1, 1)
```

Ou usando argumentos nomeados:

```kotlin
add(augend = 1, addend = 1)
```

_Você pode testar esse código [online](https://pl.kotl.in/YZMIY5CDY)._

**Nota**
> Usar argumentos nomeados pode ser útil quando uma função tem muitos parâmetros, facilitando a associação de valores
> aos argumentos.

### Funções de extensão

Kotlin permite adicionar funcionalidades a classes existentes sem alterá-las diretamente, usando _extension functions_.
Isso é útil para estender o comportamento de objetos existentes sem modificá-los ou criar novos tipos.

Para criar uma função de extensão, a sintaxe é:

```kotlin
fun ClassName.newFunctionName(arguments...) {
    // ...
}
```

Vamos criar uma função de extensão chamada `screaming` para a classe `String`, que retorna a string em letras
maiúsculas, seguida por três pontos de exclamação:

```kotlin
fun String.screaming(): String = uppercase() + "!!!"

"Hello World".screaming()
```

_Você pode testar esse código [online](https://pl.kotl.in/tmV30VrgP)._

### Operadores aritméticos

Kotlin permite que você sobrescreva operadores, fornecendo implementações personalizadas para operadores como `+` ou
`*`. Essas funções são declaradas usando `operator fun`:

```kotlin
data class BigNumber(val value: Int) {

    operator fun div(divisor: BigNumber): Int = value / divisor.value

    operator fun plus(addend: BigNumber): Int = value + addend.value

    operator fun minus(subtrahend: BigNumber): Int = value - subtrahend.value

    operator fun times(multiplier: BigNumber): Int = value * multiplier.value
}
```

_Você pode testar esse código [online](https://pl.kotl.in/x2pU4Iixq)._

### Funções de alta ordem e lambdas

#### Funções de alta ordem

Em Kotlin, funções podem ser tratadas como cidadãos de primeira classe, ou seja, podem ser usadas como argumentos ou
valores de retorno de outras funções.

Como Kotlin é uma linguagem estaticamente tipada, você precisa definir os tipos dos parâmetros e do retorno da função,
usando _function types_.

```kotlin
fun applyDiscount(discount: Int): (Double) -> Double {
    val percentage = discount.toDouble() / 100

    return { value -> value - (percentage * value) }
}
```

Aqui, a função `applyDiscount` retorna uma função que recebe um `Double` e também retorna um `Double`.

```kotlin
val discountOf15Percent = applyDiscount(discount = 15)
var amount = 3459.99

amount = discountOf15Percent(amount)
```

_Você pode testar esse código [online](https://pl.kotl.in/p5_E6KQhn)._

#### Lambdas

Funções podem ser instanciadas de duas maneiras: usando expressões lambda ou funções anônimas.

```kotlin
val plusOneLambda = { value: Int -> value + 1 }

val plusOneAnonymous = fun(value: Int): Int {
    return value + 1
}
```

Essas funções podem ser invocadas diretamente ou usando o `operator invoke`:

```kotlin
plusOneLambda(1)
plusOneLambda.invoke(1)

plusOneAnonymous(2)
plusOneAnonymous.invoke(2)
```

Também é possível criar tipos nomeados para funções usando `typealias`:

```kotlin
typealias Sum = (Int) -> Int

val plusOneLambda: Sum = { value: Int -> value + 1 }
```

_Você pode testar esse código [online](https://pl.kotl.in/RIlBayu5x)._

<br>

Ir para [variáveis](VARIABLES.md).

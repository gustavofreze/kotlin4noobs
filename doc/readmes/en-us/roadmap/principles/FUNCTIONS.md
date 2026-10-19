# Functions

### Syntax

In Kotlin, functions are declared using the `fun` keyword:

```kotlin
fun add() {
    // ...  
}
```

You can define parameters for the function using _Pascal_ notation, `name: type`. Parameters are separated by commas,
and each parameter must be explicitly typed:

```kotlin
fun add(augend: Int, addend: Int): Int {
    return augend + addend
}
```

When a function returns a single expression, the curly braces can be omitted, and the body is specified after an `=`:

```kotlin
fun add(augend: Int, addend: Int): Int = augend + addend
```

To call the function:

```kotlin
add(1, 1)
```

Or by using named arguments:

```kotlin
add(augend = 1, addend = 1)
```

Complete example:

```kotlin
fun add(augend: Int, addend: Int): Int = augend + addend

fun main() {
    println(add(1, 1))                    // 2
    println(add(augend = 1, addend = 1))  // 2
}
```

**Note**
> Using named arguments can be useful when a function has many parameters, making it easier to match values to
> arguments.

### Extension functions

Kotlin lets you add functionality to existing classes without changing them directly, using _extension functions_.  
This is useful for extending the behavior of existing objects without modifying them or creating new types.

To create an extension function, the syntax is:

```kotlin
fun ClassName.newFunctionName(arguments.. .) {
    // ...
}
```

Let's create an extension function called `screaming` for the `String` class, which returns the string in uppercase
letters, followed by three exclamation marks:

```kotlin
fun String.screaming(): String = uppercase() + "!!!"

"Hello World".screaming()
```

Complete example:

```kotlin
fun String.screaming(): String = uppercase() + "!!!"

fun main() {
    println("Hello World".screaming())  // HELLO WORLD!!!
}
```

### Arithmetic operators

Kotlin lets you overload operators, providing custom implementations for operators such as `+` or `*`. These functions
are declared using `operator fun`:

```kotlin
data class BigNumber(val value: Int) {

    operator fun div(divisor: BigNumber): Int = value / divisor.value

    operator fun plus(addend: BigNumber): Int = value + addend.value

    operator fun minus(subtrahend: BigNumber): Int = value - subtrahend.value

    operator fun times(multiplier: BigNumber): Int = value * multiplier.value
}
```

Complete example:

```kotlin
data class BigNumber(val value: Int) {
    operator fun div(divisor: BigNumber): Int = value / divisor.value
    operator fun plus(addend: BigNumber): Int = value + addend.value
    operator fun minus(subtrahend: BigNumber): Int = value - subtrahend.value
    operator fun times(multiplier: BigNumber): Int = value * multiplier.value
}

fun main() {
    val a = BigNumber(10)
    val b = BigNumber(5)
    
    println(a + b)  // 15
    println(a - b)  // 5
    println(a * b)  // 50
    println(a / b)  // 2
}
```

### Higher-order functions and lambdas

#### Higher-order functions

In Kotlin, functions can be treated as first-class citizens, meaning they can be used as arguments or return values of
other functions.

Since Kotlin is a statically typed language, you need to define the types of the function's parameters and return value,
using _function types_.

```kotlin
fun applyDiscount(discount: Int): (Double) -> Double {
    val percentage = discount.toDouble() / 100

    return { value -> value - (percentage * value) }
}
```

Here, the `applyDiscount` function returns a function that takes a `Double` and also returns a `Double`.

```kotlin
val discountOf15Percent = applyDiscount(discount = 15)
var amount = 3459.99

amount = discountOf15Percent(amount)
```

Complete example:

```kotlin
fun applyDiscount(discount: Int): (Double) -> Double {
    val percentage = discount.toDouble() / 100
    return { value -> value - (percentage * value) }
}

fun main() {
    val discountOf15Percent = applyDiscount(discount = 15)
    var amount = 3459.99
    
    amount = discountOf15Percent(amount)
    println(amount)  // 2940.9915
}
```

#### Lambdas

Functions can be instantiated in two ways: using lambda expressions or anonymous functions.

```kotlin
val plusOneLambda = { value: Int -> value + 1 }

val plusOneAnonymous = fun(value: Int): Int {
    return value + 1
}
```

These functions can be invoked directly or by using the `operator invoke`:

```kotlin
plusOneLambda(1)
plusOneLambda.invoke(1)

plusOneAnonymous(2)
plusOneAnonymous.invoke(2)
```

It is also possible to create named types for functions using `typealias`:

```kotlin
typealias Sum = (Int) -> Int

val plusOneLambda: Sum = { value: Int -> value + 1 }
```

Complete example:

```kotlin
typealias Sum = (Int) -> Int

fun main() {
    val plusOneLambda: Sum = { value: Int -> value + 1 }
    
    val plusOneAnonymous = fun(value: Int): Int {
        return value + 1
    }
    
    println(plusOneLambda(1))           // 2
    println(plusOneLambda.invoke(1))    // 2
    println(plusOneAnonymous(2))        // 3
    println(plusOneAnonymous.invoke(2)) // 3
}
```

<br>

Go to [operators](OPERATORS.md).

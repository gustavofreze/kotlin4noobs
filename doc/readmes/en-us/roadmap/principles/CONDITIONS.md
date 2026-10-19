# Conditional Expressions

### If

In Kotlin, `if` is an expression and returns a value. Because of this, there is no need for a ternary operator, since
`if` can be used directly:

```kotlin
var value = 1
val otherValue = 5

if (2 < otherValue) value = otherValue
```

With `else`:

```kotlin
val firstValue = 1
val secondValue = 2

if (firstValue >= secondValue) {
    println("$firstValue")
} else {
    println("$secondValue")
}
```

Complete example:

```kotlin
fun main() {
    val firstValue = 1
    val secondValue = 2
    
    if (firstValue >= secondValue) {
        println("$firstValue")
    } else {
        println("$secondValue")
    }
}
```

An `if` expression can be used in blocks. In that case, the last expression is the value of the block:

```kotlin
val firstValue = 1
val secondValue = 2

val maxValue = if (firstValue > secondValue) firstValue else secondValue
```

Complete example:

```kotlin
fun main() {
    val firstValue = 1
    val secondValue = 2
    
    val maxValue = if (firstValue > secondValue) firstValue else secondValue
    
    println(maxValue)  // 2
}
```

**Note**
> When using `if` as an expression to return or assign values, `else` is mandatory to ensure that the flow always has a
> result.

<div id='when'></div> 

### When

In Kotlin, `when` is a conditional expression with multiple branches, similar to the `switch` statement in other
languages such as PHP. The `when` evaluates its argument and compares it against the conditions of each branch until one
is satisfied:

```kotlin
val value = 3

val result = when (value) {
    1 -> "First condition."
    2 -> "Second condition."
    else -> "Default condition (else)."
}
```

Complete example:

```kotlin
fun main() {
    val value = 3
    
    val result = when (value) {
        1 -> "First condition."
        2 -> "Second condition."
        else -> "Default condition (else)."
    }
    
    println(result)  // Default condition (else).
}
```

The `when` also supports _ranges_ in its conditions:

```kotlin
val randomValue = (1..1001).random()

val result = when (randomValue) {
    in 1..100 -> "The value <$randomValue> is between 1 and 100."
    in 101..1000 -> "The value <$randomValue> is between 101 and 1000."
    else -> "The value <$randomValue> is greater than 1000."
}
```

Complete example:

```kotlin
fun main() {
    val randomValue = (1..1001).random()
    
    val result = when (randomValue) {
        in 1..100 -> "The value <$randomValue> is between 1 and 100."
        in 101..1000 -> "The value <$randomValue> is between 101 and 1000."
        else -> "The value <$randomValue> is greater than 1000."
    }
    
    println(result)
}
```

The `when` can be used both as an expression and as a statement. If used as an expression, the value of the first
matching condition is the value of the expression. If used as a statement, the values of the individual branches are
ignored. As with `if`, each branch can be a block, and the value of the last expression in the block is the value
returned.

<br>

Go to [loops](LOOPS.md).

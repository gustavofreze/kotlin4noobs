# Loops

### For

The `for` loop iterates over anything that provides an iterator. You have several options for looping with the `for`
construct.

#### Looping over a range of values

```kotlin
for (index in 1..10) {
    // ... 
}
```

In this case, the loop runs for the values of `index` from 1 to 10 (inclusive).

Complete example:

```kotlin
fun main() {
    for (index in 1..10) {
        println(index)
    }
}
```

#### Descending loop

```kotlin
for (index in 10 downTo 1) {
    // ...
}
```

Here, the loop runs for the values of `index` from 10 to 1 (inclusive), in descending order.

Complete example:

```kotlin
fun main() {
    for (index in 10 downTo 1) {
        println(index)
    }
}
```

#### Loop with a custom step

```kotlin
for (index in 0 until 10 step 2) {
    // ...
}
```

In this example, the loop runs for the values of `index` from 0 to 10 (exclusive), with a `step` of 2. That is, the
value of `index` will be 0, 2, 4, 6, 8.

Complete example:

```kotlin
fun main() {
    for (index in 0 until 10 step 2) {
        println(index)
    }
}
```

#### Looping over a collection

```kotlin
val values = arrayOf(1, 2, 3)

for (value in values) {
    // ...
}
```

The loop runs once for each element of the `values` collection.

Complete example:

```kotlin
fun main() {
    val values = arrayOf(1, 2, 3)
    
    for (value in values) {
        println(value)
    }
}
```

### While and do-while

The `while` and `do-while` loops run repeatedly as long as the condition is true. The main difference between them is
when the condition is checked.

#### While

Checks the condition before running the loop body. If the condition is met, the body runs and then the condition is
checked again:

```kotlin
var value = 2

while (value > 0) {
    println(value)
    value--
}
```

Complete example:

```kotlin
fun main() {
    var value = 2
    
    while (value > 0) {
        println(value)
        value--
    }
}
```

#### Do-while

Runs the loop body at least once, regardless of the condition, and only then checks the condition:

```kotlin
var value = 2

do {
    println(value)
    value--
} while (value > 0)
```

Complete example:

```kotlin
fun main() {
    var value = 2
    
    do {
        println(value)
        value--
    } while (value > 0)
}
```

<br>

Go to [scope functions](SCOPE_FUNCTIONS.md).

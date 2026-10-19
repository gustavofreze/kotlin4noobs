# Data types

Kotlin offers a wide range of data types, from basic ones such as integers and floating-point numbers to more specific
types such as dates and others. Here are the most common types you will encounter in Kotlin.

### Integers

Kotlin provides numeric types to represent integer values of varying sizes.

#### Byte

The `Byte` type takes up 8 bits and can store values between -128 and 127:

```kotlin
val byteValue: Byte = 100
```

#### Short

The `Short` type takes up 16 bits and can store values between -32,768 and 32,767:

```kotlin
val shortValue: Short = 1000
```

#### Int

The `Int` type is the most commonly used for integers. It takes up 32 bits and can store values from −2^31 to 2^31-1:

```kotlin
val intValue: Int = 123456
```

#### Long

The `Long` type takes up 64 bits and can store values from -2^63 to 2^63-1:

```kotlin
val longValue: Long = 123456789L
```

### Floating point

Floating-point numbers in Kotlin can be represented by the `Float` and `Double` types.

#### Float

The `Float` type takes up 32 bits and is generally used when less precision is needed (with 6 to 7 decimal digits of
precision):

```kotlin
val floatValue: Float = 3.14f
```

#### Double

The `Double` type is more precise, taking up 64 bits (15 to 16 decimal digits of precision):

```kotlin
val doubleValue: Double = 3.14159265359
```

### Char

The `Char` type is used to represent a single character, such as letters or symbols:

```kotlin
val letter: Char = 'A'
```

### Boolean

The `Boolean` type represents truth values, with possible values `true` or `false`:

```kotlin
val isValid: Boolean = true
```

### Strings

The `String` type represents a sequence of characters. Strings are immutable in Kotlin:

```kotlin
val greeting: String = "Hello, Kotlin!"
```

### Arrays

In Kotlin, arrays are represented by the `Array` type. They can store values of primitive types or objects:

```kotlin
val numbers = arrayOf(1, 2, 3)
val strings = arrayOf("Kotlin", "Java", "Python")
```

### Collections

Besides arrays, Kotlin supports [collections](../data-structures/COLLECTIONS.md), such as lists (`List`), sets (`Set`),
and maps (`Map`). These are widely used in situations that call for dynamic data structures.

#### List

An immutable list (cannot be changed):

```kotlin
val languages: List<String> = listOf("Kotlin", "Java", "Python")
```

A mutable list (can be changed):

```kotlin
val mutableLanguages: MutableList<String> = mutableListOf("Kotlin", "Java")
mutableLanguages.add("Python")
```

#### Set

A set (`Set`) does not allow duplicate elements:

```kotlin
val uniqueNumbers: Set<Int> = setOf(1, 2, 3, 3)
```

#### Map

A map (`Map`) stores key-value pairs:

```kotlin
val userRoles: Map<String, String> = mapOf("admin" to "Administrator", "user" to "Regular User")
```

### Any

The `Any` type is the root of the type hierarchy in Kotlin. Every class or type in Kotlin inherits from `Any`:

```kotlin
val something: Any = "This can be anything"
```

### Date

To work with dates and times on the JVM, use the `java.time` API, which is immutable and thread safe. The old
`java.util.Date` and `java.util.Calendar` classes are legacy and should be avoided in new code. In multiplatform
projects, the [kotlinx-datetime](https://github.com/Kotlin/kotlinx-datetime) library plays the same role.

#### LocalDate

```kotlin
import java.time.LocalDate

val today: LocalDate = LocalDate.now()
val nextWeek: LocalDate = today.plusWeeks(1)
println("Today: $today, a week from now: $nextWeek")
```

#### LocalDateTime

```kotlin
import java.time.LocalDateTime

val currentDateTime: LocalDateTime = LocalDateTime.now()
println(currentDateTime)
```

### Other useful types

#### Unit

The `Unit` type in Kotlin is equivalent to `void` in other languages, representing the absence of a return value.

```kotlin
fun printMessage(message: String): Unit {
    println(message)
}
```

#### Nothing

The `Nothing` type indicates that a function never returns (used for functions that throw exceptions or enter infinite
loops):

```kotlin
fun fail(message: String): Nothing {
    throw IllegalStateException(message)
}
```

<br>

Go to [functions](FUNCTIONS.md).

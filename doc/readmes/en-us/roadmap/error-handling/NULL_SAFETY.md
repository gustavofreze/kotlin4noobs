# Null Safety and Safe Operators

Kotlin has a robust null safety system, which helps you avoid common errors such as `NullPointerException` (NPE). Here
is an overview of how Kotlin handles null values and the safe operators you can use.

### Nullable Types

By default, all variables in Kotlin are non-nullable, meaning you cannot assign `null` to them. To declare a variable
that can be `null`, you must explicitly define the variable's type with the `?` suffix:

```kotlin
val nonNullable: String = "Kotlin"  // Non-nullable variable
val nullable: String? = null       // Variable that can be null
```

### Safe Call Operator `?.`

The `?.` operator is used to access properties or methods of an object that may be null, without throwing a null
pointer exception. If the variable is `null`, the call is skipped and the result is `null`:

```kotlin
val length: Int? = nullable?.length  // If 'nullable' is null, the result is null
```

### Elvis Operator `?:`

The Elvis operator `?:` is used to provide a default value in case the expression on the left is `null`. It is very
useful for avoiding `null` returns:

```kotlin
val lengthOrZero: Int = nullable?.length ?: 0  // Returns 0 if 'nullable' is null
```

### The `!!` Operator (force non-null)

The `!!` operator is used when you are sure a variable will not be null, even though its type allows `null`.
It throws a `NullPointerException` if the variable is `null`:

```kotlin
val length: Int = nullable!!.length  // Throws NPE if 'nullable' is null
```

Use the `!!` operator with care, because it overrides Kotlin's null safety checks.

### The `let` Function

The `let` function is often used with the safe call operator `?.` to run a block of code only if the variable is not
`null`:

```kotlin
nullable?.let {
    println("The string length is: ${it.length}")
}
```

In this example, the block inside `let` runs only if `nullable` is not `null`.

### Null Checks with `if`

You can check whether a variable is `null` using an `if` expression, and the Kotlin compiler automatically infers that
the variable is no longer `null` inside the `if` block:

```kotlin
if (nullable != null) {
    println("The variable is not null. Length: ${nullable.length}")
} else {
    println("The variable is null.")
}
```

Here is an example that uses several safe operators to work with variables that may be null:

```kotlin
fun main() {
    val nullableString: String? = "Kotlin"

    // Safe call operator
    println(nullableString?.length)

    // Elvis operator
    val lengthOrZero: Int = nullableString?.length ?: 0
    println(lengthOrZero)

    // !! operator  (force non-null)
    val forcedLength: Int = nullableString!!.length
    println(forcedLength)

    // Using let to avoid null checks
    nullableString?.let {
        println("The string length is: ${it.length}")
    }

    // Null check with if
    if (nullableString != null) {
        println("The string is not null. Length: ${nullableString.length}")
    } else {
        println("The string is null.")
    }
}
```

Complete example:

```kotlin
fun main() {
    val nullableString: String? = "Kotlin"

    println(nullableString?.length)

    val lengthOrZero: Int = nullableString?.length ?: 0
    println(lengthOrZero)

    val forcedLength: Int = nullableString!!.length
    println(forcedLength)

    nullableString?.let {
        println("The string length is: ${it.length}")
    }

    if (nullableString != null) {
        println("The string is not null. Length: ${nullableString.length}")
    } else {
        println("The string is null.")
    }
}
```

<br>

Back to the [start](https://github.com/gustavofreze/kotlin4noobs#topics).

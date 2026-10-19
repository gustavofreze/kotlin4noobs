# Exceptions

Exception classes in Kotlin inherit from the `Throwable` class. Each exception has a message, a stack trace, and an
optional cause.

### Throwing Exceptions

To throw an exception object, use the `throw` keyword:

```kotlin
throw Exception("Exception in Kotlin.")
```

> **Note:** Whenever an exception is thrown, the execution of the function is interrupted until
> the exception is caught or propagates to the caller.

### Handling Exceptions

To catch an exception, use the `try` and `catch` expression:

```kotlin
try {
    // Code that may throw an exception
} catch (exception: Exception) {
    // Exception handling
    println("An error occurred: ${exception.message}")
}
```

> **Note:** There can be more than one `catch` block, which lets you handle different types of exceptions separately.

### Example with Multiple `catch` Blocks

```kotlin
try {
    // Code that may throw multiple types of exceptions
} catch (exception: IOException) {
    // Specific handling for IOException
    println("I/O error:  ${exception.message}")
} catch (exception: Exception) {
    // Generic handling for other exceptions
    println("Unexpected error: ${exception.message}")
} finally {
    // Optional block that always runs, with or without an exception
    println("Operation finished.")
}
```

The `finally` block runs regardless of whether an exception is thrown, and can be used to release resources or perform
cleanup actions.

### Custom Exceptions

Kotlin lets you create your own exception classes, inheriting from `Throwable` or from any of its subclasses, such as
`Exception` or `RuntimeException`:

```kotlin
class CustomException(message: String) : Exception(message)
```

```kotlin
throw CustomException(message = "This is a custom exception.")
```

Custom exceptions are used to represent errors specific to your application's domain.

<br>

Go to [safe operators](NULL_SAFETY.md).

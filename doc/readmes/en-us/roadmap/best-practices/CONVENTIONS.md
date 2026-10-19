# Coding Conventions

In Kotlin, following coding conventions is essential for readability and consistency. They also make team
collaboration and code maintenance easier. Here are some updated and expanded recommendations based on the language's
best practices.

### Variable and Function Names

Prefer camelCase for variable and function names, starting with a lowercase letter.
Use descriptive, clear names. **Avoid acronyms and meaningless abbreviations**.

```kotlin
val userAge = 25
```

```kotlin
fun calculateAverage(scores: List<Double>): Double {
    // ... 
}
```

### Class and Type Names

Classes and types should use UpperCamelCase. **Avoid acronyms and meaningless abbreviations**.

```kotlin
class Person {
    // ...
}
```

```kotlin
typealias NameList = List<String>
```

### Indentation and Spacing

Use 4 spaces to indent your code.
Use a blank line between functions and code blocks.

```kotlin
fun calculateAverage(scores: List<Double>): Double {
    var sum = 0.0
    for (score in scores) {
        sum += score
    }

    return sum / scores.size
}
```

### Constants

Constants should be named in uppercase, with words separated by underscores.

```kotlin
const val MAX_SIZE = 100
```

### Imports

Avoid wildcard imports (`*`). Prefer importing only the classes you will actually use, to
avoid
ambiguity and improve readability.
<br/><br/>
**Example of bad practice (using wildcard imports)**:

  ```kotlin
  import kotlin.math.*
import java.util.*
  ```

- It is not clear which functions or classes are being used from each package.
- It can cause name conflicts or unexpected behavior, especially in large packages.
- Slower compilation, since the compiler has to resolve all the classes and functions in the package, even if you don't
  use them.
  <br/><br/>
  **Example of good practice (importing only what is needed)**:

  ```kotlin
  import kotlin.math.sqrt
  import kotlin.math.pow
  import java.util.Date
  import java.util.Calendar
  ```

- It is explicit what is being used, which makes the code easier to understand.
- It avoids unnecessarily including classes, making the code more efficient and easier to maintain.

### Exception Handling

Use `try-catch-finally` to catch exceptions. Avoid catching generic exceptions such as `Exception` if you can catch
more specific exceptions.

```kotlin
try {
    // Runs the code that may throw exceptions. 
} catch (exception: IOException) {
    // Specific handling for IOException.
} finally {
    // Finally block, always executed, with or without an exception.
}
```

### Parameters and Modifiers

Respect the order: required parameters first, then optional ones.
Use modifiers in a logical order. For example, `public` always comes first.

```kotlin
fun exampleFunction(required: String, optional: Int = 0): Unit {
    // ...
}
```

### Using Lambdas

Prefer passing lambdas outside the parentheses when the last argument of a call is a lambda.

  ```kotlin
  list.filter { it > 10 }
  ```

Use spaces around the braces of a lambda and around the arrow that separates the parameters from the function body.

```kotlin
val sum = { firstNumber: Int, secondNumber: Int -> firstNumber + secondNumber }
```

### Control Flow

Always use braces in control structures, even for single-line blocks, to avoid mistakes.

```kotlin
if (number > 0) {
    println("Positive number")
} else {
    println("Negative number")
}
```

### Function and Property Bodies

Prefer single-expression functions when possible:

```kotlin
fun isEven(number: Int): Boolean = number % 2 == 0
```

For simple properties, use `get` and `set` on a single line:

```kotlin
val isEmpty: Boolean get() = size == 0
```

<br>

Back to the [start](https://github.com/gustavofreze/kotlin4noobs#topics).

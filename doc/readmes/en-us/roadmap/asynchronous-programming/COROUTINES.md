# Coroutines

Kotlin coroutines are a powerful tool for handling concurrency and asynchronous tasks in a simple and efficient way.

Coroutines are built on the concept of suspension, which lets a function be paused and resumed later without blocking
the thread. This is extremely useful for I/O operations, such as network calls, database access or interaction with file
systems.

Coroutines live in the `kotlinx.coroutines` library, which has to be added to the project. On the Kotlin Playground it is
already available.

### Starting a coroutine

A coroutine is always born inside a scope. `runBlocking` creates a scope and blocks the current thread until every
coroutine inside it finishes, which is why it is used in the `main` function and in tests. Inside it, `launch` starts a
new coroutine:

```kotlin
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

fun main() = runBlocking {
    launch {
        delay(1000) // Suspends the coroutine without blocking the thread
        println("Coroutine executed.")
    }

    println("The program keeps running while the coroutine is executing...")
}
```

`runBlocking` only finishes after the coroutine started with `launch` finishes. There is no need to wait with
`Thread.sleep`.

### Structured concurrency

Every coroutine belongs to a scope, and a scope only finishes when all of its coroutines finish. This is called
structured concurrency: no coroutine is left running in the background, and a failure in one of them cancels the others
in the same scope.

The `coroutineScope` function creates a scope inside a suspending function. The two coroutines below run at the same
time, and the function only returns when both finish:

```kotlin
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

suspend fun prepareBreakfast() = coroutineScope {
    launch {
        delay(1000)
        println("Coffee is ready.")
    }
    launch {
        delay(500)
        println("Bread is ready.")
    }
    println("Preparing breakfast...")
}

fun main() = runBlocking {
    prepareBreakfast()
    println("Breakfast is served.")
}
```

A coroutine can also be cancelled through the `Job` that `launch` returns:

```kotlin
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

fun main() = runBlocking {
    val job = launch {
        repeat(10) { step ->
            println("Processing step $step...")
            delay(300)
        }
    }

    delay(1000)
    job.cancel() // Cancels the coroutine at its next suspension
    job.join() // Waits for the cancellation to finish
    println("Processing cancelled.")
}
```

> **Note:** Avoid `GlobalScope`. It creates coroutines that belong to no scope, that are not cancelled together with the
> rest of the program and that may keep running in the background. That is why it is marked as
> `@DelicateCoroutinesApi`.

### Async/await

When the coroutine needs to return a result, use `async`. It returns a `Deferred`, and `await` suspends until the result
is ready. Two calls with `async` run at the same time:

```kotlin
import kotlinx.coroutines.async
import kotlinx.coroutines.delay
import kotlinx.coroutines.runBlocking

suspend fun checkingBalance(): Double {
    delay(1000) // Simulating a network call
    return 1500.0
}

suspend fun savingsBalance(): Double {
    delay(1000)
    return 3500.0
}

fun main() = runBlocking {
    val checking = async { checkingBalance() }
    val savings = async { savingsBalance() }

    val total = checking.await() + savings.await()

    println("The total balance is: $%.2f.".format(total)) // Takes about 1 second, not 2
}
```

> The `suspend` keyword marks functions that can be suspended and resumed without blocking the thread. A `suspend`
> function can only be called from inside a coroutine or from another `suspend` function.

### Dispatchers

The dispatcher decides which threads the coroutine runs on. The most common ones are:

- `Dispatchers.Default`: for CPU-heavy work, such as calculations and processing large lists.
- `Dispatchers.IO`: for operations that wait on I/O, such as files, network and databases.

The `withContext` function runs a block on another dispatcher and returns its result, without creating a loose
coroutine:

```kotlin
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withContext

suspend fun sumOfSquares(limit: Int): Long = withContext(Dispatchers.Default) {
    (1..limit).sumOf { it.toLong() * it }
}

fun main() = runBlocking {
    val result = sumOfSquares(1_000_000)
    println("Sum of squares: $result")
}
```

<br>

Back to the [start](https://github.com/gustavofreze/kotlin4noobs#topics).

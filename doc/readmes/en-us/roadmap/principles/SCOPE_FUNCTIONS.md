# Scope functions

Scope functions run a block of code in the context of an object. Inside the block, the object is reached without
repeating its name, which makes the code shorter and easier to read. There are five of them: `let`, `run`, `with`,
`apply` and `also`.

They differ in two things: how the object is reached inside the block (`it` or `this`) and what the function returns
(the result of the block or the object itself).

| Function | Object in the block | Returns                 | Common use                                   |
|:---------|:--------------------|:------------------------|:---------------------------------------------|
| `let`    | `it`                | the result of the block | Running code only when the value is not null |
| `run`    | `this`              | the result of the block | Configuring an object and computing a result |
| `with`   | `this`              | the result of the block | Grouping several calls on one object         |
| `apply`  | `this`              | the object itself       | Configuring an object                        |
| `also`   | `it`                | the object itself       | Side effects, such as logging                |

### let

`let` is often used with the safe call operator `?.`, to run a block only when the value is not null:

```kotlin
fun main() {
    val name: String? = "Kotlin"

    val length = name?.let {
        println("The name is $it")
        it.length
    }

    println("Length: $length") // Length: 6
}
```

### apply

`apply` returns the object itself, which makes it the natural choice to configure an object right after creating it:

```kotlin
class Account {
    var owner: String = ""
    var balance: Double = 0.0
}

fun main() {
    val account = Account().apply {
        owner = "Gustavo"
        balance = 100.0
    }

    println("${account.owner}: ${account.balance}") // Gustavo: 100.0
}
```

### also

`also` returns the object itself too, but reaches the object as `it`. It is for doing something extra with the value,
such as logging, without changing the flow:

```kotlin
fun main() {
    val numbers = mutableListOf(3, 1, 2)
        .also { println("Original list: $it") }
        .apply { sort() }

    println("Sorted list: $numbers") // Sorted list: [1, 2, 3]
}
```

### run and with

`run` and `with` reach the object as `this` and return the result of the block. The difference is that `run` is called
on the object, while `with` takes the object as an argument:

```kotlin
fun main() {
    val text = "Kotlin4Noobs"

    val summary = text.run { "$this has $length characters" }

    val report = with(StringBuilder()) {
        append("Language: ")
        append("Kotlin")
        toString()
    }

    println(summary) // Kotlin4Noobs has 12 characters
    println(report) // Language: Kotlin
}
```

> Use scope functions when they make the code clearer. Chaining many of them, or nesting one inside another, usually has
> the opposite effect.

<br>

Back to the [start](https://github.com/gustavofreze/kotlin4noobs#topics).

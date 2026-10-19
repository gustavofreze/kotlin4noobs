# Variables

In Kotlin, variables can be declared using two keywords: `val` or `var`. Both are used to store data, but they behave
differently with respect to mutability.

### Val

Use `val` when the variable cannot be changed after it is initialized, that is, when the assigned value will be
immutable:

```kotlin
val name: String = "Kotlin"
```

In this example, the variable `name` was initialized with the value "Kotlin" and cannot be reassigned to another value
later. This guarantees that the value of a variable remains constant.

### Var

Use `var` when the variable can be changed after initialization, that is, when you need to assign new values over time:

```kotlin
var name: String = "Kotlin"
name = "Kotlin 123" // Value reassignment
```

Here, `name` is mutable and its value can be modified as many times as needed.

### Variable scopes

Variables in Kotlin can be declared in different scopes, such as local or global. This means that access to a variable
can depend on where it was defined.

### Local and global scope example

In this example, `name` is a class-level variable (global within the class), while `template` is a local variable,
visible only inside the `register` method:

```kotlin
class Language {
    val name = "Kotlin"  // Global-level variable in the class

    fun register() {
        val template = "Language: <%s>."
        println(template.format(name))  // Using the local and global variable
    }
}
```

The variable `name` can be accessed anywhere in the class, and outside it if the class is instantiated. The variable
`template`, on the other hand, can only be used inside the `register` function:

```kotlin
val language = Language()

println(language.name)  // Accessing the global variable 'name'
language.register()     // Accessing the local variable 'template' inside the function
```

Complete example:

```kotlin
class Language {
    val name = "Kotlin"

    fun register() {
        val template = "Language: <%s>."
        println(template.format(name))
    }
}

fun main() {
    val language = Language()
    
    println(language.name)  // Kotlin
    language.register()     // Language: <Kotlin>.
}
```

> Whenever possible, prefer `val` over `var`, since this promotes immutability in the code, which can prevent bugs and
> make maintenance easier.
> Define variables with the narrowest possible scope. This helps limit access and avoid accidental interference with the
> value.

<br>

Go to [data types](DATA_TYPES.md).

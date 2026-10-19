# Collections

Kotlin offers a rich API for working with collections such as lists, sets, and maps. Collections can be mutable or
immutable, giving you the flexibility to handle data as needed.

### List

A `List` is an ordered collection of elements that may or may not be mutable. Kotlin offers both immutable lists (
`List`) and mutable lists (`MutableList`).

#### Immutable List

An immutable list does not allow modifications after it is created:

```kotlin
val languages: List<String> = listOf("Kotlin", "Java", "Python")
println(languages[0])  // Accesses the first element
println(languages.size) // Size of the list
```

#### Mutable List

A mutable list allows you to add or remove elements:

```kotlin
val mutableLanguages: MutableList<String> = mutableListOf("Kotlin", "Java")
mutableLanguages.add("Python")  // Adds a new element
mutableLanguages.remove("Java") // Removes the "Java" element
println(mutableLanguages)
```

### Set

A `Set` is a collection that does not allow duplicate elements. As with lists, sets can be mutable or immutable.

#### Immutable Set

```kotlin
val uniqueNumbers: Set<Int> = setOf(1, 2, 3, 3)  // "3" is ignored because it is a duplicate
println(uniqueNumbers)
```

#### Mutable Set

```kotlin
val mutableSet: MutableSet<Int> = mutableSetOf(1, 2, 3)
mutableSet.add(4)
mutableSet.remove(2)
println(mutableSet)
```

### Map

A `Map` is a collection of key-value pairs. The keys in a `Map` must be unique.

#### Immutable Map

```kotlin
val userRoles: Map<String, String> = mapOf("admin" to "Administrator", "user" to "Regular User")
println(userRoles["admin"])  // Accesses the value corresponding to the "admin" key
```

#### Mutable Map

```kotlin
val mutableMap: MutableMap<String, String> = mutableMapOf("admin" to "Administrator")
mutableMap["user"] = "Regular User"  // Adds a new key-value pair
mutableMap.remove("admin")           // Removes the pair with the "admin" key
println(mutableMap)
```

### Operations

Kotlin offers several extension functions for performing common operations on collections, such as filtering, mapping,
and reduction.

#### Filtering

The `filter` function lets you create a new collection based on a criterion:

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
val evenNumbers = numbers.filter { it % 2 == 0 }
println(evenNumbers)  // [2, 4]
```

#### Mapping

The `map` function lets you transform the elements of a collection:

```kotlin
val numbers = listOf(1, 2, 3)
val squaredNumbers = numbers.map { it * it }
println(squaredNumbers)  // [1, 4, 9]
```

#### Reduction

The `reduce` function combines all the elements of the collection into a single value:

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
val sum = numbers.reduce { acc, number -> acc + number }
println(sum)  // 15
```

#### The `groupBy` Operation

The `groupBy` function groups the elements of the collection into a map based on a criterion:

```kotlin
val words = listOf("one", "two", "three", "four", "five")
val groupedByLength = words.groupBy { it.length }
println(groupedByLength)  // {3=[one, two], 4=[four, five], 5=[three]}
```

### Other Useful Functions

#### `first` and `last`

These functions return the first and last elements of a collection, respectively:

```kotlin
val numbers = listOf(1, 2, 3)
println(numbers.first())  // 1
println(numbers.last())   // 3
```

#### `find`

The `find` function returns the first element that matches the criterion:

```kotlin
val numbers = listOf(1, 2, 3, 4)
val firstEven = numbers.find { it % 2 == 0 }
println(firstEven)  // 2
```

#### `any` and `all`

- `any` returns `true` if at least one element of the collection matches the criterion.
- `all` returns `true` if all elements of the collection match the criterion.

```kotlin
val numbers = listOf(1, 2, 3, 4)
println(numbers.any { it > 3 })  // true
println(numbers.all { it < 5 })  // true
```

#### `count`

The `count` function returns the number of elements that match the criterion:

```kotlin
val numbers = listOf(1, 2, 3, 4)
println(numbers.count { it % 2 == 0 })  // 2
```

> It is important to remember that Kotlin encourages the use of immutable collections (`List`, `Set`, `Map`) whenever
> possible, because this helps keep your code safe and avoids side effects. Use mutable collections (`MutableList`,
`MutableSet`, `MutableMap`) only when you need to modify the contents of the collection.

<br>

Go to [classes and objects](CLASSES_OBJECTS.md).

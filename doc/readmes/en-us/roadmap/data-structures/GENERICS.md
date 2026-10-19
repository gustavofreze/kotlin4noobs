# Generics

Generics let you write flexible, reusable code that works with different types while maintaining type safety. They are
fundamental for creating collections, classes, and functions that can safely work with any type.

### Generic classes

A generic class is declared with type parameters between `< >`:

```kotlin
class Box<T>(val value: T) {
    fun get(): T = value
}

val intBox = Box(123)        // Box<Int>
val stringBox = Box("Hello") // Box<String>
```

You can have multiple type parameters:

```kotlin
class Pair<A, B>(val first: A, val second: B) {
    fun swap(): Pair<B, A> = Pair(second, first)
}
```

Complete example:

```kotlin
class Container<T>(private var item: T) {
    fun get(): T = item
    
    fun set(newItem: T) {
        item = newItem
    }
    
    fun <R> transform(transformer: (T) -> R): Container<R> {
        return Container(transformer(item))
    }
}

fun main() {
    // String container
    val stringContainer = Container("Hello")
    println(stringContainer.get())  // Hello
    
    stringContainer.set("World")
    println(stringContainer.get())  // World
    
    // Transforming String into Int (length)
    val intContainer = stringContainer.transform { it.length }
    println(intContainer.get())  // 5
    
    // Person container
    data class Person(val name: String, val age: Int)
    val personContainer = Container(Person("Gustavo", 25))
    
    // Transforming Person into String
    val nameContainer = personContainer.transform { it.name }
    println(nameContainer.get())  // Gustavo
}
```

### Generic functions

Functions can have their own type parameters:

```kotlin
fun <T> singletonList(item: T): List<T> {
    return listOf(item)
}

fun <T> T.print(): T {
    println(this)
    return this
}
```

Complete example:

```kotlin
fun <T> swap(list: MutableList<T>, index1: Int, index2: Int) {
    val temp = list[index1]
    list[index1] = list[index2]  
    list[index2] = temp
}

fun <T> List<T>.middle(): T? {
    return if (isEmpty()) null else this[size / 2]
}

fun <T, R> List<T>.mapNotNull(transform: (T) -> R?): List<R> {
    val result = mutableListOf<R>()
    for (item in this) {
        transform(item)?.let { result.add(it) }
    }
    return result
}

fun main() {
    // Generic swap
    val numbers = mutableListOf(1, 2, 3, 4, 5)
    swap(numbers, 1, 3)
    println(numbers)  // [1, 4, 3, 2, 5]
    
    val names = mutableListOf("Ana", "Bruno", "Carlos")
    swap(names, 0, 2)
    println(names)  // [Carlos, Bruno, Ana]
    
    // Generic extension function
    println(numbers.middle())  // 3
    println(names.middle())    // Bruno
    
    // Transformation with null safety
    data class Person(val name: String, val age: Int)
    val people = listOf(
        Person("João", 25),
        Person("Maria", 17),
        Person("Pedro", 30)
    )
    
    val adults = people.mapNotNull { person ->
        if (person.age >= 18) person.name else null
    }
    println(adults)  // [João, Pedro]
}
```

### Constraints

You can restrict the types that can be used as generic arguments:

```kotlin
// T must be a subtype of Number
fun <T : Number> List<T>.sum(): Double {
    var sum = 0.0
    for (element in this) {
        sum += element.toDouble()
    }
    return sum
}

// T must implement Comparable
fun <T : Comparable<T>> max(first: T, second: T): T {
    return if (first > second) first else second
}
```

Multiple constraints with `where`:

```kotlin
fun <T> process(item: T) 
    where T : CharSequence,
          T : Comparable<T> {
    // T must be CharSequence AND Comparable
}
```

Complete example:

```kotlin
// Interface for the example
interface Identifiable {
    val id: Int
}

// Example classes
data class Person(
    override val id: Int,
    val name: String,
    val age: Int
) : Identifiable, Comparable<Person> {
    override fun compareTo(other: Person): Int = age.compareTo(other.age)
}

data class Product(
    override val id: Int,
    val name: String,
    val price: Double
) : Identifiable

// Function with a simple constraint
fun <T : Identifiable> findById(list: List<T>, id: Int): T? {
    return list.find { it.id == id }
}

// Function with multiple constraints
fun <T> getOldest(list: List<T>): T? 
    where T : Identifiable,
          T : Comparable<T> {
    return list.maxOrNull()
}

// Generic class with a constraint
class Cache<T : Identifiable>(private val maxSize: Int) {
    private val items = mutableListOf<T>()
    
    fun add(item: T) {
        if (items.size >= maxSize) {
            items.removeAt(0)
        }
        items.add(item)
    }
    
    fun get(id: Int): T? = items.find { it.id == id }
    
    fun getAll(): List<T> = items.toList()
}

fun main() {
    val people = listOf(
        Person(1, "João", 25),
        Person(2, "Maria", 30),
        Person(3, "Pedro", 22)
    )
    
    val products = listOf(
        Product(1, "Notebook", 3000.0),
        Product(2, "Mouse", 50.0)
    )
    
    // Using a function with a constraint
    println(findById(people, 2))     // Person(id=2, name=Maria, age=30)
    println(findById(products, 1))   // Product(id=1, name=Notebook, price=3000.0)
    
    // Using a function with multiple constraints
    println(getOldest(people))       // Person(id=2, name=Maria, age=30)
    // getOldest(products)           // Error: Product does not implement Comparable
    
    // Using a generic class with a constraint
    val cache = Cache<Person>(2)
    cache.add(Person(1, "Ana", 20))
    cache.add(Person(2, "Bruno", 25))
    cache.add(Person(3, "Carlos", 30))  // Removes Ana (FIFO)
    
    println(cache.getAll())  // [Bruno, Carlos]
}
```

### Variance

Kotlin uses `in` and `out` to declare variance:

- `out` (covariance): can produce T, but not consume it
- `in` (contravariance): can consume T, but not produce it

```kotlin
// Producer - can only return T (covariant)
interface Producer<out T> {
    fun produce(): T
}

// Consumer - can only receive T (contravariant)  
interface Consumer<in T> {
    fun consume(item: T)
}

// Invariant - can both produce and consume
interface Storage<T> {
    fun store(item: T)
    fun retrieve(): T
}
```

Complete example:

```kotlin
open class Person(val name: String)
open class Employee(name: String, val id: Int) : Person(name)  // Added 'open' keyword
class Manager(name: String, id: Int, val team: String) : Employee(name, id)

// Covariance (out) - Producer
class PersonProducer<out T : Person>(private val person: T) {
    fun get(): T = person
    // fun set(person: T) {}  // Error! Cannot consume T
}

// Contravariance (in) - Consumer
class PersonConsumer<in T : Person> {
    fun process(person: T) {
        println("Processing: ${person.name}")
    }
    // fun get(): T = ...  // Error! Cannot produce T
}

// Invariance - can consume and produce
class PersonStorage<T : Person> {
    private var stored: T? = null
    
    fun store(person: T) {
        stored = person
    }
    
    fun retrieve(): T? = stored
}

fun main() {
    // Covariance (out) allows using subtypes
    val employeeProducer: PersonProducer<Employee> = PersonProducer(Employee("João", 123))
    val personProducer: PersonProducer<Person> = employeeProducer  // OK!  Employee is a subtype of Person
    println(personProducer.get().name)
    
    // Contravariance (in) allows using supertypes
    val personConsumer: PersonConsumer<Person> = PersonConsumer()
    val employeeConsumer: PersonConsumer<Employee> = personConsumer  // OK! Person is a supertype of Employee
    employeeConsumer.process(Employee("Maria", 456))
    
    // Invariance does not allow any conversion
    val employeeStorage: PersonStorage<Employee> = PersonStorage()
    // val personStorage: PersonStorage<Person> = employeeStorage  // Error!
    
    // Practical example with lists
    val employees: List<Employee> = listOf(
        Employee("Ana", 111),
        Manager("Carlos", 222, "Dev Team")
    )
    
    // List is covariant (out), so we can do this:
    val people: List<Person> = employees
    people.forEach { println("Person: ${it.name}") }
    
    // MutableList is invariant, so this does not compile: 
    // val mutablePeople: MutableList<Person> = mutableListOf(Employee("Test", 999))  // Error!
}
```

### Reified type parameters

With `inline` and `reified`, you can access the type at runtime:

```kotlin
inline fun <reified T> isInstance(value: Any): Boolean {
    return value is T
}

inline fun <reified T> filterByType(list: List<Any>): List<T> {
    return list.filterIsInstance<T>()
}
```

Complete example:

```kotlin
open class Person(val name: String)
class Employee(name: String, val id: Int) : Person(name)
class Customer(name: String, val points: Int) : Person(name)

// Inline function with reified
inline fun <reified T> createInstance(): String {
    return when (T:: class) {
        String::class -> "Creating String" as T
        Int::class -> 42 as T
        Person::class -> Person("Default") as T
        else -> throw IllegalArgumentException("Unsupported type:  ${T::class}")
    } as String
}

inline fun <reified T : Person> findPeople(people: List<Person>): List<T> {
    return people.filterIsInstance<T>()
}

inline fun <reified T> List<*>.countType(): Int {
    return count { it is T }
}

inline fun <reified T> safeCast(value: Any): T? {
    return value as? T
}

// Function that creates a map grouping by type
inline fun <reified T> List<Any>.groupByType(): Map<String, List<T>> {
    val items = filterIsInstance<T>()
    return mapOf(T::class.simpleName.orEmpty() to items)
}

fun main() {
    val mixedList: List<Person> = listOf(
        Person("João"),
        Employee("Maria", 123),
        Customer("Pedro", 500),
        Employee("Ana", 456),
        Customer("Carlos", 1000)
    )
    
    // Filtering by a specific type
    val employees = findPeople<Employee>(mixedList)
    println("Employees:  ${employees.map { it.name }}")
    
    val customers = findPeople<Customer>(mixedList)
    println("Customers: ${customers.map { it.name }}")
    
    // Counting types
    val anyList: List<Any> = listOf("text", 123, true, "more text", 456, Person("Test"))
    println("\nCount by type:")
    println("Strings: ${anyList.countType<String>()}")
    println("Integers: ${anyList.countType<Int>()}")
    println("Booleans: ${anyList.countType<Boolean>()}")
    println("People: ${anyList.countType<Person>()}")
    
    // Safe cast with reified
    val value: Any = "Kotlin"
    val asString = safeCast<String>(value)
    val asInt = safeCast<Int>(value)
    
    println("\nSafe casting:")
    println("As String: $asString")
    println("As Int: $asInt")
    
    // Grouping by type
    val grouped = anyList.groupByType<String>()
    println("\nGrouped strings: $grouped")
}
```

### Generics with data classes

Generics are very useful with data classes for creating reusable structures:

```kotlin
data class Result<T>(
    val data: T? = null,
    val error: String? = null
) {
    val isSuccess: Boolean get() = data != null
    val isError: Boolean get() = error != null
}

data class PagedList<T>(
    val items: List<T>,
    val page: Int,
    val totalPages: Int
)
```

Complete example:

```kotlin
// Generic Result for operations that can fail
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val exception: Exception) : Result<Nothing>()
    
    inline fun <R> map(transform: (T) -> R): Result<R> {
        return when (this) {
            is Success -> Success(transform(data))
            is Error -> this
        }
    }
    
    fun getOrNull(): T? {
        return when (this) {
            is Success -> data
            is Error -> null
        }
    }
    
    // Use @UnsafeVariance annotation to allow T in input position
    fun getOrDefault(default: @UnsafeVariance T): T {
        return when (this) {
            is Success -> data
            is Error -> default
        }
    }
}

// Generic data class for paginated responses
data class PagedResponse<T>(
    val items: List<T>,
    val currentPage: Int,
    val totalPages: Int,
    val totalItems: Int
) {
    val hasNext: Boolean get() = currentPage < totalPages
    val hasPrevious: Boolean get() = currentPage > 1
}

// Data class for a generic key-value pair
data class KeyValue<K, V>(val key: K, val value: V)

// Service that uses generics
class PersonService {
    private val people = listOf(
        Person("João", 25),
        Person("Maria", 30),
        Person("Pedro", 22),
        Person("Ana", 28),
        Person("Carlos", 35)
    )
    
    fun findById(id: Int): Result<Person> {
        return if (id in people.indices) {
            Result.Success(people[id])
        } else {
            Result.Error(NoSuchElementException("Person not found"))
        }
    }
    
    fun getPaged(page: Int, pageSize: Int): PagedResponse<Person> {
        val start = (page - 1) * pageSize
        val end = minOf(start + pageSize, people.size)
        
        return PagedResponse(
            items = if (start < people.size) people.subList(start, end) else emptyList(),
            currentPage = page,
            totalPages = (people.size + pageSize - 1) / pageSize,
            totalItems = people.size
        )
    }
    
    fun getStatistics(): List<KeyValue<String, Any>> {
        return listOf(
            KeyValue("total", people.size),
            KeyValue("averageAge", people.map { it.age }. average()),
            KeyValue("youngest", people.minBy { it.age }),
            KeyValue("oldest", people.maxBy { it.age })
        )
    }
}

data class Person(val name: String, val age: Int)

fun main() {
    val service = PersonService()
    
    // Using Result<T>
    val result1 = service.findById(1)
    when (result1) {
        is Result.Success -> println("Found: ${result1.data}")
        is Result.Error -> println("Error: ${result1.exception.message}")
    }
    
    // Mapping Result
    val nameResult = service.findById(0).map { it.name.uppercase() }
    println("Name in uppercase: ${nameResult.getOrDefault("UNKNOWN")}")
    
    // Using PagedResponse<T>
    val page1 = service.getPaged(1, 2)
    println("\nPage ${page1.currentPage} of ${page1.totalPages}:")
    page1.items.forEach { println("  - $it") }
    println("Has next?  ${page1.hasNext}")
    
    // Using KeyValue<K, V>
    println("\nStatistics:")
    service.getStatistics().forEach { stat ->
        println("  ${stat.key}: ${stat.value}")
    }
}
```

<br>

Back to the [start](https://github.com/gustavofreze/kotlin4noobs#topics).

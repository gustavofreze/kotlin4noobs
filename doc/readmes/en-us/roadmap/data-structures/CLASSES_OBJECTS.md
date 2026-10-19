# Classes and objects

### Class

Classes in Kotlin are declared using the `class` keyword:

```kotlin
class Person {
    //... 
}
```

A class declaration consists of the class name, the class header (specifying its type parameters, the
primary constructor, and a few other things), and the class body surrounded by curly braces. Both the header and the body are
optional. If the class has no body, the curly braces can be omitted:

```kotlin
class Person
```

Properties in Kotlin classes can be declared as mutable, using the `var` keyword,
or as read-only, using the `val` keyword:

```kotlin
class Person(val age: Int, val name: String)
```

To declare an instance of this class, just do:

```kotlin
val person = Person(25, "Gustavo")
```

or by using named arguments:

```kotlin
val person = Person(age = 25, name = "Gustavo")
```

By default, every class we create is not open to be inherited by another,
so we need to use the `open` keyword to allow inheritance:

```kotlin
open class Person(val age: Int, val name: String)

class Driver(age: Int, name: String, val license: String) : Person(age, name)
```

Complete example:

```kotlin
open class Person(val age: Int, val name: String)

class Driver(age: Int, name: String, val license: String) : Person(age, name)

fun main() {
    val driver = Driver(age = 25, name = "Gustavo", license = "14-42-23")
    
    println(driver.age)     // 25
    println(driver.name)    // Gustavo
    println(driver.license) // 14-42-23
}
```

### Data class

It is not uncommon to create classes whose main purpose is to hold data, such as
[DTOs](https://pt.wikipedia.org/wiki/Objeto_de_Transfer%C3%AAncia_de_Dados).
In Kotlin, these are called data classes and are declared using the `data` keyword:

```kotlin
data class Person(val age: Int, val name: String)
```

The compiler automatically derives the following members from all properties declared in the primary constructor:
`equals`, `hashCode`, `toString`, and `copy`.

To ensure consistency and meaningful behavior of the generated code, data classes must meet the
following requirements:

- The primary constructor must have at least one parameter.
- All primary constructor parameters must be marked as `val` or `var`.
- Data classes cannot be abstract, open, sealed, or inner.

To declare an instance of this class, just do:

```kotlin
val person = Person(age = 25, name = "Gustavo")
```

or by using named arguments:

```kotlin
val person = Person(age = 25, name = "Gustavo")
```

Complete example:

```kotlin
data class Person(val age: Int, val name: String)

fun main() {
    val person = Person(age = 25, name = "Gustavo")
    val copy = person.copy(name = "João")
    
    println(person)  // Person(age=25, name=Gustavo)
    println(copy)    // Person(age=25, name=João)
}
```

### Enum class

Enum classes in Kotlin are declared using the `enum` keyword:

```kotlin
enum class Type {
    CUSTOMER,
    EMPLOYEE
}
```

Each enum constant is an object. Enum constants are separated by commas. Since each enum is an instance
of the enum class, it can be initialized as:

```kotlin
enum class Type(val value: Int) {
    CUSTOMER(value = 1),
    EMPLOYEE(value = 2)
}
```

Complete example:

```kotlin
enum class Type(val value: Int) {
    CUSTOMER(value = 1),
    EMPLOYEE(value = 2)
}

fun main() {
    val type = Type.CUSTOMER
    
    println(type)       // CUSTOMER
    println(type.value) // 1
}
```

Enum constants can declare their own anonymous classes with their corresponding methods, as well as
override the base methods:

```kotlin
enum class Type {
    CUSTOMER {
        override fun register() = CUSTOMER
    },

    EMPLOYEE {
        override fun register() = EMPLOYEE
    };

    abstract fun register(): Type
}
```

Complete example:

```kotlin
enum class Type {
    CUSTOMER {
        override fun register() = CUSTOMER
    },

    EMPLOYEE {
        override fun register() = EMPLOYEE
    };

    abstract fun register(): Type
}

fun main() {
    val type = Type.CUSTOMER
    val registered = type.register()
    
    println(registered)  // CUSTOMER
}
```

**Note**
> An enum class can implement an interface, but it cannot derive from a class, providing either a common implementation
> of interface members for all entries or separate implementations for each entry within its
> anonymous class. This is done by adding the interfaces you want to implement to the enum class declaration.

### Abstract class

Classes in Kotlin can be abstract. Declare them using the `abstract` keyword:

```kotlin
abstract class Customer {

    abstract fun register()
}
```

And in the class you want to extend the abstract class, just do:

```kotlin
class Person(val age: Int, val name: String) : Customer() {

    override fun register() {
        val template = "Registered %s, %s years old."
        println(template.format(name, age))
    }
}
```

Complete example:

```kotlin
abstract class Customer {
    abstract fun register()
}

class Person(val age: Int, val name: String) : Customer() {
    override fun register() {
        val template = "Registered %s, %s years old."
        println(template.format(name, age))
    }
}

fun main() {
    val person = Person(25, "Gustavo")
    person.register()  // Registered Gustavo, 25 years old.
}
```

### Objects

In Kotlin we can declare objects that implement the
[singleton](https://pt.wikipedia.org/wiki/Singleton) pattern. Use the `object` keyword:

```kotlin
object PersonValidator {

    fun isValidAge(age: Int): Boolean {
        return age in 0..150
    }
    
    fun isValidName(name: String): Boolean {
        return name.isNotBlank() && name.length >= 2
    }
}
```

To refer to the object, use its name directly:

```kotlin
PersonValidator.isValidAge(age = 25)
```

Complete example:

```kotlin
object PersonValidator {
    fun isValidAge(age: Int): Boolean {
        return age in 0..150
    }
    
    fun isValidName(name: String): Boolean {
        return name.isNotBlank() && name.length >= 2
    }
}

fun main() {
    println(PersonValidator.isValidAge(age = 25))          // true
    println(PersonValidator.isValidAge(age = 200))         // false
    println(PersonValidator.isValidName(name = "Gustavo")) // true
    println(PersonValidator.isValidName(name = "A"))       // false
}
```

Kotlin also lets us create what is called a companion object, an object that lives inside a class. To do this,
we need to use the `companion object` keywords:

```kotlin
class Person(val age: Int, val name: String) {

    companion object {
        fun newborn(name: String) = Person(age = 0, name = name)
    }
}
```

The companion object lets us use the `newborn` method through the `Person` class without needing to
create an instance of it:

```kotlin
val person = Person.newborn(name = "Gustavo")
```

Complete example:

```kotlin
class Person(val age: Int, val name: String) {
    companion object {
        fun newborn(name: String) = Person(age = 0, name = name)
    }
}

fun main() {
    val person = Person.newborn(name = "Gustavo")
    
    println(person.name)  // Gustavo
    println(person.age)   // 0
}
```

### Interfaces

Interfaces in Kotlin can contain declarations of abstract methods as well as method implementations. What makes them
different from abstract classes is that interfaces cannot store state. They can have properties, but these
must be abstract or provide accessor implementations.

An interface is defined using the `interface` keyword:

```kotlin
interface Customer {
    fun register()
}
```

An interface can derive from other interfaces, which means it can provide implementations for their members
and declare new functions and properties:

```kotlin
interface PremiumCustomer : Customer
```

You can declare properties in interfaces. A property declared in an interface can be abstract or provide
implementations for accessors:

```kotlin
interface PremiumCustomer : Customer {
    val minimumLimit: Double
}
```

Complete example:

```kotlin
interface Customer {
    fun register()
}

interface PremiumCustomer : Customer {
    val minimumLimit: Double
}

class VIPCustomer : PremiumCustomer {
    override val minimumLimit = 10000.0
    
    override fun register() {
        val template = "VIP registered with limit: $%.2f"
        println(template.format(minimumLimit))
    }
}

fun main() {
    val vip = VIPCustomer()
    vip.register()  // VIP registered with limit: $10000.00
}
```

The [Delegation](https://en.wikipedia.org/wiki/Delegation_pattern) pattern has proven to be a good alternative to implementation
inheritance, and Kotlin supports it natively. A `Person` class can implement a `Customer` interface
by delegating all of its public members to a
specified object:

```kotlin
interface Customer {
    fun register()
}

class CustomerAdapter(private val name: String) : Customer {

    override fun register() {
        val template = "Registered %s."
        println(template.format(name))
    }
}

class Person(customer: Customer) : Customer by customer
```

Complete example:

```kotlin
interface Customer {
    fun register()
}

class CustomerAdapter(private val name: String) : Customer {
    override fun register() {
        val template = "Registered %s."
        println(template.format(name))
    }
}

class Person(customer: Customer) : Customer by customer

fun main() {
    val adapter = CustomerAdapter("Gustavo")
    val person = Person(adapter)
    
    person.register()  // Registered Gustavo.
}
```

### Sealed class

Sealed classes are useful when you have a restricted class hierarchy where all possible subclasses are
known at compile time. They are declared using the `sealed` keyword:

```kotlin
sealed class PersonEvent {
    data class Created(val person: Person) : PersonEvent()
    data class Updated(val person: Person) : PersonEvent()
    data class Deleted(val id: Int) : PersonEvent()
}
```

The main advantage of sealed classes is that when they are used in a `when` expression, the compiler can verify that
all cases have been covered, eliminating the need for an `else` clause:

```kotlin
fun handleEvent(event: PersonEvent) {
    when (event) {
        is PersonEvent.Created -> println("Person created: ${event.person.name}")
        is PersonEvent.Updated -> println("Person updated: ${event.person.name}")
        is PersonEvent.Deleted -> println("Person removed: ID ${event.id}")
        // No need for else
    }
}
```

Complete example:

```kotlin
data class Person(val id: Int, val name: String)

sealed class PersonEvent {
    data class Created(val person: Person) : PersonEvent()
    data class Updated(val person: Person) : PersonEvent()
    data class Deleted(val id: Int) : PersonEvent()
}

fun handleEvent(event: PersonEvent) {
    when (event) {
        is PersonEvent.Created -> println("Person created: ${event.person.name}")
        is PersonEvent.Updated -> println("Person updated: ${event.person.name}")
        is PersonEvent.Deleted -> println("Person removed: ID ${event.id}")
    }
}

fun main() {
    val person = Person(1, "Gustavo")
    
    handleEvent(PersonEvent.Created(person))
    handleEvent(PersonEvent.Updated(person.copy(name = "Gustavo Freze")))
    handleEvent(PersonEvent.Deleted(1))
}
```

Sealed classes are abstract by nature and cannot be instantiated directly. All subclasses of a
sealed class must be declared in the same file or as nested classes:

```kotlin
sealed class PersonState {
    object Loading : PersonState()
    data class Loaded(val person: Person) : PersonState()
    data class Error(val message: String) : PersonState()
}
```

### Inline class (Value class)

Inline classes are a way to create type wrappers without runtime overhead. They are useful when you want to
add type safety without compromising performance. They are declared using `@JvmInline` and `value class`:

```kotlin
@JvmInline
value class PersonId(val value: Int)

@JvmInline
value class PersonName(val value: String) {
    init {
        require(value.isNotBlank()) { "Name cannot be empty" }
    }
}
```

The main difference between inline classes and regular classes is that at runtime, when possible, the compiler uses the
primitive type directly, avoiding the creation of wrapper objects:

```kotlin
@JvmInline
value class Age(val value: Int)

fun checkAdult(age: Age): Boolean {
    return age.value >= 18
}

val age = Age(25)
```

Complete example:

```kotlin
@JvmInline
value class PersonId(val value: Int)

@JvmInline
value class PersonName(val value: String) {
    init {
        require(value.isNotBlank()) { "Name cannot be empty" }
    }
}

@JvmInline
value class Age(val value: Int)

fun checkAdult(age: Age): Boolean {
    return age.value >= 18
}

fun main() {
    val id = PersonId(123)
    val name = PersonName("Gustavo")
    val age = Age(25)
    
    println(id.value)        // 123
    println(name.value)      // Gustavo
    println(checkAdult(age)) // true
}
```

### Nested and Inner classes

Kotlin lets you create classes inside other classes. Nested classes do not have access to the members of the outer
class, while inner classes do:

```kotlin
class Company {
    private val employees = mutableListOf<Person>()
    
    // Nested class - does not have access to 'employees'
    class Department {
        fun getCode() = "DEPT-001"
    }
    
    // Inner class - has access to 'employees'
    inner class Team {
        fun getTeamSize() = employees.size
    }
}
```

Complete example:

```kotlin
data class Person(val name: String)

class Company {
    private val employees = mutableListOf<Person>()
    
    fun addEmployee(person: Person) {
        employees.add(person)
    }
    
    class Department {
        fun getCode() = "DEPT-001"
    }
    
    inner class Team {
        fun getTeamSize() = employees.size
    }
}

fun main() {
    val company = Company()
    company.addEmployee(Person("Gustavo"))
    company.addEmployee(Person("Anne"))
    
    val department = Company.Department()
    val team = company.Team()
    
    println(department.getCode()) // DEPT-001
    println(team.getTeamSize())  // 2
}
```

<br>

Go to [generics](GENERICS.md).

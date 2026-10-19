# Operators

Kotlin offers a rich variety of operators that make code more expressive and concise. Besides the basic arithmetic
operators, the language provides special operators for null safety, type checking, ranges, and much more.

### Arithmetic operators

The basic arithmetic operators work as expected:

```kotlin
val a = 10
val b = 3

println(a + b)  // 13 - Addition
println(a - b)  // 7  - Subtraction
println(a * b)  // 30 - Multiplication
println(a / b)  // 3  - Division
println(a % b)  // 1  - Modulo (remainder)
```

Complete example:

```kotlin
fun main() {
    val a = 10
    val b = 3
    
    println("$a + $b = ${a + b}")  // 10 + 3 = 13
    println("$a - $b = ${a - b}")  // 10 - 3 = 7
    println("$a * $b = ${a * b}")  // 10 * 3 = 30
    println("$a / $b = ${a / b}")  // 10 / 3 = 3
    println("$a % $b = ${a % b}")  // 10 % 3 = 1
}
```

### Compound assignment operators

Kotlin supports compound assignment operators for more concise operations:

```kotlin
var x = 10

x += 5   // x = x + 5
x -= 3   // x = x - 3
x *= 2   // x = x * 2
x /= 4   // x = x / 4
x %= 3   // x = x % 3
```

Complete example:

```kotlin
fun main() {
    var x = 10
    println("Initial value: $x")  // 10
    
    x += 5
    println("After += 5: $x")     // 15
    
    x -= 3
    println("After -= 3: $x")     // 12
    
    x *= 2
    println("After *= 2: $x")     // 24
    
    x /= 4
    println("After /= 4: $x")     // 6
    
    x %= 4
    println("After %= 4: $x")     // 2
}
```

### Comparison operators

The comparison operators return Boolean values:

```kotlin
val a = 5
val b = 10

println(a == b)  // false - Equality
println(a != b)  // true  - Inequality
println(a < b)   // true  - Less than
println(a > b)   // false - Greater than
println(a <= b)  // true  - Less than or equal
println(a >= b)  // false - Greater than or equal
```

For referential comparison (checking whether they are the same object), use `===`:

```kotlin
val person1 = Person("Gustavo", 25)
val person2 = Person("Gustavo", 25)
val person3 = person1

println(person1 == person2)   // true (same content if it is a data class)
println(person1 === person2)  // false (different objects)
println(person1 === person3)  // true (same object)
```

Complete example:

```kotlin
data class Person(val name: String, val age: Int)

fun main() {
    val person1 = Person("Gustavo", 25)
    val person2 = Person("Gustavo", 25)
    val person3 = person1
    
    // Structural comparison (content)
    println(person1 == person2)   // true
    println(person1 != person2)   // false
    
    // Referential comparison (same instance)
    println(person1 === person2)  // false
    println(person1 === person3)  // true
    println(person1 !== person2)  // true
}
```

### Logical operators

Operators for combining Boolean expressions:

```kotlin
val isAdult = true
val hasLicense = false

println(isAdult && hasLicense)  // false - AND
println(isAdult || hasLicense)  // true  - OR
println(!hasLicense)            // true  - NOT
```

Complete example:

```kotlin
data class Person(val name: String, val age: Int, val hasDriverLicense: Boolean)

fun main() {
    val person = Person("Gustavo", 25, true)
    
    val isAdult = person.age >= 18
    val hasLicense = person.hasDriverLicense
    
    val canDrive = isAdult && hasLicense
    val needsAttention = !isAdult || !hasLicense
    
    println("Is adult: $isAdult")                    // true
    println("Has license: $hasLicense")              // true
    println("Can drive: $canDrive")                  // true
    println("Needs attention: $needsAttention")      // false
}
```

### The `in` and `!in` operators

The `in` operator checks whether a value is contained in a collection or range:

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
println(3 in numbers)     // true
println(10 !in numbers)   // true

val range = 1..10
println(5 in range)      // true
println(15 in range)     // false
```

It also works with strings:

```kotlin
val text = "Kotlin Programming"
println("Kotlin" in text)    // true
println("Java" !in text)     // true
```

Complete example:

```kotlin
data class Person(val name: String, val age: Int)

fun main() {
    val team = listOf(
        Person("Gustavo", 25),
        Person("Maria", 30),
        Person("Pedro", 22)
    )
    
    val ages = team.map { it.age }
    
    // Checking in collections
    println(25 in ages)          // true
    println(40 !in ages)         // true 
    
    // Checking in ranges
    val ageRange = 18..65
    val allWorkingAge = team.all { it.age in ageRange }
    println("Everyone of working age: $allWorkingAge")  // true
    
    // Checking in strings
    val searchName = "Gustavo Freze"
    println("Gustavo" in searchName)  // true
    println("Pedro" !in searchName)   // true 
}
```

### The `is` and `!is` operators (Type Checking)

The `is` and `!is` operators check an object's type at runtime:

```kotlin
val value: Any = "Kotlin"

if (value is String) {
    // Smart cast: value is automatically converted to String here
    println(value.length)
}

if (value !is Int) {
    println("Not an integer")
}
```

With smart cast, there is no need for an explicit cast after checking the type:

```kotlin
fun processValue(value: Any) {
    when (value) {
        is String -> println("String of length ${value.length}")
        is Int -> println("Number: ${value * 2}")
        is List<*> -> println("List with ${value.size} elements")
        else -> println("Unknown type")
    }
}
```

Complete example:

```kotlin
open class Person(val name: String)
class Employee(name: String, val id: Int) : Person(name)
class Customer(name: String, val loyaltyPoints: Int) : Person(name)

fun processPerson(person: Person) {
    when (person) {
        is Employee -> {
            // Smart cast to Employee
            println("Employee: ${person.name}, ID: ${person.id}")
        }
        is Customer -> {
            // Smart cast to Customer
            println("Customer: ${person.name}, Points: ${person.loyaltyPoints}")
        }
        else -> {
            println("Person: ${person.name}")
        }
    }
}

fun main() {
    val people = listOf(
        Person("Gustavo"),
        Employee("Maria", 123),
        Customer("Pedro", 500)
    )
    
    for (person in people) {
        processPerson(person)
        
        // Type check
        if (person is Employee) {
            println("  -> Is an employee")
        }
        if (person !is Customer) {  // CORRECTED: !is without space
            println("  -> Is not a customer")
        }
    }
}
```

### The `as` and `as?` operators (Type Casting)

The `as` operator performs an explicit cast, while `as?` performs a safe cast (returns null if the cast fails):

```kotlin
val value: Any = "Kotlin"

// Unsafe cast - throws an exception if it fails
val text = value as String

// Safe cast - returns null if it fails
val number = value as? Int  // null
val string = value as? String  // "Kotlin"
```

Complete example:

```kotlin
open class Person(val name: String)
class Employee(name: String, val id: Int) : Person(name)

fun main() {
    val person: Person = Employee("Gustavo", 123)
    val anyValue: Any = person
    
    // Safe cast
    val employee = person as? Employee
    if (employee != null) {
        println("Employee ID: ${employee.id}")
    }
    
    // Unsafe cast (works because person really is an Employee)
    val emp = person as Employee
    println("ID: ${emp.id}")
    
    // Safe cast that returns null
    val customer = person as? Customer
    println("Is customer? ${customer != null}")  // false
    
    // Using it with the Elvis operator
    val id = (anyValue as? Employee)?.id ?: -1
    println("Employee ID: $id")
}

// Helper class for the example
class Customer(name: String) : Person(name)
```

### The range operator (`..`)

The `..` operator creates ranges, which are very useful in loops and checks:

```kotlin
val range = 1..10           // Closed range: 1 to 10 (inclusive)
val exclusive = 1 until 10  // Half-open range: 1 to 9
val downTo = 10 downTo 1    // Descending range: 10 down to 1
val stepped = 1..10 step 2  // Range with a step: 1, 3, 5, 7, 9
```

Ranges also work with characters:

```kotlin
val letters = 'a'..'z'
println('k' in letters)  // true
```

Complete example:

```kotlin
data class Person(val name: String, val age: Int)

fun main() {
    val people = listOf(
        Person("Ana", 17),
        Person("Bruno", 25),
        Person("Carlos", 30),
        Person("Diana", 45),
        Person("Eduardo", 70)
    )
    
    // Defining age ranges
    val children = 0..17
    val youngAdults = 18..30
    val adults = 31..60
    val seniors = 61..120
    
    // Categorizing people
    people.forEach { person ->
        val category = when (person.age) {
            in children -> "Child/Teenager"
            in youngAdults -> "Young Adult"
            in adults -> "Adult"
            in seniors -> "Senior"
            else -> "Invalid age"
        }
        println("${person.name} (${person.age} years old): $category")
    }
    
    // Using ranges in loops
    println("\nCounting by 5s:")
    for (i in 0..20 step 5) {
        print("$i ")
    }
    
    println("\n\nCountdown:")
    for (i in 5 downTo 1) {
        print("$i ")
    }
    println("🚀")
}
```

### The Elvis operator (`?:`)

The Elvis operator provides a default value when the expression on the left is null:

```kotlin
val name: String? = null
val displayName = name ?: "Anonymous"  // "Anonymous"
```

Very useful with functions that return null:

```kotlin
fun findPerson(id: Int): Person? = // ... look up the person

val person = findPerson(123) ?: Person("Default", 0)
```

Complete example:

```kotlin
data class Person(val name: String, val age: Int, val email: String? = null)

class PersonService {
    private val people = mutableListOf(
        Person("Gustavo", 25, "gustavo@email.com"),
        Person("Maria", 30),
        Person("Pedro", 22, "pedro@email.com")
    )
    
    fun findByName(name: String): Person? {
        return people.find { it.name == name }
    }
    
    fun getEmail(name: String): String {
        val person = findByName(name)
        return person?.email ?:  "noemail@default.com"
    }
}

fun main() {
    val service = PersonService()
    
    // Using Elvis with functions that return null
    val person1 = service.findByName("Gustavo") ?: Person("Not found", 0)
    println(person1)
    
    val person2 = service.findByName("Carlos") ?: Person("Not found", 0)
    println(person2)
    
    // Using Elvis for default values
    println("Gustavo's email: ${service.getEmail("Gustavo")}")
    println("Maria's email: ${service.getEmail("Maria")}")
    println("Carlos's email: ${service.getEmail("Carlos")}")
    
    // Chaining Elvis operators
    val config: String? = null
    val backup: String? = null
    val finalValue = config ?: backup ?:  "default value"
    println("Final configuration: $finalValue")
}
```

### The spread operator (`*`)

The spread operator (`*`) expands an array into individual arguments:

```kotlin
fun sum(vararg numbers: Int): Int {
    return numbers.sum()
}

val array = intArrayOf(1, 2, 3)
val result = sum(*array)  // Expands the array
```

Complete example:

```kotlin
data class Person(val name: String, val skills: List<String>)

fun createTeam(leader: String, vararg members: String): List<String> {
    return listOf(leader) + members
}

fun announceSkills(person: String, vararg skills: String) {
    println("$person has the following skills:")
    skills.forEach { println("  - $it") }
}

fun main() {
    // Using spread with arrays
    val newMembers = arrayOf("Ana", "Bruno", "Carlos")
    val team = createTeam("Gustavo", *newMembers)
    println("Team: $team")
    
    // Using spread with typed arrays
    val numbers = intArrayOf(10, 20, 30, 40, 50)
    val moreNumbers = intArrayOf(60, 70)
    
    // Combining arrays with spread
    val allNumbers = intArrayOf(1, 2, *numbers, 99, *moreNumbers, 100)
    println("All numbers: ${allNumbers.toList()}")
    
    // Using spread with converted lists
    val person = Person(
        "Gustavo",
        listOf("Kotlin", "Java", "Spring", "SQL")
    )
    
    announceSkills(person.name, *person.skills.toTypedArray())
}
```

### Operator Precedence

Precedence determines the order in which operators are evaluated:

1. Postfix: `++`, `--`, `.`, `?.`, `?`
2. Prefix: `-`, `+`, `++`, `--`, `!`
3. Type: `:`, `as`, `as?`
4. Multiplicative: `*`, `/`, `%`
5. Additive: `+`, `-`
6. Range: `..`
7. Infix functions
8. Elvis: `?:`
9. Checks: `in`, `!in`, `is`, `!is`
10. Comparison: `<`, `>`, `<=`, `>=`
11. Equality: `==`, `!=`, `===`, `!==`
12. Conjunction: `&&`
13. Disjunction: `||`
14. Assignment: `=`, `+=`, `-=`, `*=`, `/=`, `%=`

Complete example:

```kotlin
fun main() {
    // Precedence in action
    val result1 = 2 + 3 * 4  // 14, not 20 (multiplication first)
    println("2 + 3 * 4 = $result1")
    
    val result2 = (2 + 3) * 4  // 20 (parentheses force the order)
    println("(2 + 3) * 4 = $result2")
    
    // Precedence with logical operators
    val a = true
    val b = false
    val c = true
    
    val result3 = a || b && c  // true (AND has precedence over OR)
    val result4 = (a || b) && c  // true (parentheses change the order)
    
    println("true || false && true = $result3")
    println("(true || false) && true = $result4")
    
    // Precedence with Elvis and comparison
    val number: Int? = null
    val result5 = number ?: 10 > 5  // true (?: has lower precedence)
    val result6 = (number ?: 10) > 5  // true (clearer with parentheses)
    
    println("null ?: 10 > 5 = $result5")
    println("(null ?: 10) > 5 = $result6")
}
```

<br>

Go to [conditional expressions](CONDITIONS.md).

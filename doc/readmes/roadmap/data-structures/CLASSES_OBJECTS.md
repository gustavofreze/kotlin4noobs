# Classes e objetos

### Class

As classes em Kotlin são declaradas usando a palavra-chave `class`:

```kotlin
class Person {
    //... 
}
```

A declaração de classe consiste no nome da classe, no cabeçalho da classe (especificando seus parâmetros de tipo, o
construtor primário e algumas outras coisas) e o corpo da classe entre chaves. Tanto o cabeçalho quanto o corpo são
opcionais, se a classe não tiver corpo, as chaves podem ser omitidas:

```kotlin
class Person
```

Propriedades em classes Kotlin podem ser declaradas como mutáveis, usando a palavra-chave `var`,
ou como somente leitura, usando a palavra-chave `val`:

```kotlin
class Person(val age: Int, val name: String)
```

Para declarar uma instância dessa classe, basta fazer:

```kotlin
val person = Person(25, "Gustavo")
```

ou usando argumentos nomeados:

```kotlin
val person = Person(age = 25, name = "Gustavo")
```

Por padrão, toda classe que criamos não é aberta para ser herdada por outra,
então, precisamos usar a palavra-chave `open` para que a herança seja permitida:

```kotlin
open class Person(val age:  Int, val name: String)

class Driver(age: Int, name: String, val license: String) : Person(age, name)
```

Exemplo completo:

```kotlin
open class Person(val age: Int, val name:  String)

class Driver(age: Int, name: String, val license: String) : Person(age, name)

fun main() {
    val driver = Driver(age = 25, name = "Gustavo", license = "14-42-23")
    
    println(driver.age)     // 25
    println(driver.name)    // Gustavo
    println(driver.license) // 14-42-23
}
```

_Você pode testar esse código [online](https://pl.kotl.in/LJGuHSRdQ)._

### Data class

Não é incomum criar classes cujo objetivo principal seja armazenar dados, como,
[DTOs](https://pt.wikipedia.org/wiki/Objeto_de_Transfer%C3%AAncia_de_Dados).
Em Kotlin, elas são chamadas classes de dados sendo declaradas usando a palavra-chave `data`:

```kotlin
data class Person(val age: Int, val name:  String)
```

O compilador deriva automaticamente os seguintes membros de todas as propriedades declaradas no construtor primário:
`equals`, `hashCode`, `toString` e `copy`.

Para garantir consistência e comportamento significativo do código gerado, as classes de dados devem atender aos
seguintes requisitos:

- O construtor primário precisa ter pelo menos um parâmetro.
- Todos os parâmetros do construtor primário precisam ser marcados como `val` ou `var`.
- As classes de dados não podem ser abstratas, abertas, seladas ou internas.

Para declarar uma instância dessa classe, basta fazer:

```kotlin
val person = Person(age = 25, name = "Gustavo")
```

ou usando argumentos nomeados:

```kotlin
val person = Person(age = 25, name = "Gustavo")
```

Exemplo completo:

```kotlin
data class Person(val age: Int, val name: String)

fun main() {
    val person = Person(age = 25, name = "Gustavo")
    val copy = person.copy(name = "João")
    
    println(person)  // Person(age=25, name=Gustavo)
    println(copy)    // Person(age=25, name=João)
}
```

_Você pode testar esse código [online](https://pl.kotl.in/7hMYnjdCu)._

### Enum class

As classes do tipo enum em Kotlin são declaradas usando a palavra-chave `enum`:

```kotlin
enum class Type {
    CUSTOMER,
    EMPLOYEE
}
```

Cada constante enum é um objeto. As constantes de enumeração são separadas por vírgulas. Como cada enum é uma instância
da classe enum, ele pode ser inicializado como:

```kotlin
enum class Type(val value: Int) {
    CUSTOMER(value = 1),
    EMPLOYEE(value = 2)
}
```

Exemplo completo:

```kotlin
enum class Type(val value: Int) {
    CUSTOMER(value = 1),
    EMPLOYEE(value = 2)
}

fun main() {
    val type = Type. CUSTOMER
    
    println(type)       // CUSTOMER
    println(type.value) // 1
}
```

_Você pode testar esse código [online](https://pl.kotl.in/KAsr0ANRo)._

As constantes de enumeração podem declarar suas próprias classes anônimas com seus métodos correspondentes, bem como
substituir os métodos-base:

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

Exemplo completo:

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

_Você pode testar esse código [online](https://pl.kotl.in/Xol_t4TcX)._

**Nota**
> Uma classe enum pode implementar uma interface, mas não pode derivar de uma classe, fornecendo uma implementação
> comum de membros de interface para todas as entradas ou implementações separadas para cada entrada dentro de sua
> classe anônima. Isso é feito adicionando as interfaces que você deseja implementar à declaração da classe enum.

### Abstract class

As classes em Kotlin podem ser abstratas, basta declará-las usando a palavra-chave `abstract`:

```kotlin
abstract class Customer {

    abstract fun register()
}
```

E na classe que você deseja que estenda a classe abstrata, basta fazer:

```kotlin
class Person(val age: Int, val name:  String) : Customer() {

    override fun register() {
        val template = "Registrado %s, %s anos."
        println(template.format(name, age))
    }
}
```

Exemplo completo:

```kotlin
abstract class Customer {
    abstract fun register()
}

class Person(val age: Int, val name: String) : Customer() {
    override fun register() {
        val template = "Registrado %s, %s anos."
        println(template.format(name, age))
    }
}

fun main() {
    val person = Person(25, "Gustavo")
    person.register()  // Registrado Gustavo, 25 anos.
}
```

_Você pode testar esse código [online](https://pl.kotl.in/OR7XdCy2u)._

### Objects

Em Kotlin podemos fazer a declaração de objetos que fazem a implementação do
padrão [singleton](https://pt.wikipedia.org/wiki/Singleton), basta declarar a palavra-chave `object`:

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

Para se referir ao objeto, use seu nome diretamente:

```kotlin
PersonValidator.isValidAge(age = 25)
```

Exemplo completo:

```kotlin
object PersonValidator {
    fun isValidAge(age: Int): Boolean {
        return age in 0..150
    }
    
    fun isValidName(name:  String): Boolean {
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

_Você pode testar esse código [online](https://pl.kotl.in/XbqOgQltY)._

O Kotlin também nos permite criar o que é chamado companion object, um objeto que fica em uma classe. Para isso,
precisamos usar a palavra-chave `companion object`:

```kotlin
class Person(val age: Int, val name:  String) {

    companion object {
        fun newborn(name: String) = Person(age = 0, name = name)
    }
}
```

O companion object nos dá a possibilidade de utilizarmos o método `newborn` através da classe `Person` sem precisarmos
criar uma instância da mesma:

```kotlin
val person = Person.newborn(name = "Gustavo")
```

Exemplo completo:

```kotlin
class Person(val age:  Int, val name: String) {
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

_Você pode testar esse código [online](https://pl.kotl.in/72w8_xGYo)_

### Interfaces

Interfaces em Kotlin podem conter declarações de métodos abstratos, bem como implementações de métodos. O que as torna
diferentes das classes abstratas é que as interfaces não podem armazenar o estado. Eles podem ter propriedades, mas elas
precisam ser abstratas ou fornecer implementações de acessador.

Uma interface é definida usando a palavra-chave `interface`:

```kotlin
interface Customer {
    fun register()
}
```

Uma interface pode derivar de outras interfaces, o que significa que ela pode fornecer implementações para seus membros
e declarar novas funções e propriedades:

```kotlin
interface PremiumCustomer : Customer
```

Você pode declarar propriedades em interfaces. Uma propriedade declarada em uma interface pode ser abstrata ou fornecer
implementações para acessadores:

```kotlin
interface PremiumCustomer : Customer {
    val minimumLimit: Double
}
```

Exemplo completo:

```kotlin
interface Customer {
    fun register()
}

interface PremiumCustomer : Customer {
    val minimumLimit: Double
}

class VIPCustomer :  PremiumCustomer {
    override val minimumLimit = 10000.0
    
    override fun register() {
        val template = "VIP registrado com limite: R$ %.2f"
        println(template.format(minimumLimit))
    }
}

fun main() {
    val vip = VIPCustomer()
    vip.register()  // VIP registrado com limite: R$ 10000.00
}
```

_Você pode testar esse código [online](https://pl.kotl.in/NihZqK-_R)._

O padrão [Delegation](https://en.wikipedia.org/wiki/Delegation_pattern) provou ser uma boa alternativa para a herança de
implementação, e o Kotlin o suporta nativamente. Uma classe `Person` pode implementar uma interface `Customer`
delegando todos os seus membros públicos a um
objeto especificado:

```kotlin
interface Customer {
    fun register()
}

class CustomerAdapter(private val name: String) : Customer {

    override fun register() {
        val template = "Registrado %s."
        println(template. format(name))
    }
}

class Person(customer: Customer) : Customer by customer
```

Exemplo completo:

```kotlin
interface Customer {
    fun register()
}

class CustomerAdapter(private val name: String) : Customer {
    override fun register() {
        val template = "Registrado %s."
        println(template.format(name))
    }
}

class Person(customer: Customer) : Customer by customer

fun main() {
    val adapter = CustomerAdapter("Gustavo")
    val person = Person(adapter)
    
    person.register()  // Registrado Gustavo.
}
```

_Você pode testar esse código [online](https://pl.kotl.in/BlCJfERT7)._

### Sealed class

Sealed classes são úteis quando você tem uma hierarquia de classes restrita onde todas as possíveis subclasses são
conhecidas em tempo de compilação. Elas são declaradas usando a palavra-chave `sealed`:

```kotlin
sealed class PersonEvent {
    data class Created(val person: Person) : PersonEvent()
    data class Updated(val person: Person) : PersonEvent()
    data class Deleted(val id: Int) : PersonEvent()
}
```

A principal vantagem das sealed classes é que quando usadas em uma expressão `when`, o compilador pode verificar se
todos os casos foram cobertos, eliminando a necessidade de uma cláusula `else`:

```kotlin
fun handleEvent(event: PersonEvent) {
    when (event) {
        is PersonEvent.Created -> println("Pessoa criada: ${event.person.name}")
        is PersonEvent.Updated -> println("Pessoa atualizada: ${event. person.name}")
        is PersonEvent.Deleted -> println("Pessoa removida: ID ${event.id}")
        // Não precisa de else
    }
}
```

Exemplo completo:

```kotlin
data class Person(val id: Int, val name: String)

sealed class PersonEvent {
    data class Created(val person: Person) : PersonEvent()
    data class Updated(val person: Person) : PersonEvent()
    data class Deleted(val id: Int) : PersonEvent()
}

fun handleEvent(event: PersonEvent) {
    when (event) {
        is PersonEvent.Created -> println("Pessoa criada: ${event.person.name}")
        is PersonEvent.Updated -> println("Pessoa atualizada: ${event.person. name}")
        is PersonEvent. Deleted -> println("Pessoa removida: ID ${event.id}")
    }
}

fun main() {
    val person = Person(1, "Gustavo")
    
    handleEvent(PersonEvent.Created(person))
    handleEvent(PersonEvent.Updated(person. copy(name = "Gustavo Freze")))
    handleEvent(PersonEvent.Deleted(1))
}
```

_Você pode testar esse código [online](https://pl.kotl.in/lpEjOo2iD)._

As sealed classes são abstratas por natureza e não podem ser instanciadas diretamente. Todas as subclasses de uma
sealed class devem ser declaradas no mesmo arquivo ou como classes aninhadas:

```kotlin
sealed class PersonState {
    object Loading : PersonState()
    data class Loaded(val person: Person) : PersonState()
    data class Error(val message: String) : PersonState()
}
```

### Inline class (Value class)

Inline classes são uma forma de criar wrappers de tipos sem o overhead de runtime. Elas são úteis quando você quer
adicionar type safety sem comprometer a performance. São declaradas usando `@JvmInline` e `value class`:

```kotlin
@JvmInline
value class PersonId(val value: Int)

@JvmInline
value class PersonName(val value: String) {
    init {
        require(value.isNotBlank()) { "Nome não pode ser vazio" }
    }
}
```

A principal diferença entre inline classes e classes normais é que em runtime, quando possível, o compilador usa o
tipo primitivo diretamente, evitando a criação de objetos wrapper:

```kotlin
@JvmInline
value class Age(val value: Int)

fun checkAdult(age: Age): Boolean {
    return age.value >= 18
}

val age = Age(25)
```

Exemplo completo:

```kotlin
@JvmInline
value class PersonId(val value: Int)

@JvmInline
value class PersonName(val value: String) {
    init {
        require(value. isNotBlank()) { "Nome não pode ser vazio" }
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

_Você pode testar esse código [online](https://pl.kotl.in/9RMYlSwYP)._

### Nested e Inner classes

Kotlin permite criar classes dentro de outras classes. Classes aninhadas (nested) não têm acesso aos membros da classe
externa, enquanto classes internas (inner) têm:

```kotlin
class Company {
    private val employees = mutableListOf<Person>()
    
    // Nested class - não tem acesso a 'employees'
    class Department {
        fun getCode() = "DEPT-001"
    }
    
    // Inner class - tem acesso a 'employees'
    inner class Team {
        fun getTeamSize() = employees.size
    }
}
```

Exemplo completo:

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
    println(team. getTeamSize())  // 2
}
```

_Você pode testar esse código [online](https://pl.kotl.in/OexGufcOn)._

<br>

Ir para [genéricos](GENERICS.md).

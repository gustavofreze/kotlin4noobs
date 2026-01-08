# Genéricos

Generics permitem escrever código flexível e reutilizável que funciona com diferentes tipos mantendo type safety. Eles
são fundamentais para criar coleções, classes e funções que podem trabalhar com qualquer tipo de forma segura.

### Classes genéricas

Uma classe genérica é declarada com parâmetros de tipo entre `< >`:

```kotlin
class Box<T>(val value: T) {
    fun get(): T = value
}

val intBox = Box(123)        // Box<Int>
val stringBox = Box("Hello") // Box<String>
```

Você pode ter múltiplos parâmetros de tipo:

```kotlin
class Pair<A, B>(val first: A, val second: B) {
    fun swap(): Pair<B, A> = Pair(second, first)
}
```

Exemplo completo:

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
    // Container de String
    val stringContainer = Container("Hello")
    println(stringContainer.get())  // Hello
    
    stringContainer.set("World")
    println(stringContainer.get())  // World
    
    // Transformando String em Int (tamanho)
    val intContainer = stringContainer.transform { it.length }
    println(intContainer.get())  // 5
    
    // Container de Person
    data class Person(val name: String, val age: Int)
    val personContainer = Container(Person("Gustavo", 25))
    
    // Transformando Person em String
    val nameContainer = personContainer.transform { it.name }
    println(nameContainer.get())  // Gustavo
}
```

_Você pode testar esse código [online](https://pl.kotl.in/iiAXzON4b)._

### Funções genéricas

Funções podem ter seus próprios parâmetros de tipo:

```kotlin
fun <T> singletonList(item: T): List<T> {
    return listOf(item)
}

fun <T> T.print(): T {
    println(this)
    return this
}
```

Exemplo completo:

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
    // Swap genérico
    val numbers = mutableListOf(1, 2, 3, 4, 5)
    swap(numbers, 1, 3)
    println(numbers)  // [1, 4, 3, 2, 5]
    
    val names = mutableListOf("Ana", "Bruno", "Carlos")
    swap(names, 0, 2)
    println(names)  // [Carlos, Bruno, Ana]
    
    // Extension function genérica
    println(numbers.middle())  // 3
    println(names.middle())    // Bruno
    
    // Transformação com null safety
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

_Você pode testar esse código [online](https://pl.kotl.in/QIAyRkvPz)._

### Constraints

Você pode restringir os tipos que podem ser usados como argumentos genéricos:

```kotlin
// T deve ser um subtipo de Number
fun <T : Number> List<T>.sum(): Double {
    var sum = 0.0
    for (element in this) {
        sum += element.toDouble()
    }
    return sum
}

// T deve implementar Comparable
fun <T : Comparable<T>> max(first: T, second: T): T {
    return if (first > second) first else second
}
```

Múltiplas restrições com `where`:

```kotlin
fun <T> process(item: T) 
    where T : CharSequence,
          T :  Comparable<T> {
    // T deve ser CharSequence E Comparable
}
```

Exemplo completo:

```kotlin
// Interface para exemplo
interface Identifiable {
    val id: Int
}

// Classes de exemplo
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

// Função com constraint simples
fun <T :  Identifiable> findById(list: List<T>, id: Int): T? {
    return list.find { it.id == id }
}

// Função com múltiplas constraints
fun <T> getOldest(list: List<T>): T? 
    where T :  Identifiable,
          T :  Comparable<T> {
    return list.maxOrNull()
}

// Classe genérica com constraint
class Cache<T :  Identifiable>(private val maxSize: Int) {
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
    
    // Usando função com constraint
    println(findById(people, 2))     // Person(id=2, name=Maria, age=30)
    println(findById(products, 1))   // Product(id=1, name=Notebook, price=3000.0)
    
    // Usando função com múltiplas constraints
    println(getOldest(people))       // Person(id=2, name=Maria, age=30)
    // getOldest(products)           // Erro: Product não implementa Comparable
    
    // Usando classe genérica com constraint
    val cache = Cache<Person>(2)
    cache.add(Person(1, "Ana", 20))
    cache.add(Person(2, "Bruno", 25))
    cache.add(Person(3, "Carlos", 30))  // Remove Ana (FIFO)
    
    println(cache.getAll())  // [Bruno, Carlos]
}
```

_Você pode testar esse código [online](https://pl.kotl.in/Pp2gv31D6)._

### Variância

Kotlin usa `in` e `out` para declarar variância:

- `out` (covariância): pode produzir T, mas não consumir
- `in` (contravariância): pode consumir T, mas não produzir

```kotlin
// Producer - só pode retornar T (covariante)
interface Producer<out T> {
    fun produce(): T
}

// Consumer - só pode receber T (contravariante)  
interface Consumer<in T> {
    fun consume(item: T)
}

// Invariante - pode tanto produzir quanto consumir
interface Storage<T> {
    fun store(item: T)
    fun retrieve(): T
}
```

Exemplo completo:

```kotlin
open class Person(val name: String)
open class Employee(name: String, val id: Int) : Person(name)  // Added 'open' keyword
class Manager(name: String, id: Int, val team: String) : Employee(name, id)

// Covariância (out) - Producer
class PersonProducer<out T : Person>(private val person: T) {
    fun get(): T = person
    // fun set(person: T) {}  // Erro! Não pode consumir T
}

// Contravariância (in) - Consumer
class PersonConsumer<in T : Person> {
    fun process(person: T) {
        println("Processando: ${person.name}")
    }
    // fun get(): T = ...  // Erro! Não pode produzir T
}

// Invariância - pode consumir e produzir
class PersonStorage<T : Person> {
    private var stored: T? = null
    
    fun store(person:  T) {
        stored = person
    }
    
    fun retrieve(): T? = stored
}

fun main() {
    // Covariância (out) permite usar subtipos
    val employeeProducer: PersonProducer<Employee> = PersonProducer(Employee("João", 123))
    val personProducer: PersonProducer<Person> = employeeProducer  // OK!  Employee é subtipo de Person
    println(personProducer.get().name)
    
    // Contravariância (in) permite usar supertipos
    val personConsumer:  PersonConsumer<Person> = PersonConsumer()
    val employeeConsumer: PersonConsumer<Employee> = personConsumer  // OK! Person é supertipo de Employee
    employeeConsumer.process(Employee("Maria", 456))
    
    // Invariância não permite nenhuma conversão
    val employeeStorage: PersonStorage<Employee> = PersonStorage()
    // val personStorage: PersonStorage<Person> = employeeStorage  // Erro!
    
    // Exemplo prático com listas
    val employees: List<Employee> = listOf(
        Employee("Ana", 111),
        Manager("Carlos", 222, "Dev Team")
    )
    
    // List é covariante (out), então podemos fazer isso:
    val people: List<Person> = employees
    people.forEach { println("Pessoa: ${it.name}") }
    
    // MutableList é invariante, então isso não compila: 
    // val mutablePeople: MutableList<Person> = mutableListOf(Employee("Test", 999))  // Erro!
}
```

_Você pode testar esse código [online](https://pl.kotl.in/6qLaBfxwT)._

### Reified type parameters

Com `inline` e `reified`, você pode acessar o tipo em runtime:

```kotlin
inline fun <reified T> isInstance(value: Any): Boolean {
    return value is T
}

inline fun <reified T> filterByType(list: List<Any>): List<T> {
    return list.filterIsInstance<T>()
}
```

Exemplo completo:

```kotlin
open class Person(val name: String)
class Employee(name: String, val id: Int) : Person(name)
class Customer(name: String, val points: Int) : Person(name)

// Função inline com reified
inline fun <reified T> createInstance(): String {
    return when (T:: class) {
        String::class -> "Criando String" as T
        Int::class -> 42 as T
        Person::class -> Person("Default") as T
        else -> throw IllegalArgumentException("Tipo não suportado:  ${T::class}")
    } as String
}

inline fun <reified T :  Person> findPeople(people: List<Person>): List<T> {
    return people.filterIsInstance<T>()
}

inline fun <reified T> List<*>.countType(): Int {
    return count { it is T }
}

inline fun <reified T> safeCast(value: Any): T? {
    return value as? T
}

// Função que cria um mapa agrupando por tipo
inline fun <reified T> List<Any>.groupByType(): Map<String, List<T>> {
    val items = filterIsInstance<T>()
    return mapOf(T::class.simpleName. orEmpty() to items)
}

fun main() {
    val mixedList:  List<Person> = listOf(
        Person("João"),
        Employee("Maria", 123),
        Customer("Pedro", 500),
        Employee("Ana", 456),
        Customer("Carlos", 1000)
    )
    
    // Filtrando por tipo específico
    val employees = findPeople<Employee>(mixedList)
    println("Funcionários:  ${employees.map { it.name }}")
    
    val customers = findPeople<Customer>(mixedList)
    println("Clientes: ${customers.map { it.name }}")
    
    // Contando tipos
    val anyList: List<Any> = listOf("text", 123, true, "more text", 456, Person("Test"))
    println("\nContagem por tipo:")
    println("Strings: ${anyList.countType<String>()}")
    println("Inteiros: ${anyList. countType<Int>()}")
    println("Booleanos: ${anyList.countType<Boolean>()}")
    println("Pessoas: ${anyList.countType<Person>()}")
    
    // Safe cast com reified
    val value: Any = "Kotlin"
    val asString = safeCast<String>(value)
    val asInt = safeCast<Int>(value)
    
    println("\nSafe casting:")
    println("Como String: $asString")
    println("Como Int: $asInt")
    
    // Agrupando por tipo
    val grouped = anyList.groupByType<String>()
    println("\nStrings agrupadas: $grouped")
}
```

_Você pode testar esse código [online](https://pl.kotl.in/qZPUt-CgS)._

### Generics com data classes

Generics são muito úteis com data classes para criar estruturas reutilizáveis:

```kotlin
data class Result<T>(
    val data: T?  = null,
    val error:  String? = null
) {
    val isSuccess: Boolean get() = data != null
    val isError: Boolean get() = error != null
}

data class PagedList<T>(
    val items:  List<T>,
    val page: Int,
    val totalPages: Int
)
```

Exemplo completo:

```kotlin
// Result genérico para operações que podem falhar
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

// Data class genérica para respostas paginadas
data class PagedResponse<T>(
    val items: List<T>,
    val currentPage: Int,
    val totalPages: Int,
    val totalItems: Int
) {
    val hasNext: Boolean get() = currentPage < totalPages
    val hasPrevious: Boolean get() = currentPage > 1
}

// Data class para par chave-valor genérico
data class KeyValue<K, V>(val key: K, val value: V)

// Serviço que usa generics
class PersonService {
    private val people = listOf(
        Person("João", 25),
        Person("Maria", 30),
        Person("Pedro", 22),
        Person("Ana", 28),
        Person("Carlos", 35)
    )
    
    fun findById(id:  Int): Result<Person> {
        return if (id in people. indices) {
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
            KeyValue("youngest", people.minBy { it. age }),
            KeyValue("oldest", people.maxBy { it. age })
        )
    }
}

data class Person(val name: String, val age: Int)

fun main() {
    val service = PersonService()
    
    // Usando Result<T>
    val result1 = service.findById(1)
    when (result1) {
        is Result.Success -> println("Encontrado: ${result1.data}")
        is Result.Error -> println("Erro: ${result1.exception.message}")
    }
    
    // Mapeando Result
    val nameResult = service.findById(0).map { it.name.uppercase() }
    println("Nome em maiúsculas: ${nameResult. getOrDefault("DESCONHECIDO")}")
    
    // Usando PagedResponse<T>
    val page1 = service.getPaged(1, 2)
    println("\nPágina ${page1.currentPage} de ${page1.totalPages}:")
    page1.items.forEach { println("  - $it") }
    println("Tem próxima?  ${page1.hasNext}")
    
    // Usando KeyValue<K, V>
    println("\nEstatísticas:")
    service.getStatistics().forEach { stat ->
        println("  ${stat.key}: ${stat. value}")
    }
}
```

_Você pode testar esse código [online](https://pl.kotl.in/W3Nl0cu1e)._

<br>

Ir para o [início](https://github.com/gustavofreze/kotlin4noobs#Roadmap).

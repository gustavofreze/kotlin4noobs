# Operadores

Kotlin oferece uma rica variedade de operadores que tornam o código mais expressivo e conciso. Além dos operadores
aritméticos básicos, a linguagem fornece operadores especiais para null safety, type checking, ranges e muito mais.

### Operadores aritméticos

Os operadores aritméticos básicos funcionam como esperado:

```kotlin
val a = 10
val b = 3

println(a + b)  // 13 - Adição
println(a - b)  // 7  - Subtração
println(a * b)  // 30 - Multiplicação
println(a / b)  // 3  - Divisão
println(a % b)  // 1  - Módulo (resto)
```

Exemplo completo:

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

_Você pode testar esse código [online](https://pl.kotl.in/zM0ecawNn)._

### Operadores de atribuição compostos

Kotlin suporta operadores de atribuição compostos para operações mais concisas:

```kotlin
var x = 10

x += 5   // x = x + 5
x -= 3   // x = x - 3
x *= 2   // x = x * 2
x /= 4   // x = x / 4
x %= 3   // x = x % 3
```

Exemplo completo:

```kotlin
fun main() {
    var x = 10
    println("Valor inicial: $x")  // 10
    
    x += 5
    println("Após += 5: $x")      // 15
    
    x -= 3
    println("Após -= 3: $x")      // 12
    
    x *= 2
    println("Após *= 2: $x")      // 24
    
    x /= 4
    println("Após /= 4: $x")      // 6
    
    x %= 4
    println("Após %= 4: $x")      // 2
}
```

_Você pode testar esse código [online](https://pl.kotl.in/CZJljoOzp)._

### Operadores de comparação

Os operadores de comparação retornam valores booleanos:

```kotlin
val a = 5
val b = 10

println(a == b)  // false - Igualdade
println(a != b)  // true  - Desigualdade
println(a < b)   // true  - Menor que
println(a > b)   // false - Maior que
println(a <= b)  // true  - Menor ou igual
println(a >= b)  // false - Maior ou igual
```

Para comparação referencial (verificar se são o mesmo objeto), use `===`:

```kotlin
val person1 = Person("Gustavo", 25)
val person2 = Person("Gustavo", 25)
val person3 = person1

println(person1 == person2)   // true (mesmo conteúdo se for data class)
println(person1 === person2)  // false (objetos diferentes)
println(person1 === person3)  // true (mesmo objeto)
```

Exemplo completo:

```kotlin
data class Person(val name: String, val age: Int)

fun main() {
    val person1 = Person("Gustavo", 25)
    val person2 = Person("Gustavo", 25)
    val person3 = person1
    
    // Comparação estrutural (conteúdo)
    println(person1 == person2)   // true
    println(person1 != person2)   // false
    
    // Comparação referencial (mesma instância)
    println(person1 === person2)  // false
    println(person1 === person3)  // true
    println(person1 !== person2)  // true
}
```

_Você pode testar esse código [online](https://pl.kotl.in/Md1dpUF0J)._

### Operadores lógicos

Operadores para combinar expressões booleanas:

```kotlin
val isAdult = true
val hasLicense = false

println(isAdult && hasLicense)  // false - AND
println(isAdult || hasLicense)  // true  - OR
println(!hasLicense)            // true  - NOT
```

Exemplo completo:

```kotlin
data class Person(val name: String, val age: Int, val hasDriverLicense: Boolean)

fun main() {
    val person = Person("Gustavo", 25, true)
    
    val isAdult = person.age >= 18
    val hasLicense = person.hasDriverLicense
    
    val canDrive = isAdult && hasLicense
    val needsAttention = ! isAdult || !hasLicense
    
    println("É adulto: $isAdult")                    // true
    println("Tem habilitação: $hasLicense")          // true
    println("Pode dirigir: $canDrive")               // true
    println("Precisa de atenção: $needsAttention")   // false
}
```

_Você pode testar esse código [online](https://pl.kotl.in/k8-L5aAQn)._

### Operador `in` e `!in`

O operador `in` verifica se um valor está contido em uma coleção ou range:

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
println(3 in numbers)     // true
println(10 !in numbers)   // true

val range = 1..10
println(5 in range)      // true
println(15 in range)     // false
```

Também funciona com strings:

```kotlin
val text = "Kotlin Programming"
println("Kotlin" in text)    // true
println("Java" !in text)     // true
```

Exemplo completo:

```kotlin
data class Person(val name: String, val age: Int)

fun main() {
    val team = listOf(
        Person("Gustavo", 25),
        Person("Maria", 30),
        Person("Pedro", 22)
    )
    
    val ages = team.map { it.age }
    
    // Verificando em coleções
    println(25 in ages)          // true
    println(40 !in ages)         // true 
    
    // Verificando em ranges
    val ageRange = 18..65
    val allWorkingAge = team.all { it.age in ageRange }
    println("Todos em idade ativa: $allWorkingAge")  // true
    
    // Verificando em strings
    val searchName = "Gustavo Freze"
    println("Gustavo" in searchName)  // true
    println("Pedro" !in searchName)   // true 
}
```

_Você pode testar esse código [online](https://pl.kotl.in/PfAx-LDvJ)._

### Operadores `is` e `!is` (Type Checking)

Os operadores `is` e `!is` verificam o tipo de um objeto em runtime:

```kotlin
val value: Any = "Kotlin"

if (value is String) {
    // Smart cast:  value é automaticamente convertido para String aqui
    println(value.length)
}

if (value !is Int) {
    println("Não é um número inteiro")
}
```

Com smart cast, não é necessário fazer cast explícito após verificar o tipo:

```kotlin
fun processValue(value: Any) {
    when (value) {
        is String -> println("String de tamanho ${value.length}")
        is Int -> println("Número:  ${value * 2}")
        is List<*> -> println("Lista com ${value.size} elementos")
        else -> println("Tipo desconhecido")
    }
}
```

Exemplo completo:

```kotlin
open class Person(val name: String)
class Employee(name: String, val id: Int) : Person(name)
class Customer(name:  String, val loyaltyPoints:  Int) : Person(name)

fun processPerson(person: Person) {
    when (person) {
        is Employee -> {
            // Smart cast para Employee
            println("Funcionário: ${person.name}, ID: ${person. id}")
        }
        is Customer -> {
            // Smart cast para Customer
            println("Cliente:  ${person.name}, Pontos: ${person.loyaltyPoints}")
        }
        else -> {
            println("Pessoa:  ${person.name}")
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
        
        // Verificação de tipo
        if (person is Employee) {
            println("  -> É um funcionário")
        }
        if (person !is Customer) {  // CORRECTED: !is without space
            println("  -> Não é um cliente")
        }
    }
}
```

_Você pode testar esse código [online](https://pl.kotl.in/xOd0ZzfS1)._

### Operador `as` e `as?` (Type Casting)

O operador `as` realiza cast explícito, enquanto `as?` realiza safe cast (retorna null se o cast falhar):

```kotlin
val value: Any = "Kotlin"

// Cast inseguro - lança exception se falhar
val text = value as String

// Safe cast - retorna null se falhar
val number = value as? Int  // null
val string = value as? String  // "Kotlin"
```

Exemplo completo:

```kotlin
open class Person(val name: String)
class Employee(name: String, val id: Int) : Person(name)

fun main() {
    val person: Person = Employee("Gustavo", 123)
    val anyValue: Any = person
    
    // Cast seguro
    val employee = person as? Employee
    if (employee != null) {
        println("Funcionário ID: ${employee.id}")
    }
    
    // Cast inseguro (funciona porque person é realmente Employee)
    val emp = person as Employee
    println("ID: ${emp.id}")
    
    // Safe cast que retorna null
    val customer = person as? Customer
    println("É cliente?  ${customer != null}")  // false
    
    // Usando com Elvis operator
    val id = (anyValue as? Employee)?.id ?: -1
    println("ID do funcionário: $id")
}

// Classe auxiliar para o exemplo
class Customer(name: String) : Person(name)
```

_Você pode testar esse código [online](https://pl.kotl.in/Uae03196A)._

### Operador range (`..`)

O operador `..` cria ranges, muito úteis em loops e verificações:

```kotlin
val range = 1..10           // Range fechado:  1 até 10 (inclusive)
val exclusive = 1 until 10  // Range semi-aberto: 1 até 9
val downTo = 10 downTo 1    // Range decrescente:  10 até 1
val stepped = 1..10 step 2  // Range com passo:  1, 3, 5, 7, 9
```

Ranges também funcionam com caracteres:

```kotlin
val letters = 'a'..'z'
println('k' in letters)  // true
```

Exemplo completo:

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
    
    // Definindo ranges de idade
    val children = 0..17
    val youngAdults = 18..30
    val adults = 31..60
    val seniors = 61.. 120
    
    // Categorizando pessoas
    people.forEach { person ->
        val category = when (person.age) {
            in children -> "Criança/Adolescente"
            in youngAdults -> "Jovem Adulto"
            in adults -> "Adulto"
            in seniors -> "Idoso"
            else -> "Idade inválida"
        }
        println("${person.name} (${person.age} anos): $category")
    }
    
    // Usando ranges em loops
    println("\nContagem de 5 em 5:")
    for (i in 0..20 step 5) {
        print("$i ")
    }
    
    println("\n\nContagem regressiva:")
    for (i in 5 downTo 1) {
        print("$i ")
    }
    println("🚀")
}
```

_Você pode testar esse código [online](https://pl.kotl.in/wujv6Qrs5)._

### Operador Elvis (`?:`)

O operador Elvis fornece um valor padrão, quando a expressão à esquerda é null:

```kotlin
val name: String? = null
val displayName = name ?: "Anônimo"  // "Anônimo"
```

Muito útil com funções que retornam null:

```kotlin
fun findPerson(id: Int): Person? = // ...  busca pessoa

val person = findPerson(123) ?: Person("Default", 0)
```

Exemplo completo:

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
    
    // Usando Elvis com funções que retornam null
    val person1 = service.findByName("Gustavo") ?: Person("Não encontrado", 0)
    println(person1)
    
    val person2 = service.findByName("Carlos") ?: Person("Não encontrado", 0)
    println(person2)
    
    // Usando Elvis para valores default
    println("Email de Gustavo: ${service.getEmail("Gustavo")}")
    println("Email de Maria: ${service.getEmail("Maria")}")
    println("Email de Carlos: ${service.getEmail("Carlos")}")
    
    // Encadeando Elvis operators
    val config:  String? = null
    val backup:  String?  = null
    val finalValue = config ?: backup ?:  "valor padrão"
    println("Configuração final: $finalValue")
}
```

_Você pode testar esse código [online](https://pl.kotl.in/IPDdkXm8C)._

### Operador de Spread (`*`)

O operador spread (`*`) expande um array em argumentos individuais:

```kotlin
fun sum(vararg numbers: Int): Int {
    return numbers.sum()
}

val array = intArrayOf(1, 2, 3)
val result = sum(*array)  // Expande o array
```

Exemplo completo:

```kotlin
data class Person(val name: String, val skills: List<String>)

fun createTeam(leader: String, vararg members: String): List<String> {
    return listOf(leader) + members
}

fun announceSkills(person: String, vararg skills: String) {
    println("$person possui as seguintes habilidades:")
    skills.forEach { println("  - $it") }
}

fun main() {
    // Usando spread com arrays
    val newMembers = arrayOf("Ana", "Bruno", "Carlos")
    val team = createTeam("Gustavo", *newMembers)
    println("Time: $team")
    
    // Usando spread com arrays tipados
    val numbers = intArrayOf(10, 20, 30, 40, 50)
    val moreNumbers = intArrayOf(60, 70)
    
    // Combinando arrays com spread
    val allNumbers = intArrayOf(1, 2, *numbers, 99, *moreNumbers, 100)
    println("Todos os números: ${allNumbers. toList()}")
    
    // Usando spread com listas convertidas
    val person = Person(
        "Gustavo",
        listOf("Kotlin", "Java", "Spring", "SQL")
    )
    
    announceSkills(person.name, *person.skills.toTypedArray())
}
```

_Você pode testar esse código [online](https://pl.kotl.in/fiCRoVvqv)._

### Precedência de Operadores

A precedência determina a ordem de avaliação dos operadores:

1. Postfix:  `++`, `--`, `.`, `?.`, `?`
2. Prefix: `-`, `+`, `++`, `--`, `!`
3. Type:  `:`, `as`, `as?`
4. Multiplicativo: `*`, `/`, `%`
5. Aditivo: `+`, `-`
6. Range: `..`
7. Infix functions
8. Elvis: `?:`
9. Checks: `in`, `!in`, `is`, `!is`
10. Comparação: `<`, `>`, `<=`, `>=`
11. Igualdade: `==`, `!=`, `===`, `!==`
12. Conjunction: `&&`
13. Disjunction: `||`
14. Assignment: `=`, `+=`, `-=`, `*=`, `/=`, `%=`

Exemplo completo:

```kotlin
fun main() {
    // Precedência em ação
    val result1 = 2 + 3 * 4  // 14, não 20 (multiplicação primeiro)
    println("2 + 3 * 4 = $result1")
    
    val result2 = (2 + 3) * 4  // 20 (parênteses forçam ordem)
    println("(2 + 3) * 4 = $result2")
    
    // Precedência com operadores lógicos
    val a = true
    val b = false
    val c = true
    
    val result3 = a || b && c  // true (AND tem precedência sobre OR)
    val result4 = (a || b) && c  // true (parênteses mudam a ordem)
    
    println("true || false && true = $result3")
    println("(true || false) && true = $result4")
    
    // Precedência com Elvis e comparação
    val number:  Int? = null
    val result5 = number ?: 10 > 5  // true (?:  tem menor precedência)
    val result6 = (number ?: 10) > 5  // true (mais claro com parênteses)
    
    println("null ?: 10 > 5 = $result5")
    println("(null ?: 10) > 5 = $result6")
}
```

_Você pode testar esse código [online](https://pl.kotl.in/btsTuokzF)._

<br>

Ir para [expressões condicionais](CONDITIONS.md).

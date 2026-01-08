# Tipos de dados

Kotlin oferece uma ampla gama de tipos de dados, desde os básicos como números inteiros e ponto flutuante, até tipos
mais específicos como `Date` e outros. Aqui estão os tipos mais comuns que você encontrará em Kotlin.

### Integers

Kotlin fornece tipos numéricos para representar valores inteiros de tamanhos variados.

#### Byte

O tipo `Byte` ocupa 8 bits e pode armazenar valores entre -128 e 127:

```kotlin
val byteValue: Byte = 100
```

#### Short

O tipo `Short` ocupa 16 bits e pode armazenar valores entre -32.768 e 32.767:

```kotlin
val shortValue: Short = 1000
```

#### Int

O tipo `Int` é o mais utilizado para inteiros. Ele ocupa 32 bits e pode armazenar valores de −2^31 a 2^31-1:

```kotlin
val intValue: Int = 123456
```

#### Long

O tipo `Long` ocupa 64 bits e pode armazenar valores entre -2^63 a 2^63-1:

```kotlin
val longValue: Long = 123456789L
```

### Floating point

Os números de ponto flutuante em Kotlin podem ser representados pelos tipos `Float` e `Double`.

#### Float

O tipo `Float` ocupa 32 bits e é geralmente usado quando é necessária menos precisão (com 6 a 7 dígitos de precisão
decimal):

```kotlin
val floatValue: Float = 3.14f
```

#### Double

O tipo `Double` é mais preciso, ocupando 64 bits (15 a 16 dígitos de precisão decimal):

```kotlin
val doubleValue: Double = 3.14159265359
```

### Char

O tipo `Char` é utilizado para representar um único caractere, como letras ou símbolos:

```kotlin
val letter: Char = 'A'
```

### Boolean

O tipo `Boolean` representa valores de verdade, com possíveis valores `true` ou `false`:

```kotlin
val isValid: Boolean = true
```

### Strings

O tipo `String` representa uma sequência de caracteres. Strings são imutáveis em Kotlin:

```kotlin
val greeting: String = "Hello, Kotlin!"
```

### Arrays

Em Kotlin, arrays são representados pelo tipo `Array`. Eles podem armazenar valores de tipos primitivos ou objetos:

```kotlin
val numbers = arrayOf(1, 2, 3)
val strings = arrayOf("Kotlin", "Java", "Python")
```

### Coleções

Além dos arrays, Kotlin oferece suporte a [coleções](../data-structures/COLLECTIONS.md), como listas (`List`),
conjuntos (`Set`) e mapas (
`Map`). Estas são altamente utilizadas em situações em que se precisa de estruturas de dados dinâmicas.

#### List

Uma lista imutável (não pode ser alterada):

```kotlin
val languages:  List<String> = listOf("Kotlin", "Java", "Python")
```

Uma lista mutável (pode ser alterada):

```kotlin
val mutableLanguages: MutableList<String> = mutableListOf("Kotlin", "Java")
mutableLanguages.add("Python")
```

#### Set

Um conjunto (`Set`) não permite elementos duplicados:

```kotlin
val uniqueNumbers: Set<Int> = setOf(1, 2, 3, 3)
```

#### Map

Um mapa (`Map`) armazena pares de chave-valor:

```kotlin
val userRoles: Map<String, String> = mapOf("admin" to "Administrator", "user" to "Regular User")
```

### Any

O tipo `Any` é a raiz da hierarquia de tipos em Kotlin. Qualquer classe ou tipo em Kotlin herda de `Any`:

```kotlin
val something: Any = "This can be anything"
```

### Date

Para trabalhar com datas e horários, é comum utilizar classes da biblioteca padrão Java, como `java.util.Date`,
`LocalDateTime`, e outras.

#### Date

```kotlin
import java.util.Date

val currentDate: Date = Date()
println(currentDate)
```

#### LocalDateTime

```kotlin
import java.time.LocalDateTime

val currentDateTime: LocalDateTime = LocalDateTime. now()
println(currentDateTime)
```

### Outros tipos úteis

#### Unit

O tipo `Unit` em Kotlin é equivalente ao `void` em outras linguagens, representando a ausência de um valor de retorno.

```kotlin
fun printMessage(message: String): Unit {
    println(message)
}
```

#### Nothing

O tipo `Nothing` indica que uma função nunca retorna (usado para funções que lançam exceções ou entram em loops
infinitos):

```kotlin
fun fail(message: String): Nothing {
    throw IllegalStateException(message)
}
```

<br>

Ir para [funções](FUNCTIONS.md).

# Coleções

Kotlin oferece uma rica API para trabalhar com coleções, como listas, conjuntos e mapas. As coleções podem ser mutáveis
ou imutáveis, permitindo flexibilidade ao manipular dados conforme a necessidade.

### List

Uma `List` é uma coleção ordenada de elementos que pode ou não ser mutável. Kotlin oferece tanto listas imutáveis (
`List`) quanto listas mutáveis (`MutableList`).

#### List imutável

Uma lista imutável não permite modificações após a sua criação:

```kotlin
val languages: List<String> = listOf("Kotlin", "Java", "Python")
println(languages[0])  // Acessa o primeiro elemento
println(languages.size) // Tamanho da lista
```

#### List mutável

Uma lista mutável permite adicionar ou remover elementos:

```kotlin
val mutableLanguages: MutableList<String> = mutableListOf("Kotlin", "Java")
mutableLanguages.add("Python")  // Adiciona um novo elemento
mutableLanguages.remove("Java") // Remove o elemento "Java"
println(mutableLanguages)
```

### Set

Um `Set` é uma coleção que não permite elementos duplicados. Assim como nas listas, os conjuntos podem ser mutáveis ou
imutáveis.

#### Set imutável

```kotlin
val uniqueNumbers: Set<Int> = setOf(1, 2, 3, 3)  // "3" é ignorado por ser duplicado
println(uniqueNumbers)
```

#### Set mutável

```kotlin
val mutableSet: MutableSet<Int> = mutableSetOf(1, 2, 3)
mutableSet.add(4)
mutableSet.remove(2)
println(mutableSet)
```

### Map

Um `Map` é uma coleção de pares chave-valor. As chaves em um `Map` devem ser únicas.

#### Map imutável

```kotlin
val userRoles: Map<String, String> = mapOf("admin" to "Administrator", "user" to "Regular User")
println(userRoles["admin"])  // Acessa o valor correspondente à chave "admin"
```

#### Map mutável

```kotlin
val mutableMap: MutableMap<String, String> = mutableMapOf("admin" to "Administrator")
mutableMap["user"] = "Regular User"  // Adiciona um novo par chave-valor
mutableMap.remove("admin")           // Remove o par com chave "admin"
println(mutableMap)
```

### Operações

Kotlin oferece várias funções de extensão para realizar operações comuns em coleções, como filtragem, mapeamento e
redução.

#### Filtrando

A função `filter` permite criar uma nova coleção com base em um critério:

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
val evenNumbers = numbers.filter { it % 2 == 0 }
println(evenNumbers)  // [2, 4]
```

#### Mapeando

A função `map` permite transformar os elementos de uma coleção:

```kotlin
val numbers = listOf(1, 2, 3)
val squaredNumbers = numbers.map { it * it }
println(squaredNumbers)  // [1, 4, 9]
```

#### Redução

A função `reduce` combina todos os elementos da coleção em um único valor:

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
val sum = numbers.reduce { acc, number -> acc + number }
println(sum)  // 15
```

#### Operação `groupBy`

A função `groupBy` agrupa os elementos da coleção em um mapa, com base em um critério:

```kotlin
val words = listOf("one", "two", "three", "four", "five")
val groupedByLength = words.groupBy { it.length }
println(groupedByLength)  // {3=[one, two], 4=[four, five], 5=[three]}
```

### Outras funções úteis

#### `first` e `last`

Essas funções retornam o primeiro e o último elemento de uma coleção, respectivamente:

```kotlin
val numbers = listOf(1, 2, 3)
println(numbers.first())  // 1
println(numbers. last())   // 3
```

#### `find`

A função `find` retorna o primeiro elemento que corresponde ao critério:

```kotlin
val numbers = listOf(1, 2, 3, 4)
val firstEven = numbers.find { it % 2 == 0 }
println(firstEven)  // 2
```

#### `any` e `all`

- `any` retorna `true` se pelo menos um elemento da coleção corresponde ao critério.
- `all` retorna `true` se todos os elementos da coleção correspondem ao critério.

```kotlin
val numbers = listOf(1, 2, 3, 4)
println(numbers.any { it > 3 })  // true
println(numbers.all { it < 5 })  // true
```

#### `count`

A função `count` retorna o número de elementos que correspondem ao critério:

```kotlin
val numbers = listOf(1, 2, 3, 4)
println(numbers.count { it % 2 == 0 })  // 2
```

> É importante lembrar que Kotlin incentiva o uso de coleções imutáveis (`List`, `Set`, `Map`) sempre que possível, pois
> isso ajuda a garantir a segurança do código e evita efeitos colaterais. Utilize coleções mutáveis (`MutableList`,
`MutableSet`, `MutableMap`) apenas quando for necessário modificar o conteúdo da coleção.

<br>

Ir para [classes e objetos](CLASSES_OBJECTS.md).

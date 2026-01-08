# Null Safety e operadores seguros

Kotlin tem um sistema robusto de segurança contra valores nulos, o que ajuda a evitar erros comuns, como
`NullPointerException` (NPE). Aqui está uma visão geral de como Kotlin lida com valores nulos e os operadores seguros
que você pode usar.

### Tipos nulos

Por padrão, todas as variáveis em Kotlin são não nulas, ou seja, você não pode atribuir `null` a elas. Para declarar uma
variável que pode ser `null`, você deve definir explicitamente o tipo da variável com o sufixo `?`:

```kotlin
val nonNullable: String = "Kotlin"  // Variável não nula
val nullable:  String? = null       // Variável que pode ser nula
```

### Operador seguro de chamada `?.`

O operador `?.` é usado para acessar propriedades ou métodos de um objeto que pode ser nulo, sem lançar uma exceção de
ponteiro nulo. Se a variável for `null`, a chamada será ignorada e o resultado será `null`:

```kotlin
val length:  Int? = nullable?.length  // Se 'nullable' for null, o resultado será null
```

### Operador elvis `?:`

O operador Elvis `?:` é usado para fornecer um valor padrão caso a expressão à esquerda seja `null`. É muito útil para
evitar retornos `null`:

```kotlin
val lengthOrZero:  Int = nullable?.length ?: 0  // Retorna 0 se 'nullable' for null
```

### Operador `!!` (forçar nulo)

O operador `!!` é usado quando você tem certeza de que uma variável não será nula, mesmo que seu tipo permita `null`.
Ele lança uma exceção `NullPointerException` se a variável for `null`:

```kotlin
val length: Int = nullable!!.length  // Lança NPE se 'nullable' for null
```

Use o operador `!!` com cuidado, pois ele anula as verificações de segurança contra nulos de Kotlin.

### Função `let`

A função `let` é frequentemente usada com o operador seguro `?.` para executar um bloco de código apenas se a variável
não for `null`:

```kotlin
nullable?.let {
    println("O comprimento da string é: ${it.length}")
}
```

Neste exemplo, o bloco dentro de `let` só será executado se `nullable` não for `null`.

### Verificações de nulo com `if`

Você pode verificar se uma variável é `null` usando uma expressão `if`, e o compilador de Kotlin automaticamente infere
que a variável não é mais `null` dentro do bloco `if`:

```kotlin
if (nullable != null) {
    println("A variável não é nula.  Comprimento: ${nullable.length}")
} else {
    println("A variável é nula.")
}
```

Aqui está um exemplo que usa vários operadores seguros para trabalhar com variáveis que podem ser nulas:

```kotlin
fun main() {
    val nullableString: String? = "Kotlin"

    // Operador seguro de chamada
    println(nullableString?.length)

    // Operador Elvis
    val lengthOrZero:  Int = nullableString?.length ?: 0
    println(lengthOrZero)

    // Operador !!  (forçar nulo)
    val forcedLength: Int = nullableString!!.length
    println(forcedLength)

    // Usando let para evitar verificações nulas
    nullableString?.let {
        println("O comprimento da string é: ${it.length}")
    }

    // Verificação de nulo com if
    if (nullableString != null) {
        println("A string não é nula. Comprimento: ${nullableString.length}")
    } else {
        println("A string é nula.")
    }
}
```

Exemplo completo:

```kotlin
fun main() {
    val nullableString: String? = "Kotlin"

    println(nullableString?.length)

    val lengthOrZero:  Int = nullableString?.length ?: 0
    println(lengthOrZero)

    val forcedLength: Int = nullableString!!.length
    println(forcedLength)

    nullableString?.let {
        println("O comprimento da string é: ${it.length}")
    }

    if (nullableString != null) {
        println("A string não é nula. Comprimento: ${nullableString.length}")
    } else {
        println("A string é nula.")
    }
}
```

_Você pode testar esse código [online](https://pl.kotl.in/KA-ndJbeA)._

<br>

Ir para o [início](https://github.com/gustavofreze/kotlin4noobs#Roadmap).

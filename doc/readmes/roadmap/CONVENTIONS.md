# Convenções de Codificação

Em Kotlin, seguir as convenções de codificação é essencial para garantir legibilidade e consistência. Elas também
facilitam a colaboração em equipe e a manutenção de código. Aqui estão algumas recomendações atualizadas e expandidas
baseadas nas melhores práticas da linguagem.

### Nomes de variáveis e funções

Prefira camelCase para nomes de variáveis e funções, iniciando com letra minúscula.
Use nomes descritivos e claros. **Evite acrônimos e abreviações não significativas**.

```kotlin
val userAge = 25
```

```kotlin
fun calculateAverage(scores: List<Double>): Double {
    // ...
}
```

### Nomes de classes e tipos

Classes e tipos devem usar UpperCamelCase. **Evite acrônimos e abreviações não significativas**.

```kotlin
class Person {
    // ...
}
```

```kotlin
typealias NameList = List<String>
```

### Indentação e espaçamento

Utilize 4 espaços para indentar seu código.
Use uma linha em branco entre funções e blocos de código.

```kotlin
fun calculateAverage(scores: List<Double>): Double {
    var sum = 0.0
    for (score in scores) {
        sum += score
    }

    return sum / scores.size
}
```

### Constantes

Constantes devem ser nomeadas em maiúsculas, com palavras separadas por sublinhados.

```kotlin
const val MAX_SIZE = 100
```

### Importações

Evite o uso de importações curinga (`*`). Prefira importar apenas as classes que realmente serão utilizadas para
evitar
ambiguidade e melhorar a legibilidade.
<br/><br/>
**Exemplo de má prática (usando importação curinga)**:

  ```kotlin
  import kotlin.math.*
import java.util.*
  ```

- Não está claro quais funções ou classes estão sendo utilizadas a partir de cada pacote.
- Pode causar conflitos de nomes ou comportamentos inesperados, especialmente em pacotes grandes.
- Compilação mais lenta, já que o compilador precisa resolver todas as classes e funções do pacote, mesmo que você não
  as use.
  <br/><br/>
  **Exemplo de boa prática (importando apenas o necessário)**:

  ```kotlin
  import kotlin.math.sqrt
  import kotlin.math.pow
  import java.util.Date
  import java.util.Calendar
  ```

- Fica explícito o que está sendo utilizado, facilitando a compreensão do código.
- Evita a inclusão desnecessária de classes, tornando o código mais eficiente e fácil de manter.

### Manuseio de exceções

Use `try-catch-finally` para capturar exceções. Evite capturar exceções genéricas como `Exception` se puder capturar
exceções mais específicas.

```kotlin
try {
    // Executa o código que pode lançar exceções.
} catch (exception: IOException) {
    // Tratamento específico para IOException.
} finally {
    // Bloco finally, executado sempre, com ou sem exceção.
}
```

### Parâmetros e modificadores

Respeite a ordem: primeiro parâmetros obrigatórios, depois os opcionais.
Use modificadores em uma ordem lógica. Por exemplo, `public` sempre vem primeiro.

```kotlin
fun exampleFunction(required: String, optional: Int = 0): Unit {
    // ...
}
```

### Uso de lambdas

Prefira passar lambdas fora dos parênteses quando a última função de uma chamada for um lambda.

  ```kotlin
  list.filter { it > 10 }
  ```

Use espaço ao redor das chaves de um lambda e ao redor da seta que separa parâmetros do corpo da função.

```kotlin
val sum = { firstNumber: Int, secondNumber: Int -> firstNumber + secondNumber }
```

### Fluxo de controle

Sempre utilize chaves em estruturas de controle, mesmo para blocos de uma linha, para evitar erros.

```kotlin
if (number > 0) {
    println("Número positivo")
} else {
    println("Número negativo")
}
```

### Corpos de funções e propriedades

Prefira funções de expressão única quando possível:

```kotlin
fun isEven(number: Int): Boolean = number % 2 == 0
```

Para propriedades simples, use `get` e `set` em uma linha:

```kotlin
val isEmpty: Boolean get() = size == 0
```

<br>

Ir para o [início](https://github.com/gustavofreze/kotlin4noobs#Roadmap).

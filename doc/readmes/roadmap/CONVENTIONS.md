# Convenções de codificação

Em Kotlin, convenções de codificação são diretrizes recomendadas para padronizar como o código é escrito. Essas
convenções visam melhorar a legibilidade, manutenção e colaboração entre os desenvolvedores. Aqui estão algumas das
principais convenções de codificação para Kotlin:

* [Nomes de variáveis e funções](#functions)
* [Nomes de classes e tipos](#class)
* [Indentação e espaçamento](#indentation)
* [Constantes](#constants)
* [Importações](#imports)

<div id='functions'></div>

## Nomes de variáveis e funções

Utilize nomes descritivos e significativos para as variáveis e funções. Prefira nomes em camelCase, começando com letra
minúscula.

```kotlin
val userAge = 25
```

```kotlin
fun calculateAverage(scores: List<Double>): Double {
    // ...
}
```

<div id='class'></div>

## Nomes de classes e tipos

Utilize nomes em UpperCamelCase para as classes e tipos. Evite acrônimos e abreviações não significativas.

```kotlin
class Person {
    // ...
}
```

```kotlin
typealias NameList = List<String>
```

<div id='indentation'></div>

## Indentação e espaçamento

Utilize espaços para melhorar a legibilidade do código. Indente o código com 4 espaços e adicione uma linha vazia entre
as funções e blocos de código relacionados.

```kotlin
fun calculateAverage(scores: List<Double>): Double {
    var sum = 0.0
    for (score in scores) {
        sum += score
    }

    return sum / scores.size
}
```

<div id='constants'></div>

## Constantes

Utilize nomes em maiúsculas para constantes. Se o nome for composto, utilize sublinhados para separar as palavras.

```kotlin
const val RED = "red"
const val MAX_SIZE = 100
```

<div id='imports'></div>

## Importações

Evite importar classes ou pacotes desnecessários. Utilize importações específicas em vez de
importações curinga (wildcard).

```kotlin
import java.util.List
import kotlin.math.sqrt
```

<br>

Ir para o [início](https://github.com/gustavofreze/kotlin4noobs#Roadmap).

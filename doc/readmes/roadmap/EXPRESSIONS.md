# Expressões condicionais

### If

Em Kotlin, `if` é uma expressão, e retorna um valor. Por isso, não há necessidade de um operador ternário, pois `if`
pode ser usado diretamente:

```kotlin
var value = 1
val otherValue = 5

if (2 < otherValue) value = otherValue
```

Com `else`:

```kotlin
val firstValue = 1
val secondValue = 2

if (firstValue >= secondValue) {
    println("$firstValue")
} else {
    println("$secondValue")
}
```

_Você pode testar esse código [online](https://pl.kotl.in/URiwC3jLx)._

Uma expressão `if` pode ser usada em blocos. Nesse caso, a última expressão é o valor do bloco:

```kotlin
val firstValue = 1
val secondValue = 2

val maxValue = if (firstValue > secondValue) firstValue else secondValue
```

_Você pode testar esse código [online](https://pl.kotl.in/848r8GHUT)._

**Nota**
> Quando usar `if` como expressão para retornar ou atribuir valores, o uso de `else` é obrigatório para garantir que o
> fluxo sempre tenha um resultado.

<div id='when'></div> 

### When

Em Kotlin, `when` é uma expressão condicional com várias ramificações, semelhante à instrução `switch` em outras
linguagens como PHP. O `when` avalia seu argumento e compara com as condições de cada ramificação até que uma seja
satisfeita:

```kotlin
val value = 3

val result = when (value) {
    1 -> "Primeira condição."
    2 -> "Segunda condição."
    else -> "Condição padrão (else)."
}
```

_Você pode testar esse código [online](https://pl.kotl.in/Ivu64vLKM)._

O `when` também suporta _ranges_ nas condições:

```kotlin
val randomValue = (1..1001).random()

val result = when (randomValue) {
    in 1..100 -> "O valor <$randomValue> está entre 1 e 100."
    in 101..1000 -> "O valor <$randomValue> está entre 101 e 1000."
    else -> "O valor <$randomValue> é maior que 1000."
}
```

_Você pode testar esse código [online](https://pl.kotl.in/NfoUhTTrZ)._

O `when` pode ser usado tanto como uma expressão quanto como uma instrução. Se usado como expressão, o valor da primeira
condição correspondida será o valor da expressão. Se usado como instrução, os valores das ramificações individuais serão
ignorados. Assim como no `if`, cada ramificação pode ser um bloco, e o valor da última expressão no bloco será o valor
retornado.

<br>

Ir para [exceções](EXCEPTIONS.md).

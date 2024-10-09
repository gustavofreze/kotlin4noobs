# Loops

### For

O loop `for` itera sobre qualquer coisa que forneça um iterador. Você tem várias opções para realizar loops usando a
estrutura `for`.

#### Loop sobre um intervalo de valores

```kotlin
for (index in 1..10) {
    // ...
}
```

Neste caso, o loop será executado para os valores de `index` de 1 a 10 (inclusive).

_Você pode testar esse código [online](https://pl.kotl.in/PgBqGYNTL)._

#### Loop decrescente

```kotlin
for (index in 10 downTo 1) {
    // ...
}
```

Aqui, o loop será executado para os valores de `index` de 10 a 1 (inclusive), em ordem decrescente.

_Você pode testar esse código [online](https://pl.kotl.in/WwyJmmj1_)._

#### Loop com passo personalizado

```kotlin
for (index in 0 until 10 step 2) {
    // ...
}
```

Nesse exemplo, o loop será executado para os valores de `index` de 0 a 10 (exclusive), com um `step` de 2. Ou seja, o
valor de `index` será 0, 2, 4, 6, 8.

_Você pode testar esse código [online](https://pl.kotl.in/obdSr37me)._

#### Loop sobre uma coleção

```kotlin
val values = arrayOf(1, 2, 3)

for (value in values) {
    // ...
}
```

O loop será executado para cada elemento da coleção `values`.

_Você pode testar esse código [online](https://pl.kotl.in/kNUVVz1d8)._

### While e do-while

Os loops `while` e `do-while` executam repetidamente enquanto a condição for verdadeira. A principal diferença entre
eles é o momento em que a condição é verificada.

#### While

Verifica a condição antes de executar o corpo do loop. Se a condição for satisfeita, o corpo é executado e, então, a
condição é verificada novamente:

```kotlin
var value = 2

while (value > 0) {
    println(value)
    value--
}
```

_Você pode testar esse código [online](https://pl.kotl.in/9YvYZcpQq)._

#### Do-while

Executa o corpo do loop pelo menos uma vez, independentemente da condição, e só depois verifica a condição:

```kotlin
var value = 2

do {
    println(value)
    value--
} while (value > 0)
```

_Você pode testar esse código [online](https://pl.kotl.in/5cfV9SsAE)._

<br>

Ir para [classes e objetos](CLASS.md).

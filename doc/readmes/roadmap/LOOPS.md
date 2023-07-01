# Loops

* [For](#for)
* [While](#while)

<div id='for'></div> 

## For

O loop `for` itera qualquer coisa que forneça um iterador. Você tem algumas opções para fazer loops utilizando a
estrutura `for`.

Loop sobre um intervalo de valores:

```kotlin
for (index in 1..10) {
    // ...
}
```

O loop será executado para valores de `index` de 1 a 10 (inclusive).

_Você pode testar esse código [online](https://pl.kotl.in/mvOthvBzL)._

Loop decrescente:

```kotlin
for (index in 10 downTo 1) {
    // ...
}
```

_Você pode testar esse código [online](https://pl.kotl.in/NngxOcNLB)._

O loop será executado para valores de `index` de 10 a 1 (inclusive), em ordem decrescente.

Loop com passo personalizado:

```kotlin
for (index in 0 until 10 step 2) {
    // ...
}
```

Aqui, o loop será executado para valores de `index` de 0 a 10 (exclusive), com um `step` de 2.
Ou seja, o valor de `index` será 0, 2, 4, 6, 8.

_Você pode testar esse código [online](https://pl.kotl.in/Ypn29BUAS)._

Loop sobre uma coleção:

```kotlin
val values = arrayOf(1, 2, 3)

for (value in values) {
    //...
}
```

O loop será executado para cada elemento da lista.

_Você pode testar esse código [online](https://pl.kotl.in/PCqBZQG9E)._

<div id='while'></div> 

## While

Os loops `while` e `do-while` executam continuamente enquanto sua condição é satisfeita. A diferença entre
eles é o tempo de verificação de condição.

### While

Verifica a condição e, se for satisfeita, executa o corpo e retorna à verificação de condição:

```kotlin
var value = 2

while (value > 0) {
    println(value)
    value--
}
```

_Você pode testar esse código [online](https://pl.kotl.in/-2BPqA0uf)._

### Do-while

Executa o corpo, e, em seguida, verifica a condição. Se estiver satisfeito, o loop se repete. Assim, o corpo
de `do-while` executa pelo menos uma vez, independentemente da condição:

```kotlin
var value = 2

do {
    println(value)
    value--
} while (value > 0)
```

_Você pode testar esse código [online](https://pl.kotl.in/KphDdxhcj)._

<br>

Ir para [classes e objetos](CLASS.md).

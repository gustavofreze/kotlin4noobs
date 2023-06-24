# Loops

* [For](#for)
* [While](#while)

<div id='for'></div> 

## For

O loop `for` itera qualquer coisa que forneça um iterador. Isso é equivalente ao
loop [foreach](https://github.com/DanielHe4rt/php4noobs/blob/master/3-Basico/14-Estruturas-de-controle-loops.md#repeti%C3%A7%C3%A3o-foreach)
em linguagens como PHP:

```kotlin
val values = arrayOf(1, 2, 3)

for (value in values) {
    //...
}
```

_Você pode testar esse código [online](https://pl.kotl.in/WaFWomLtB)._

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

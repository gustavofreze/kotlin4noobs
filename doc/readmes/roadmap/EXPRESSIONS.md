# Expressões condicionais

* [If](#if)
* [When](#when)

<div id='if'></div> 

## If

Em Kotlin, `if` é uma expressão, e ela retorna um valor. Portanto, não há operador ternário, dado que o operador
ordinário funciona bem nessa função:

```kotlin

var value = 1
val other = 5

if (2 < other) value = other
```

Com else:

```kotlin

val value = 1
val other = 2

if (value >= other) {
    println("$value")
} else {
    println("$other")
}
```

Uma expressão `if` podem ser usada em blocos. Neste caso, a última expressão é o valor de um bloco:

```kotlin

val value = 1
val other = 2

val max = if (value > other) {
    println("$value")
    value
} else {
    println("$other")
    other
}
```

**Nota**
> Se estiver usando `if` como expressão, por exemplo, para retornar seu valor ou atribuí-lo a uma variável, o `else` é
> obrigatório.

<div id='when'></div> 

## When

Em Kotlin, `when` é uma expressão que define uma expressão condicional com várias ramificações. É semelhante à instrução
[switch](https://github.com/DanielHe4rt/php4noobs/blob/master/3-Basico/13-Estruturas-de-controle-cond.md#condi%C3%A7%C3%A3o-switch-case)
em linguagens como o PHP. O `when` corresponde seu argumento a todas as ramificações sequencialmente até que alguma
condição de ramificação seja satisfeita:

```kotlin

val value = 3

when (value) {
    1    -> println("O valor é: 1")
    2    -> println("O valor é: 2")
    else -> println("O valor é: $value")
}
```

O `when` pode ser usado como uma expressão ou como uma instrução. Se for usado como uma expressão, o valor da primeira
ramificação correspondente se tornará o valor da expressão geral. Se for usado como uma instrução, os valores de
ramificações individuais serão ignorados. Assim como com if, cada ramificação pode ser um bloco e seu valor é o valor da
última expressão do bloco.

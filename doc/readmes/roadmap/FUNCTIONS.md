# Funções

Em Kotlin, as funções são declaradas usando a palavra-chave `fun`:

```kotlin
fun add() {
    //...
}
```

Você pode definir parâmetros para a função usando a notação _Pascal_, `name : type`. Os parâmetros são separados
por vírgulas e cada parâmetro deve ser digitado explicitamente:

```kotlin
fun add(augend: Int, addend: Int): Int {
    return augend + addend
}
```

Quando uma função retorna uma única expressão, as chaves podem ser omitidas e o corpo é especificado após um `=`:

```kotlin
fun add(augend: Int, addend: Int): Int = augend + addend
```

Para fazer a chamada da função:

```kotlin
add(1, 1)
```

ou usando argumentos nomeados:

```kotlin
add(augend = 1, addend = 1)
```

_Você pode testar esse código [online](https://pl.kotl.in/fuB8CNime)._

**Nota**
> Usar argumentos nomeados pode ser útil quando uma função tem muitos argumentos e é difícil associar um valor a um
> argumento.

<br>

Ir para [variáveis](VARIABLES.md).

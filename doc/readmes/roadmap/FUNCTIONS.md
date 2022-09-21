# Funções

* [Sintaxe](#sintaxe)
* [Extensions](#extensions)

<div id='sintaxe'></div>

## Sintaxe

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

<div id='extensions'></div>

## Extensions

É comum alguma hora querermos adicionar uma funcionalidade a mais em algum objeto. 

Pensando nisso, o Kotlin possui o que chamamos de `extension functions`, que é uma forma de adicionarmos novos comportamentos em algum objeto sem precisarmos fazer alguma modificação no objeto em si ou criar um novo objeto com o novo comportamento.

Para criarmos uma extension function, utilizamos a sintaxe:

```kotlin
fun ClassName.newFunctionName(arguments...) {
    // ...
}
```

Agora vamos extender uma função chamada `screaming` na classe `String`, onde ela irá retornar a própria String em maiúscula 
e com três pontos de exclamação no final:

```kotlin
fun String.screaming(): String = this.uppercase() + "!!!"

"Hello World".screaming() // "HELLO WORLD!!!"
```

_Você pode testar esse código [online](https://pl.kotl.in/9frrrEcb1)._

**Nota**
> Como a função faz parte do contexto String, temos acesso ao this, que neste caso está correspondendo a própria String.

<br>

Ir para [variáveis](VARIABLES.md).

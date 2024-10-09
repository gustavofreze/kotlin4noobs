# Variáveis

Em Kotlin, as variáveis podem ser declaradas utilizando duas palavras-chave: `val` ou `var`. Ambas são usadas para
armazenar dados, mas com comportamentos diferentes em relação à mutabilidade.

### Val

Use `val` quando a variável não pode ser alterada após sua inicialização, ou seja, quando o valor atribuído será
imutável:

```kotlin
val name: String = "Kotlin"
```

Nesse exemplo, a variável `name` foi inicializada com o valor "Kotlin" e não pode ser reatribuída a outro valor
posteriormente. Isso serve para garantir que o valor de uma variável permaneça constante.

### Var

Use `var` quando a variável puder ser alterada após a inicialização, ou seja, quando for necessário atribuir novos
valores ao longo do tempo:

```kotlin
var name: String = "Kotlin"
name = "Kotlin 123" // Reatribuição de valor
```

Aqui, `name` é mutável e seu valor pode ser modificado quantas vezes forem necessárias.

### Escopos de Variáveis

As variáveis em Kotlin podem ser declaradas em diferentes escopos, como local ou global. Isso significa que o acesso a
uma variável pode depender de onde ela foi definida.

### Exemplo de escopo local e global

Neste exemplo, `name` é uma variável de nível de classe (global dentro da classe), enquanto `template` é uma variável
local, visível apenas dentro do método `register`:

```kotlin
class Language {
    val name = "Kotlin"  // Variável de nível global na classe

    fun register() {
        val template = "Language: <%s>."
        println(template.format(name))  // Uso da variável local e global
    }
}
```

A variável `name` pode ser acessada em qualquer parte da classe e fora dela se a classe for instanciada. Já a variável
`template` só pode ser utilizada dentro da função `register`:

```kotlin
val language = Language()

println(language.name)  // Acessando a variável global 'name'
language.register()     // Acessando a variável local 'template' dentro da função
```

_Você pode testar esse código [online](https://pl.kotl.in/8PJa4lWr3)._

> Sempre que possível, prefira usar `val` em vez de `var`, pois isso promove imutabilidade no código, o que pode evitar
> bugs e facilitar a manutenção.
> Defina as variáveis com o escopo mais restrito possível. Isso ajuda a limitar o acesso e a evitar interferências
> acidentais no valor.

<br>

Ir para [tipos de dados](TYPES.md).

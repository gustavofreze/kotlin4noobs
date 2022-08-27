# Classes e objetos

* [Class](#class)
* [Data class](#data-class)
* [Abstract class](#abstract-class)
* [Objects](#objects)

<div id='class'></div> 

## Class

As classes em Kotlin são declaradas usando a palavra-chave `class`:

```kotlin
class Person {
    //...
}
```

A declaração de classe consiste no nome da classe, no cabeçalho da classe (especificando seus parâmetros de tipo, o
construtor primário e algumas outras coisas) e o corpo da classe entre chaves. Tanto o cabeçalho quanto o corpo são
opcionais, se a classe não tiver corpo, as chaves podem ser omitidas:

```kotlin
class Person
```

Propriedades em classes Kotlin podem ser declaradas como mutáveis, usando a palavra-chave `var`,
ou como somente leitura, usando a palavra-chave `val`:

```kotlin
class Person {
    val age: Int
    var name: String = "Desconhecido"
}
```

Para declarar uma instância dessa classe, basta fazer:

```kotlin
val person = Person(25, "Gustavo")
```

ou usando argumentos nomeados:

```kotlin
val person = Person(age = 25, name = "Gustavo")
```

<div id='data-class'></div> 

## Data class

Não é incomum criar classes cujo objetivo principal seja armazenar dados, como,
[DTOs](https://pt.wikipedia.org/wiki/Objeto_de_Transfer%C3%AAncia_de_Dados).
Em Kotlin, elas são chamadas de classes de dados e são declaradas usando a palavra-chave `data`:

```kotlin
data class Person(val age: Int, var name: String = "Desconhecido")
```

O compilador deriva automaticamente os seguintes membros de todas as propriedades declaradas no construtor primário:
`equals`, `hashCode`, `toString` e `copy`.

Para garantir consistência e comportamento significativo do código gerado, as classes de dados devem atender aos
seguintes requisitos:

- O construtor primário precisa ter pelo menos um parâmetro.
- Todos os parâmetros do construtor primário precisam ser marcados como `val` ou `var`.
- As classes de dados não podem ser abstratas, abertas, seladas ou internas.

Para declarar uma instância dessa classe, basta fazer:

```kotlin
val person = Person(age = 25, name = "Gustavo")
```

ou usando argumentos nomeados:

```kotlin
val person = Person(age = 25, name = "Gustavo")
```

<div id='abstract-class'></div> 

## Abstract class

As classes em Kotlin podem ser abstratas, basta declara-las usando a palavra-chave `abstract`:

```kotlin
abstract class Customer {

    abstract fun register()
}
```

E na classe que você deseja que estenda a classe abstrata, basta fazer:

```kotlin
class Person(val age: Int, var name: String = "Desconhecido") : Customer() {

    override fun register() {
        //...
    }
}
```

<div id='objects'></div> 

## Objects

Em Kotlin podemos fazer a declaração de objetos que fazem a implementação do
padrão [singleton](https://pt.wikipedia.org/wiki/Singleton), basta declarar a palavra-chave `object`:

```kotlin
object Environment {

    fun get(variable: String): String {
        val template = "A variável de ambiente <%s> está ausente."

        return getenv(variable) ?: error(template.format(variable))
    }
}
```

Para se referir ao objeto, use seu nome diretamente:

```kotlin
Environment.get("KOTLIN")
```

Ir para [expressões condicionais](EXPRESSIONS.md).

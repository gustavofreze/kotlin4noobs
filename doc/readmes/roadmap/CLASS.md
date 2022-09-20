# Classes e objetos

* [Class](#class)
* [Data class](#data-class)
* [Enum class](#enum-class)
* [Abstract class](#abstract-class)
* [Objects](#objects)
* [Interfaces](#interfaces)

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
class Person(val age: Int, val name: String)
```

Para declarar uma instância dessa classe, basta fazer:

```kotlin
val person = Person(25, "Gustavo")
```

ou usando argumentos nomeados:

```kotlin
val person = Person(age = 25, name = "Gustavo")
```

Por padrão, toda classe que criamos não é aberta para ser herdada por outra,
então, precisamos usar a palavra-chave `open` para que a herança seja permitida:

```kotlin
open class Person(val age: Int, val name: String)

class Driver(age: Int, name: String, val license: String) : Person(age, name)
```

_Você pode testar esse código [online](https://pl.kotl.in/swgTEKOFu)._

<div id='data-class'></div> 

## Data class

Não é incomum criar classes cujo objetivo principal seja armazenar dados, como,
[DTOs](https://pt.wikipedia.org/wiki/Objeto_de_Transfer%C3%AAncia_de_Dados).
Em Kotlin, elas são chamadas classes de dados sendo declaradas usando a palavra-chave `data`:

```kotlin
data class Person(val age: Int, val name: String)
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

_Você pode testar esse código [online](https://pl.kotl.in/4W4PATUVR)._

<div id='enum-class'></div> 

## Enum class

As classes do tipo enum em Kotlin são declaradas usando a palavra-chave `enum`:

```kotlin
enum class Type {
    CUSTOMER,
    EMPLOYEE
}
```

Cada constante enum é um objeto. As constantes de enumeração são separadas por vírgulas. Como cada enum é uma instância
da classe enum, ele pode ser inicializado como:

```kotlin
enum class Type(val value: Int) {
    CUSTOMER(1),
    EMPLOYEE(2)
}
```

_Você pode testar esse código [online](https://pl.kotl.in/00-YikxBE)._

As constantes de enumeração podem declarar suas próprias classes anônimas com seus métodos correspondentes, bem como
substituir os métodos base:

```kotlin
enum class Type {
    CUSTOMER {
        override fun register() = CUSTOMER
    },

    EMPLOYEE {
        override fun register() = EMPLOYEE
    };

    abstract fun register(): Type
}
```

_Você pode testar esse código [online](https://pl.kotl.in/R8LU2li0v)._

**Nota**
> Uma classe enum pode implementar uma interface, mas não pode derivar de uma classe, fornecendo uma implementação
> comum de membros de interface para todas as entradas ou implementações separadas para cada entrada dentro de sua
> classe anônima. Isso é feito adicionando as interfaces que você deseja implementar à declaração da classe enum.

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
class Person(val age: Int, val name: String) : Customer() {

    override fun register() {
        println("Registrado %s, %s anos.".format(name, age))
    }
}
```

_Você pode testar esse código [online](https://pl.kotl.in/E2T0nDAiU)._

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

O Kotlin também nos permite criar o que é chamado de *Companion Object*, um objeto que fica dentro de uma classe, como no exemplo abaixo:

```kotlin
class Person(val name: String, val age: Int) {
    companion object {
        fun newborn(name: String) = Person(name, 0)
    }
}
```

O Companion Object nos dá a possibilidade de utilizarmos o método newborn através da classe Person sem precisarmos criar uma instância da mesma:

```kotlin
val enzo = Person.newborn("Enzo")
```

<div id='interfaces'></div> 

## Interfaces

Interfaces em Kotlin podem conter declarações de métodos abstratos, bem como implementações de métodos. O que as torna
diferentes das classes abstratas é que as interfaces não podem armazenar o estado. Eles podem ter propriedades, mas elas
precisam ser abstratas ou fornecer implementações de acessador.

Uma interface é definida usando a palavra-chave `interface`:

```kotlin
interface Customer {
    fun register()
}
```

Uma interface pode derivar de outras interfaces, o que significa que ela pode fornecer implementações para seus membros
e declarar novas funções e propriedades:

```kotlin
interface PremiumCustomer : Customer
```

Você pode declarar propriedades em interfaces. Uma propriedade declarada em uma interface pode ser abstrata ou fornecer
implementações para acessadores:

```kotlin
interface PremiumCustomer : Customer {
    val minimumLimit: Int
}
```

_Você pode testar esse código [online](https://pl.kotl.in/XPntbJUUm)._

O padrão [Delegation](https://en.wikipedia.org/wiki/Delegation_pattern) provou ser uma boa alternativa para a herança de
implementação, e o Kotlin o suporta nativamente. Uma classe `Person` pode implementar uma interface `Customer`
delegando todos os seus membros públicos a um
objeto especificado:

```kotlin
interface Customer {
    fun register()
}

class CustomerAdapter(val name: String) : Customer {

    override fun register() {
        println("Registrado %s.".format(name, age))
    }
}

class Person(customer: Customer) : Customer by customer
```

_Você pode testar esse código [online](https://pl.kotl.in/UE_2B6z0E)._

<br>

Ir para [expressões condicionais](EXPRESSIONS.md).

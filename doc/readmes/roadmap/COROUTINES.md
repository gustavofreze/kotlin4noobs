# Corrotinas

As coroutines do Kotlin são uma ótima ferramenta para lidar com concorrência e tarefas assíncronas de maneira simples e
eficiente.

É importante ressaltar que as coroutines do Kotlin são baseadas no conceito de suspensão, o que permite que uma função
seja pausada e retomada mais tarde, sem bloquear a thread em que está sendo executada. Isso é especialmente útil para
operações de I/O, como chamadas de rede, acesso a banco de dados ou interações com sistemas de arquivos.

```kotlin
@OptIn(DelicateCoroutinesApi::class)
fun execute() {
    GlobalScope.launch {
        delay(1000) // Simulando uma operação demorada
        println("Coroutine executada.")
    }

    println("A execução do programa continua enquanto a coroutine está sendo executada...")

    // Esperando a execução da coroutine finalizar
    Thread.sleep(2000)
}
```

_Você pode testar esse código [online](https://pl.kotl.in/qtfhJ71HM)._

Neste exemplo, usamos a função `launch` do `GlobalScope` para iniciar uma coroutine. Dentro dela, temos a
função `delay`, que pausa a execução por um determinado período (nesse caso, 1000 milissegundos) antes de imprimir
a mensagem "Coroutine executada.".

Observe que a execução do programa principal continua mesmo enquanto a coroutine está em execução. Para garantir que a
coroutine finalize antes de encerrar o programa, usamos `Thread.sleep(2000)` para aguardar por mais
2000 milissegundos (2 segundos) após a criação da coroutine.

Use com cuidado o `GlobalScope`, ele cria um escopo global para execução de corrotinas que não está associado a
nenhum componente específico da sua aplicação. Isso significa que as corrotinas lançadas no `GlobalScope` não estão
vinculadas ao ciclo de vida de nenhum objeto e podem continuar em execução mesmo depois que outras partes do seu
programa foram finalizadas. Sem um escopo apropriado, as corrotinas podem continuar executando em segundo plano,
consumindo recursos e causando problemas de gerenciamento de memória. Isso pode levar a travamentos, vazamento de
recursos e mau desempenho da aplicação.

Em vez disso, é recomendado criar e usar escopos de corrotinas mais específicos, como escopos de classe ou de função.

```kotlin
fun execute() = runBlocking {
    val coroutineScope = CoroutineScope(Dispatchers.Default)

    // Iniciando uma coroutine dentro do escopo.
    coroutineScope.launch {
        delay(1000)
        println("Coroutine executada.")
    }

    println("A execução do programa continua enquanto a coroutine está sendo executada...")

    // Esperando a execução da coroutine finalizar.
    delay(2000)
    coroutineScope.cancel() // Cancelando todas as coroutines dentro do escopo.
}
```

_Você pode testar esse código [online](https://pl.kotl.in/EuTXYOH2R)._

Nesse exemplo, usamos `runBlocking` para criar um escopo de coroutine dentro da função `execute`. Dentro desse escopo,
criamos uma instância de `CoroutineScope` e, em seguida, chamamos `launch` para iniciar a coroutine.

Note que chamamos `delay` e `println` diretamente dentro da coroutine. Além disso, utilizamos `delay` e `cancel` do
`coroutineScope`, em vez de `Thread.sleep`, para garantir a suspensão da coroutine e o cancelamento adequado das
tarefas.

As coroutines do Kotlin também suportam o conceito de _async/await_, que permite que você espere o resultado de uma
tarefa assíncrona.

```kotlin
fun execute() = runBlocking {
    val deferred = async { accountBalance() }
    val balance = deferred.await()
    val template = "O saldo da conta é: R$ %.2f."

    println(template.format(balance))
}

suspend fun accountBalance(): Double {
    delay(1000)
    
    return (100..10000).random().toDouble()
}
```

_Você pode testar esse código [online](https://pl.kotl.in/-nCIVfaPS)._

Nesse exemplo, usamos `async` para iniciar uma coroutine assíncrona que chama a função `accountBalance`. Essa
função pausa a execução por 1000 milissegundos e retorna um valor. Usando `await` em `deferred`, esperamos que a tarefa
assíncrona seja concluída e obtemos o resultado.

A palavra-chave `suspend` em Kotlin é usada para marcar funções que podem ser suspensas e retomadas posteriormente sem
bloquear a thread em que estão sendo executadas. No contexto de coroutines, a suspensão é uma forma eficiente de lidar
com operações assíncronas, como chamadas de rede, acesso a banco de dados e outras operações de I/O.

No exemplo em questão, a função `accountBalance` é marcada com `suspend` porque ela contém uma chamada para a
função `delay`, que é uma função suspensa das coroutines. A função `delay` pausa a execução da coroutine por um
determinado período, permitindo que a thread seja liberada para executar outras tarefas.

<br>

Ir para [convenções de codificação](CONVENTIONS.md).

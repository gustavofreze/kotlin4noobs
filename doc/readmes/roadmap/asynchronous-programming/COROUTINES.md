# Corrotinas

As coroutines do Kotlin são uma ferramenta poderosa para lidar com concorrência e tarefas assíncronas de maneira simples
e eficiente.

As coroutines se baseiam no conceito de suspensão, permitindo que uma função seja pausada e retomada posteriormente sem
bloquear a thread. Isso é extremamente útil para operações de I/O, como chamadas de rede, acesso a banco de dados ou
interação com sistemas de arquivos.

### GlobalScope

```kotlin
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

@OptIn(DelicateCoroutinesApi::class)
fun execute() {
    GlobalScope.launch {
        delay(1000) // Simulando uma operação demorada
        println("Coroutine executada.")
    }

    println("A execução do programa continua enquanto a coroutine está sendo executada...")

    // Esperando a execução da coroutine finalizar
    Thread.sleep(2000) // Não é recomendado em coroutines
}
```

Exemplo completo:

```kotlin
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.delay
import kotlinx. coroutines.launch

@OptIn(DelicateCoroutinesApi::class)
fun main() {
    GlobalScope.launch {
        delay(1000)
        println("Coroutine executada.")
    }

    println("A execução do programa continua enquanto a coroutine está sendo executada...")
    
    Thread.sleep(2000)
}
```

_Você pode testar esse código [online](https://pl.kotl.in/2OZ7AyKT0)._

> **Nota:** Evite usar `GlobalScope` a menos que necessário, pois ele cria coroutines que não são vinculadas ao ciclo de
> vida da aplicação, o que pode levar a vazamentos de memória e execução indesejada de coroutines em segundo plano.

### CoroutineScope com Dispatchers Default

Neste exemplo, usamos `CoroutineScope(Default)` para criar um escopo de coroutines que será executado no pool de threads
padrão (`Dispatchers.Default`). Isso oferece melhor controle sobre o ciclo de vida da coroutine.

```kotlin
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers. Default
import kotlinx.coroutines.cancel
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines. runBlocking

fun execute() = runBlocking {
    val defaultScope = CoroutineScope(Default)

    // Iniciando uma coroutine dentro do escopo. 
    defaultScope.launch {
        delay(1000)
        println("Coroutine executada.")
    }

    println("A execução do programa continua enquanto a coroutine está sendo executada...")

    // Esperando a execução da coroutine finalizar. 
    delay(2000)
    defaultScope.cancel() // Cancelando todas as coroutines dentro do escopo.
}
```

Exemplo completo:

```kotlin
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines. Dispatchers.Default
import kotlinx.coroutines.cancel
import kotlinx.coroutines. delay
import kotlinx.coroutines.launch
import kotlinx. coroutines.runBlocking

fun main() = runBlocking {
    val defaultScope = CoroutineScope(Default)

    defaultScope.launch {
        delay(1000)
        println("Coroutine executada.")
    }

    println("A execução do programa continua enquanto a coroutine está sendo executada...")
    
    delay(2000)
    defaultScope.cancel()
}
```

_Você pode testar esse código [online](https://pl.kotl.in/F1t0ei9xS)._

Aqui usamos `runBlocking` para bloquear o thread principal até que todas as coroutines dentro do `defaultScope` sejam
finalizadas e corretamente canceladas.

### Async/await

Coroutines no Kotlin também suportam o padrão `async/await`, permitindo que você espere pelo resultado de tarefas
assíncronas:

```kotlin
import kotlinx.coroutines.async
import kotlinx.coroutines.delay
import kotlinx.coroutines.runBlocking

fun execute() = runBlocking {
    val deferred = async { accountBalance() }
    val balance = deferred.await()
    val template = "O saldo da conta é: R$ %. 2f."

    println(template.format(balance))
}

suspend fun accountBalance(): Double {
    delay(1000)

    return (100.. 10000).random().toDouble()
}
```

Exemplo completo:

```kotlin
import kotlinx.coroutines.async
import kotlinx.coroutines.delay
import kotlinx.coroutines.runBlocking

suspend fun accountBalance(): Double {
    delay(1000)
    return (100..10000).random().toDouble()
}

fun main() = runBlocking {
    val deferred = async { accountBalance() }
    val balance = deferred. await()
    val template = "O saldo da conta é: R$ %.2f."
    
    println(template.format(balance))
}
```

_Você pode testar esse código [online](https://pl.kotl.in/YeCMV3YZK)._

Nesse exemplo, usamos `async` para executar a função `accountBalance`, que simula uma operação demorada com `delay` e
retorna um valor. A função `await` é usada para esperar a conclusão da coroutine.

> A palavra-chave `suspend` em Kotlin é usada para marcar funções que podem ser suspensas e retomadas sem bloquear a
> thread. É especialmente útil para lidar com operações assíncronas como chamadas de rede e acesso a banco de dados.
> Lembre-se de que coroutines não são gerenciadas automaticamente pelo ciclo de vida da aplicação. Para evitar problemas
> de gerenciamento de memória ou vazamentos de coroutines, sempre prefira escopos específicos em vez do `GlobalScope`.

<br>

Ir para o [início](https://github.com/gustavofreze/kotlin4noobs#Roadmap).

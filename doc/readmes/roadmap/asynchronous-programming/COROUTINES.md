# Corrotinas

As coroutines do Kotlin são uma ferramenta poderosa para lidar com concorrência e tarefas assíncronas de maneira simples
e eficiente.

As coroutines se baseiam no conceito de suspensão, permitindo que uma função seja pausada e retomada posteriormente sem
bloquear a thread. Isso é extremamente útil para operações de I/O, como chamadas de rede, acesso a banco de dados ou
interação com sistemas de arquivos.

As coroutines ficam na biblioteca `kotlinx.coroutines`, que precisa ser adicionada ao projeto. No Kotlin Playground ela
já está disponível.

### Iniciando uma coroutine

Uma coroutine sempre nasce dentro de um escopo. O `runBlocking` cria um escopo e bloqueia a thread atual até que todas
as coroutines dentro dele terminem, por isso é usado na função `main` e em testes. Dentro dele, `launch` inicia uma nova
coroutine:

```kotlin
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

fun main() = runBlocking {
    launch {
        delay(1000) // Suspende a coroutine sem bloquear a thread
        println("Coroutine executada.")
    }

    println("A execução do programa continua enquanto a coroutine está sendo executada...")
}
```

O `runBlocking` só termina depois que a coroutine iniciada com `launch` termina. Não é preciso esperar com
`Thread.sleep`.

### Concorrência estruturada

Toda coroutine pertence a um escopo, e um escopo só termina quando todas as suas coroutines terminam. Isso é chamado de
concorrência estruturada: nenhuma coroutine fica perdida em segundo plano, e um erro em uma delas cancela as outras do
mesmo escopo.

A função `coroutineScope` cria um escopo dentro de uma função de suspensão. As duas coroutines abaixo rodam ao mesmo
tempo, e a função só retorna quando as duas terminam:

```kotlin
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

suspend fun prepareBreakfast() = coroutineScope {
    launch {
        delay(1000)
        println("Café pronto.")
    }
    launch {
        delay(500)
        println("Pão pronto.")
    }
    println("Preparando o café da manhã...")
}

fun main() = runBlocking {
    prepareBreakfast()
    println("Café da manhã servido.")
}
```

Uma coroutine também pode ser cancelada pelo `Job` que o `launch` devolve:

```kotlin
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

fun main() = runBlocking {
    val job = launch {
        repeat(10) { step ->
            println("Processando a etapa $step...")
            delay(300)
        }
    }

    delay(1000)
    job.cancel() // Cancela a coroutine na próxima suspensão
    job.join() // Espera o cancelamento terminar
    println("Processamento cancelado.")
}
```

> **Nota:** Evite o `GlobalScope`. Ele cria coroutines que não pertencem a nenhum escopo, que não são canceladas junto
> com o resto do programa e que podem continuar executando em segundo plano. Por isso ele é marcado como
> `@DelicateCoroutinesApi`.

### Async/await

Quando a coroutine precisa devolver um resultado, use `async`. Ele devolve um `Deferred`, e `await` suspende até que o
resultado esteja pronto. Duas chamadas com `async` executam ao mesmo tempo:

```kotlin
import kotlinx.coroutines.async
import kotlinx.coroutines.delay
import kotlinx.coroutines.runBlocking

suspend fun checkingBalance(): Double {
    delay(1000) // Simulando uma chamada de rede
    return 1500.0
}

suspend fun savingsBalance(): Double {
    delay(1000)
    return 3500.0
}

fun main() = runBlocking {
    val checking = async { checkingBalance() }
    val savings = async { savingsBalance() }

    val total = checking.await() + savings.await()

    println("O saldo total é: R$ %.2f.".format(total)) // Leva cerca de 1 segundo, não 2
}
```

> A palavra-chave `suspend` marca funções que podem ser suspensas e retomadas sem bloquear a thread. Uma função `suspend`
> só pode ser chamada de dentro de uma coroutine ou de outra função `suspend`.

### Dispatchers

O dispatcher decide em quais threads a coroutine executa. Os mais comuns são:

- `Dispatchers.Default`: para trabalho que usa muita CPU, como cálculos e processamento de listas grandes.
- `Dispatchers.IO`: para operações que esperam por I/O, como arquivos, rede e banco de dados.

A função `withContext` executa um bloco em outro dispatcher e devolve o resultado, sem criar uma coroutine solta:

```kotlin
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withContext

suspend fun sumOfSquares(limit: Int): Long = withContext(Dispatchers.Default) {
    (1..limit).sumOf { it.toLong() * it }
}

fun main() = runBlocking {
    val result = sumOfSquares(1_000_000)
    println("Soma dos quadrados: $result")
}
```

<br>

Ir para o [início](https://github.com/gustavofreze/kotlin4noobs#topics).

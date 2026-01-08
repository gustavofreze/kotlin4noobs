# Exceções

As classes de exceções em Kotlin herdam a classe `Throwable`. Cada exceção tem uma mensagem, um rastreamento de pilha e
uma causa opcional.

### Lançando exceções

Para lançar um objeto de exceção, use a palavra-chave `throw`:

```kotlin
throw Exception("Exceção em Kotlin.")
```

> **Nota:** Sempre que uma exceção é lançada, a execução da função é interrompida até
> que a exceção seja capturada ou propague para o chamador.

### Tratamento de exceções

Para capturar uma exceção, use a expressão `try` e `catch`:

```kotlin
try {
    // Código que pode lançar uma exceção
} catch (exception: Exception) {
    // Tratamento da exceção
    println("Ocorreu um erro: ${exception.message}")
}
```

> **Nota:** Pode haver mais de um bloco `catch`, permitindo tratar diferentes tipos de exceções separadamente.

### Exemplo com múltiplos `catch`

```kotlin
try {
    // Código que pode lançar múltiplos tipos de exceção
} catch (exception: IOException) {
    // Tratamento específico para IOException
    println("Erro de I/O:  ${exception.message}")
} catch (exception: Exception) {
    // Tratamento genérico para outras exceções
    println("Erro inesperado: ${exception.message}")
} finally {
    // Bloco opcional que sempre será executado, com ou sem exceção
    println("Operação finalizada.")
}
```

O bloco `finally` é executado independentemente de uma exceção ser lançada ou não, e pode ser utilizado para liberar
recursos ou executar ações de limpeza.

### Exceções personalizadas

Kotlin permite que você crie suas próprias classes de exceções, herdando de `Throwable` ou de qualquer uma das
subclasses, como `Exception` ou `RuntimeException`:

```kotlin
class CustomException(message: String) : Exception(message)
```

```kotlin
throw CustomException(message = "Esta é uma exceção personalizada.")
```

Criar exceções personalizadas serve para representar erros específicos do domínio da sua aplicação.

<br>

Ir para [operadores seguros](NULL_SAFETY.md).

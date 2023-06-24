# Exceções

As classes de exceções em Kotlin herdam a classe `Throwable`. Cada exceção tem uma mensagem, um rastreamento de pilha e
uma causa opcional.

Para lançar um objeto de exceção, use a palavra-chave `throw`:

```kotlin
throw Exception("Exceção em Kotlin.")
```

Para capturar uma exceção, use a expressão `try` e `catch`:

```kotlin
try {
    // No bloco de try você executa sua lógica.
} catch (exception: Exception) {
    // Caso uma exceção seja lançada, você pode captura-lá aqui.
}
```

_Você pode testar esse código [online](https://pl.kotl.in/5xBQdFA7k)._

**Nota**
> Pode haver mais de um bloco `catch`.

<br>

Ir para [roadmap](../../../README.md#roadmap).

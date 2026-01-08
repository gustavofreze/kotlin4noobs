# Configurando ambiente de desenvolvimento Kotlin em ambientes Linux

Se você já possuir a JVM instalada, então, não é necessário fazer nada.

A várias maneiras de configurar o ambiente, e nesta seção escolhi utilizar o [SDK Man](https://sdkman.io).

- Para instalar o SDK Man, abra um novo terminal e execute:

    ```bash
    curl -s "https://get.sdkman.io" | bash
    ```

- Ao final da instalação, execute:
    ```bash
    source "$HOME/.sdkman/bin/sdkman-init.sh"
    ```

- Depois, verifique se a instalação foi bem-sucedida, executando:
    ```bash
    sdk version
    ```

- Com o SDK Man devidamente instalado, vamos "instalar" o Kotlin, executando:
    ```bash
    sdk install kotlin
    ```

- Depois, verifique se a variável de ambiente `KOTLIN_HOME` foi setada, executando:
    ```bash
    echo \$KOTLIN_HOME
    ```

<br>

Ir para o [início](https://github.com/gustavofreze/kotlin4noobs#Roadmap).

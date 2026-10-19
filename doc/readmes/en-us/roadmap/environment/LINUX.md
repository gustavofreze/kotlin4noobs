# Setting up a Kotlin development environment on Linux

If you already have the JVM installed, there is nothing you need to do.

There are several ways to set up the environment, and in this section I chose to use [SDK Man](https://sdkman.io).

- To install SDK Man, open a new terminal and run:

    ```bash
    curl -s "https://get.sdkman.io" | bash
    ```

- When the installation finishes, run:
    ```bash
    source "$HOME/.sdkman/bin/sdkman-init.sh"
    ```

- Then, check that the installation succeeded by running:
    ```bash
    sdk version
    ```

- With SDK Man properly installed, let's "install" Kotlin by running:
    ```bash
    sdk install kotlin
    ```

- Then, check that the `KOTLIN_HOME` environment variable was set by running:
    ```bash
    echo \$KOTLIN_HOME
    ```

<br>

Back to the [start](https://github.com/gustavofreze/kotlin4noobs#topics).

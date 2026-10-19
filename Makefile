# Container-first workflow. Every Node and pnpm command runs inside the node image, so nothing beyond Docker and
# GNU Make is installed on the host. The package.json scripts are the single source of truth for what each target runs.

SHELL := /bin/bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := help

PROJECT_NAME := $(shell sed -n 's/^  "name": "\(.*\)",$$/\1/p' package.json)
NODE_VERSION := $(shell cat .nvmrc)
NODE_IMAGE   := node:$(NODE_VERSION)

DEV_CONTAINER := $(PROJECT_NAME)-dev
PORT          := 4321
SITE_URL      := http://localhost:$(PORT)/$(PROJECT_NAME)/

HOST_USER   := $(shell id -u):$(shell id -g)
INTERACTIVE := $(shell [ -t 0 ] && echo -it)
OPEN_CMD    := $(shell command -v sensible-browser 2>/dev/null || command -v xdg-open 2>/dev/null || echo open)

NODE_ENV_VARS = \
	-u $(HOST_USER) \
	-e HOME=/tmp \
	-e COREPACK_HOME=/tmp/corepack \
	-e COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
	-e ASTRO_TELEMETRY_DISABLED=1 \
	-e npm_config_store_dir=/tmp/pnpm-store \
	-v $(CURDIR):/app -w /app

APP_RUN = docker run $(INTERACTIVE) --rm $(NODE_ENV_VARS) $(NODE_IMAGE) corepack pnpm

# ─── Setup and run ───────────────────────────────────────────
.PHONY: configure
configure: ## @setup Install dependencies
	@$(APP_RUN) install --frozen-lockfile

.PHONY: configure-and-update
configure-and-update: ## @setup Update dependencies
	@$(APP_RUN) update --latest

.PHONY: start
start: ## @setup Start the development server with live reload
	@docker rm -f $(DEV_CONTAINER) > /dev/null 2>&1 || true
	@docker run -d --rm --name $(DEV_CONTAINER) $(NODE_ENV_VARS) \
		-p 127.0.0.1:$(PORT):$(PORT) \
		$(NODE_IMAGE) corepack pnpm dev --host 0.0.0.0 --port $(PORT) > /dev/null
	@echo "Development server at $(SITE_URL)"

.PHONY: stop
stop: ## @setup Stop the development server
	@docker rm -f $(DEV_CONTAINER) > /dev/null 2>&1 || true

.PHONY: logs
logs: ## @setup Follow the development server logs
	@docker logs -f $(DEV_CONTAINER)

.PHONY: build
build: ## @setup Build the static site and its search index into dist/
	@$(APP_RUN) build

.PHONY: preview
preview: ## @setup Serve the built site, search included, on the development port
	@docker rm -f $(DEV_CONTAINER) > /dev/null 2>&1 || true
	@docker run -d --rm --name $(DEV_CONTAINER) $(NODE_ENV_VARS) \
		-p 127.0.0.1:$(PORT):$(PORT) \
		$(NODE_IMAGE) corepack pnpm preview --host 0.0.0.0 --port $(PORT) > /dev/null
	@echo "Built site at $(SITE_URL)"

.PHONY: og-image
og-image: ## @setup Draw the link-preview card into public/og-image.png
	@docker run --rm -u $(HOST_USER) -e HOME=/tmp -v $(CURDIR):/app -w /app python:3.12-slim \
		sh -c "pip install --quiet --no-cache-dir --user pillow==11.3.0 && python tools/og-image.py"

# ─── Testing ─────────────────────────────────────────────────
.PHONY: tests
tests: ## @test Run the unit tests
	@$(APP_RUN) test

.PHONY: examples
examples: ## @test Compile and run every program of the notes on the latest Kotlin of the Playground
	@$(APP_RUN) check:examples

.PHONY: budgets
budgets: ## @test Check the script every built page ships against its budget (run after build)
	@$(APP_RUN) check:budgets

# ─── Code review ─────────────────────────────────────────────
.PHONY: review
review: ## @review Run the linter, the formatter check and the Astro and TypeScript checks
	@$(APP_RUN) lint
	@$(APP_RUN) typecheck

.PHONY: fix-review
fix-review: ## @review Apply the linter and formatter fixes
	@$(APP_RUN) lint:fix

# ─── Reports ─────────────────────────────────────────────────
.PHONY: show-site
show-site: ## @reports Open the development server in the browser
	@$(OPEN_CMD) $(SITE_URL)

.PHONY: show-outdated
show-outdated: ## @reports Show outdated direct dependencies
	@$(APP_RUN) outdated

# ─── Maintenance ─────────────────────────────────────────────
.PHONY: clean
clean: ## @maintenance Remove dependencies and generated artifacts
	@rm -rf node_modules dist .astro site

# ─── Help ────────────────────────────────────────────────────
.PHONY: help
help: ## @help Display this help message
	@echo "Usage: make [target]"
	@echo ""
	@awk 'BEGIN { \
		FS = ":.*?## @"; \
		order[1]="setup"; order[2]="test"; order[3]="review"; order[4]="reports"; order[5]="maintenance"; \
		order[6]="help"; \
		title["setup"]="Setup and run"; title["test"]="Testing"; title["review"]="Code review"; \
		title["reports"]="Reports"; title["maintenance"]="Maintenance"; title["help"]="Help"; \
	} \
	/^[a-zA-Z0-9_-]+:.*## @/ { \
		split($$2, parts, " "); \
		section = parts[1]; \
		description = substr($$2, length(section) + 2); \
		entries[section] = entries[section] sprintf("\033[36m%-24s\033[0m %s\n", $$1, description); \
	} \
	END { \
		for (index_ = 1; index_ <= 6; index_++) { \
			section = order[index_]; \
			if (entries[section] != "") { \
				printf "%s\n", title[section]; \
				printf "%s\n", entries[section]; \
			} \
		} \
	}' $(MAKEFILE_LIST)

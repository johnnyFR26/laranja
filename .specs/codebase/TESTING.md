# Infraestrutura de testes

**Analisado em:** 2026-04-08

## Frameworks

| Camada | Framework | Observação |
|--------|-----------|------------|
| API unit | Jest 30 + ts-jest | Poucos arquivos `*.spec.ts` |
| Web unit | Jest (Nx `web:test`) | Alvo existe; cobertura prática mínima no repositório |
| API E2E | Jest + axios (`apps/api-e2e`) | Smoke contra `/api` |
| Web E2E | Cypress 15 | Projeto `web-e2e` |

## Organização

- **API:** specs ao lado do código em `apps/api/src/app/*.spec.ts`.
- **API E2E:** `apps/api-e2e/src/api/api.spec.ts` — base URL configurada pelo executor Nx (prefixo `/api`).
- **Web:** padrão Nx + Next — `jest` com cwd `apps/web` (sem suíte ampla listada no snapshot atual).

## Execução (Nx + pnpm)

Preferir sempre via Nx na raiz do monorepo:

| Uso | Comando |
|-----|---------|
| Testes unitários API | `pnpm exec nx test api` |
| Testes unitários web | `pnpm exec nx test web` |
| E2E API | `pnpm exec nx e2e api-e2e` |
| Lint web | `pnpm exec nx lint web` |
| Lint API | `pnpm exec nx lint api` |
| Build API | `pnpm exec nx build api` |
| Build web | `pnpm exec nx build web` |

> Ajuste nomes de target com `pnpm exec nx show project <nome>` se algum projeto usar alias diferente.

## Matriz de cobertura (estado atual)

| Camada | Tipo esperado | Padrão de arquivos | Comando |
|--------|----------------|-------------------|---------|
| Nest controllers/services | unit/integration | `**/*.spec.ts` em `apps/api` | `nx test api` |
| Prisma / repositórios | integration (ideal) | pouco ou nenhum hoje | — |
| Next components | unit/component | `**/*.spec.tsx` | `nx test web` |
| Fluxo crítico usuário | e2e | `web-e2e`, Cypress | `nx e2e web-e2e` |

Camadas sem testes significativos devem ser tratadas como **gaps** (ver `CONCERNS.md`).

## Paralelismo (hipótese)

- **API E2E atual:** uma requisição HTTP simples — sem estado compartilhado evidente entre testes no arquivo único.
- **Testes de integração com DB:** quando adicionados, validar isolamento (banco de teste, transações ou reset) antes de marcar como parallel-safe.

## Gate checks sugeridos

| Nível | Quando | Comando sugerido |
|-------|--------|-------------------|
| Rápido | após mudança local em API | `pnpm exec nx test api` + `pnpm exec nx lint api` |
| Rápido web | após mudança em UI | `pnpm exec nx lint web` |
| Build | antes de merge / release | `pnpm exec nx run-many -t build --projects=api,web` |
| E2E | após mudança em contrato HTTP | `pnpm exec nx e2e api-e2e` |

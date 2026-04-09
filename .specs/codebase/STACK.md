# Tech Stack

**Analisado em:** 2026-04-08

## Core

- **Monorepo:** Nx 22.x (`nx.json`, plugins para Next, Nest, Jest, Cypress, ESLint, Webpack)
- **Linguagem:** TypeScript ~5.9
- **Package manager:** pnpm (workspaces em `packages/*`; dependências raiz compartilhadas)

## Frontend (`apps/web`)

- **Framework:** Next.js ~16 (App Router)
- **UI:** React 19, Tailwind CSS 3.4, componentes alinhados a Radix/Shadcn (ver regras do projeto)
- **Formulários / validação:** react-hook-form, Zod, `@hookform/resolvers`
- **Estado:** Zustand
- **HTTP:** axios (`src/lib/api-client.ts`) com interceptor que desempacota `{ data, statusCode, timestamp }`

## Backend (`apps/api`)

- **Framework:** NestJS 11
- **Validação:** class-validator, class-transformer; `ValidationPipe` global + pipe custom em `AppModule`
- **ORM:** Prisma 7 (`schema.prisma` → cliente gerado em `apps/api/src/generated`)
- **DB:** PostgreSQL (`@prisma/adapter-pg`, `pg`)
- **Auth:** `@nestjs/jwt`, `@nestjs/passport`, passport-jwt / passport-local, Argon2 para senha
- **API docs:** Swagger em `/api`, Scalar em `/reference` (não produção)
- **Outros:** `@nestjs/throttler`, `@nestjs/terminus` (health), `@nestjs/swagger`, `@scalar/nestjs-api-reference`
- **Build/serve:** webpack-cli (`apps/api/project.json`)

## Pacotes compartilhados

- **`packages/types`:** DTOs e tipos de contrato para web + API (ex.: `FilterServiceOfferQueryDto`, auth, establishment, address)

## Testes

- **Unitário (API):** Jest 30, ts-jest — poucos specs hoje (`app.controller.spec.ts`, `app.service.spec.ts`)
- **Web:** alvo Nx `test` → `jest` em `apps/web` (config inferida; sem bateria grande de testes no repo)
- **E2E API:** `apps/api-e2e` — smoke `GET /api` com axios

## E2E UI

- **Cypress 15** via plugin Nx (`apps/web-e2e` implícito)

## Infraestrutura (`infra`)

- **IaC:** Pulumi (`@pulumi/aws`, `@pulumi/awsx`)
- **AWS:** ECR, ECS Fargate, ALB, VPC/subnets (ver `infra/src/backend.ts`, `database.ts`, `network`)
- **Secrets/config:** Pulumi config (`jwtSecret`, `corsOrigin`, etc.)

## Ferramentas de desenvolvimento

- ESLint 9, Prettier, SWC (API/libs)

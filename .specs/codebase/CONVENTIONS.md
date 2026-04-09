# Convenções de código

**Analisado em:** 2026-04-08 — padrões observados na API NestJS, no web Next e em `packages/types`.

## API (NestJS)

### Nomenclatura

- **Arquivos:** kebab-case (`service-offer.controller.ts`, `jwt-auth.guard.ts`).
- **Classes:** PascalCase com sufixo de papel (`ServiceOfferService`, `CreateServiceOfferDto`).
- **Rotas:** prefixo global **`/api`**; recursos no plural em inglês (`service-offers`, `establishments`).

### Identificadores públicos

- Exposição de entidades ao cliente preferencialmente por **`slug` UUID** (campos `slug` no Prisma), não por `id` numérico interno — refletido em `ParseUUIDPipe` nos params e nos DTOs.

### Respostas HTTP

- Sucesso: corpo envelopado por `TransformInterceptor` → `{ data, statusCode, timestamp }`.
- Erros: formatados por `HttpExceptionFilter`.
- Controllers retornam apenas o payload que vira `data`.

### Validação

- DTOs de entrada com decorators `class-validator` / `class-transformer`.
- `ValidationPipe` global: `whitelist`, `forbidNonWhitelisted`, `transform`.

### Autenticação

- Rotas padrão protegidas com `@UseGuards(JwtAuthGuard, RolesGuard)`.
- Exceção explícita com `@Public()`.
- Usuário atual: `@CurrentUser('id')` (número interno) onde aplicável.

## Web (Next.js)

### Estilo (regras do workspace)

- Componentes com **`function`**, exports nomeados.
- TypeScript estrito; preferência por **`interface`** sobre `type` nas regras web; hooks e cliente onde necessário.
- **`use client`** só quando precisa de browser APIs / estado — jobs mistura RSC + componente cliente para lista.
- Formulários: Zod + react-hook-form alinhados aos DTOs de `@org/types`.

### API client

- `apiClient` desempacota automaticamente o envelope; `response.data` é o conteúdo útil.
- Endpoints centralizados em `src/config/api/endpoints/`.

## Pacote `@org/types`

- DTOs em `packages/types/src/dto/*.ts` com sufixo `.js` nos imports ESM (`from './x.js'`).
- Tipos “de wire” para respostas da API documentados perto dos endpoints (ex.: `ServiceOfferOpenApiDto`, `FilterServiceOfferQueryDto`).

## Prisma / JSON

- Colunas **`controls`** (`Json?`) em vários modelos para metadados flexíveis — convenção implícita: payload chave-valor validado na aplicação (DTO `Record<string, unknown>` na criação de oferta).

## Commits / pastas raiz

- Apps em `apps/*`, libs em `packages/*`, infra em `infra/`.
- Specs de produto em `.specs/` (tlc-spec-driven).

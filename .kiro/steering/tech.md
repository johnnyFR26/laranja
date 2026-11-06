# Tech Stack

## Build system
- Nx monorepo (v22), pnpm workspace (`pnpm-workspace.yaml`), TypeScript ~5.9
- Prettier: single quotes. ESLint 9 flat config (`eslint.config.mjs`)

## Backend (`apps/api`)
- NestJS 11 on Express 5, Webpack build, also deployable serverless (`serverless.ts`, `vercel.json`)
- Prisma 7 with PostgreSQL (`@prisma/adapter-pg`), schema in `apps/api/prisma/`
- Auth: Passport (local + JWT), argon2 hashing
- class-validator / class-transformer, Swagger + Scalar API reference, Terminus health, Throttler
- File storage: AWS S3 (client + presigner), multer uploads
- Env vars: see `apps/api/.env.example` (`DATABASE_URL`, `JWT_SECRET`, `PORT`, `NODE_ENV`, `CORS_ORIGIN`)

## Frontend (`apps/web`)
- Next.js 16 (App Router), React 19, Tailwind CSS 3.4
- react-hook-form + Zod (`@hookform/resolvers`), Zustand stores, axios

## Shared
- `@org/types` (`packages/types`): shared DTOs used by both api and web

## Infra (`infra`)
- Pulumi (TypeScript): backend, database, frontend, network, storage

## Testing
- Jest 30 (unit), Testing Library (web), Cypress (`apps/web-e2e`), `apps/api-e2e`

## Commands
Always run tasks through Nx, prefixed with the package manager:
- `pnpm nx serve api` / `pnpm nx dev web`: run apps (run manually, long-running)
- `pnpm nx build <project>`, `pnpm nx test <project>`, `pnpm nx lint <project>`
- `pnpm nx run-many -t lint test build`, `pnpm nx affected -t test`
- `pnpm nx sync` / `pnpm nx sync:check`: TS project references
- `pnpm prisma:generate`, `pnpm prisma:migrate`, `pnpm prisma:studio`
- Never guess Nx flags; check `--help` or nx docs first. Use the `nx-generate` skill for scaffolding.

## Conventions
- API responses are always `{ data, statusCode, timestamp }`; the axios client unwraps to `response.data`.
- Use DTOs from `@org/types` for requests/responses (e.g. `LoginDto`, `RegisterDto`, `AuthTokensResponseDto`, `AuthProfileResponseDto`). Validate forms with Zod and map to the DTO before calling the API.

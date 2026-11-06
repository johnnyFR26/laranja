# Structure

```
apps/
  api/            NestJS backend
    prisma/       schema + migrations (config: prisma.config.ts)
    src/
      modules/    feature modules: addresses, auth, categories, establishments,
                  health, roles, service-offers, users
      common/     shared contracts, decorators, dtos, filters, guards,
                  interceptors, pipes, repositories
      database/   Prisma service/setup
      generated/  generated Prisma client (do not edit)
      main.ts     local entry; serverless.ts is the serverless entry
  api-e2e/        API end-to-end tests
  web/            Next.js frontend
    src/
      app/        App Router routes
      components/ UI components
      config/ contexts/ hooks/ lib/ stores/ types/ validators/
    specs/        web-specific specs
  web-e2e/        Cypress e2e tests
packages/
  types/          @org/types shared DTOs (src/dto, exported via src/index.ts)
infra/            Pulumi stacks (src/: backend, database, frontend, network, storage)
.specs/           project / codebase / features spec docs
.kiro/steering/   Kiro steering rules
```

## Conventions
- One folder per API feature under `apps/api/src/modules/<name>`; reusable cross-cutting code goes in `common/`.
- Shared request/response shapes belong in `packages/types`, not duplicated in apps.
- Frontend: Zod schemas in `validators/`, global state in `stores/`, form components use react-hook-form.
- Don't hand-edit generated output (`apps/api/src/generated`, `.nx`, `tsconfig.tsbuildinfo`).
- Agent config dirs (`.claude`, `.cursor`, `.gemini`, `.codex`, `.windsurf`, `.opencode`) are tooling; leave them alone unless asked.

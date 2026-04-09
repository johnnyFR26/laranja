# Estrutura do projeto

**Raiz:** `grove-opportunities`

## Árvore (níveis principais)

```text
apps/
  api/                 # NestJS + Prisma
    prisma/            # schema.prisma, migrations
    src/
      app/             # AppModule, bootstrap implícito em main.ts
      common/          # guards, interceptors, filters, pipes, dtos, repositories base
      database/        # PrismaService, DatabaseModule
      generated/       # cliente Prisma (gerado)
      modules/         # auth, users, roles, addresses, establishments, categories, service-offers, health
  web/                 # Next.js App Router
    src/
      app/             # rotas, layouts, (portal), login, register
      components/
      config/api/      # base URL, endpoints
      hooks/
      lib/             # api-client, fetch server, mappers
  api-e2e/             # testes e2e leves da API
  web-e2e/             # Cypress (dependência implícita do web)
packages/
  types/               # @org/types — DTOs e enums compartilhados
infra/                 # Pulumi — AWS (VPC, RDS, ECR, ECS, ALB)
.specs/                # Documentação spec-driven (project, codebase, features)
```

## Onde vive cada capacidade

| Capacidade | UI (web) | API | Dados / tipos |
|------------|----------|-----|----------------|
| Auth / sessão | `app/login`, `hooks/use-auth.ts` | `modules/auth/` | `User`, JWT |
| Perfil / usuários | register, dashboard freelancer | `modules/users/` | `User`, `UserRole` |
| Endereço | componentes `address/*` | `modules/addresses/` | `Address` |
| Estabelecimento | portal establishments | `modules/establishments/` | `Establishment` |
| Vagas / ofertas | `jobs/*`, `create-shift-form` | `modules/service-offers/` | `ServiceOffer`, `ServiceOfferRole` |
| Papéis (cozinha, garçom, etc.) | filtros / formulários | `modules/roles/` | `Role` |
| Contratos tipados | imports `@org/types` | DTOs espelhados | `packages/types` |

## Diretórios especiais

- **`apps/api/src/generated`:** não editar — saída do `prisma generate`.
- **`.specs/`:** visão de produto e mapeamento brownfield; não afeta build.

# Integrações externas

**Analisado em:** 2026-04-08

## AWS (infraestrutura)

- **Provedor:** Pulumi (`infra/`)
- **Componentes observados:**
  - **ECR** + imagem Docker buildada a partir de `apps/api/Dockerfile`
  - **ECS Fargate** — serviço `api` na porta 3000
  - **Application Load Balancer** (`awsx.lb.ApplicationLoadBalancer`)
  - **VPC / subnets** — rede privada para tasks, pública para ALB
  - **RDS / URL de banco** — exposta como `DATABASE_URL` no container (ver `infra/src/database.ts`)
- **Variáveis de ambiente na task:** `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `NODE_ENV=production`

## Banco de dados

- **PostgreSQL** via Prisma
- **Migrações / client:** scripts na raiz `package.json` — `prisma migrate`, `generate`, `studio` com `--config apps/api/prisma.config.ts` e `--schema apps/api/prisma/schema.prisma`

## Autenticação

- **JWT** emitido pela API (`@nestjs/jwt`); segredo a partir de `JWT_SECRET` (Pulumi em prod).
- **Senhas:** Argon2 no registro/validação.

## CORS

- `CORS_ORIGIN` — lista separada por vírgula ou `*` por padrão em dev (`main.ts`).

## Documentação de API

- **Swagger UI:** `/api` (path relativo ao host da API)
- **Scalar:** `/reference` quando `NODE_ENV !== 'production'`

## Frontend → Backend

- **Next.js** consome REST na `API_BASE_URL` (config em `apps/web/src/config/api`)
- **Envelope:** cliente axios remove wrapper `{ data, statusCode, timestamp }` automaticamente

## Integrações planejadas / não encontradas no código

- **Gateway de pagamento:** ainda não implementado — previsto no roadmap de produto.
- **ViaCEP / geocoding:** verificar `apps/web/src/lib/viacep.ts` se usado em fluxo de endereço (integração HTTP externa para BR).

## E-mail / SMS / push

- Não mapeados no snapshot atual do repositório.

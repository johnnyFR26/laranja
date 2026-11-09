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
- **Variáveis de ambiente na task:** `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `NODE_ENV=production`, `AWS_REGION`, `AWS_S3_BUCKET`, `AWS_CDN_URL`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`

## Storage de imagens (AWS S3 + CloudFront)

- **Provedor:** AWS S3 com CloudFront. Supabase não é usado.
- **Bucket privado:** sem ACL por objeto e sem acesso público. A leitura ocorre somente via CloudFront com Origin Access Control (OAC); a escrita é feita pela API com `@aws-sdk/client-s3`.
- **Variáveis (`apps/api/.env.example`):**
  - `AWS_REGION`: região do bucket
  - `AWS_S3_BUCKET`: nome do bucket
  - `AWS_CDN_URL`: URL base do CloudFront (sem barra final)
  - `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`: credenciais da API para o bucket
  - A API falha na inicialização se alguma estiver ausente.
- **Persistência:** a URL completa do CDN é gravada em `avatarUrl` (user), `logoUrl` (establishment), `mainImageUrl` e `imageUrls` (galeria).
- **Chave do objeto:** `{entidade}/{slug}/{papel}/{uuid}.{ext}`, com `Cache-Control: public, max-age=31536000, immutable`.
- **Upload:** multipart, JPEG/PNG/WebP, máximo 5 MB por arquivo, validação de magic bytes. Galeria: user 10, establishment 20, service-offer 10.
- **Endpoints** (prefixo `/api`; `GET` público, demais exigem JWT e ser dono ou admin):

| Método | Rota | Ação |
|---|---|---|
| GET | `/{recurso}/:slug/images` | Lista imagens |
| PUT / DELETE | `/users/:slug/images/avatar` | Define/remove avatar |
| PUT / DELETE | `/establishments/:slug/images/logo` | Define/remove logo |
| PUT / DELETE | `/{recurso}/:slug/images/main` | Define/remove imagem principal |
| PATCH | `/{recurso}/:slug/images/main` | Promove imagem da galeria (`{ url }`) |
| POST | `/{recurso}/:slug/images/gallery` | Adiciona à galeria (`files[]`) |
| DELETE | `/{recurso}/:slug/images/gallery` | Remove da galeria (`url` no corpo ou query) |
| PUT | `/{recurso}/:slug/images/gallery/order` | Reordena a galeria (`{ urls }`) |

  `{recurso}` é `users`, `establishments` ou `service-offers` (service-offers não tem avatar/logo).
- **Erros:** 400, 401, 403, 404, 413 (tamanho), 415 (tipo), 422 (limite da galeria), 502 (falha no S3).
- **Exclusão:** ao excluir user, establishment ou service-offer, os objetos são removidos do bucket em best effort (establishment inclui as imagens das suas ofertas).

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

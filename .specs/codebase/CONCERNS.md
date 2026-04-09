# Codebase Concerns

**Data da análise:** 2026-04-08

## Lacunas de produto vs modelo atual

**Regra CPF (freelancer XOR dono):**

- **Evidência:** busca por `cpf` / `CPF` no código e no `schema.prisma` não retorna campo dedicado.
- **Impacto:** regra de negócio descrita em `.specs/project/PROJECT.md` não pode ser aplicada até modelagem e validação existirem.
- **Correção:** adicionar campo único normalizado (ex.: `cpf` em `User` ou entidade de documento), validar no registro e ao vincular `Establishment`.

**Campos de estabelecimento (segmento, uniforme):**

- **Evidência:** `Establishment.controls` e `Address.controls` são `Json?` sem schema tipado em `@org/types` nem validação centralizada.
- **Impacto:** formulários podem divergir entre web e API; difícil garantir “cadastro completo” antes de postar vaga.
- **Correção:** definir contrato Zod + DTO compartilhado para `EstablishmentControls` (ex.: `segmentType`, `uniformRequired: boolean`, `uniformNotes?: string` se true) e validar no Nest + web.

## Busca de vagas para freelancers

**UI de filtros desabilitada:**

- **Evidência:** `apps/web/src/components/jobs/available-opportunities-section.tsx` — selects de localização/tipo e botões “Filtrar” / “Mais recente” com `disabled`.
- **Impacto:** freelancers não filtram por papel, data, fim de semana ou localização na interface atual.

**Endpoint usado na página de jobs não é o paginado:**

- **Evidência:** `jobs/page.tsx` e `useOpenServiceOffers` usam `GET /service-offers/open` (`findOpenOffers`) — retorno **array completo**, sem `page/limit`.
- **Impacto:** escalabilidade e consistência com filtros server-side; o hook `usePaginatedServiceOffers` já existe mas **não** é usado nesta tela.

**API de listagem paginada sem filtros de negócio solicitados:**

- **Evidência:** `FilterServiceOfferDto` — `search`, `establishmentId`, `categoryId`, `status`, `budgetType`, `minBudget`, `maxBudget`, paginação. **Não há** filtro por `role` (tabela `service_offer_roles`), por intervalo de data em `deadline`, por “fim de semana”, nem por cidade/estado/CEP via `establishment.address`.
- **Impacto:** requisitos do Marco 2 (role, data, fim de semana, localização) exigem alteração de DTO + `ServiceOfferService.findAll` + índices Prisma conforme queries.

**Lista paginada sem includes:**

- **Evidência:** `BaseRepository.paginate()` — `findMany` só com `where`, `skip`, `take`, `orderBy`; sem `include`.
- **Impacto:** `GET /service-offers` retorna ofertas sem estabelecimento/endereço/papéis embutidos — pode ser insuficiente para cards ricos se a UI migrar para este endpoint.

## Paginação

**Listagem paginada existe na API:**

- **Evidência:** `PaginationDto` (`page`, `limit` até 100), `ServiceOfferRepository.paginate`, resposta `{ data, total, page, limit, totalPages }`.
- **Risco:** cliente deve usar este endpoint para listas grandes; hoje a vitrine principal usa `/open` (não paginado).

## Testes

**Cobertura baixa em domínio:**

- **Evidência:** apenas `app.controller.spec.ts`, `app.service.spec.ts` na API; e2e mínimo.
- **Impacto:** regressões em auth, ofertas, estabelecimentos e regras de CPF/créditos não são pegas automaticamente.
- **Correção:** testes de serviço/repositório com banco de teste ou mocks; contratos e2e para rotas críticas.

## Segurança e configuração

**CORS permissivo em fallback:**

- **Evidência:** `main.ts` — `origin: process.env.CORS_ORIGIN?.split(',') || '*'`.
- **Impacto:** em ambientes sem `CORS_ORIGIN`, qualquer origem é aceita.
- **Correção:** restringir em produção via env obrigatória na infra.

**Swagger em produção:**

- **Evidência:** `SwaggerModule.setup('api', ...)` sem guard condicional ao ambiente.
- **Impacto:** superfície de documentação exposta; avaliar desabilitar ou proteger em prod.

## Dívida menor

**Descrição genérica no Swagger da API:**

- **Evidência:** `main.ts` — descrição menciona “produtos, pedidos” em vez do domínio Grove/hospitalidade.
- **Impacto:** apenas documentação; confunde novos devs.

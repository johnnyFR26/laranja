# Dashboard do estabelecimento — ofertas de serviço (service offers)

**Status:** rascunho para implementação  
**Última atualização:** 2026-04-08  
**Relacionado:** `apps/web` dashboard estabelecimento · `apps/api` módulo `service-offers`

---

## 1. Objetivo

Ajustar a área do **dashboard do estabelecimento** para:

1. Listar as **ofertas de serviço** (`ServiceOffer`) publicadas por aquele estabelecimento, com dados vindos da API (substituindo ou complementando o mock atual).
2. Ao acionar **detalhes** de uma linha, navegar para a **mesma experiência de detalhe de vaga** já existente: rota `app/(portal)/jobs/[slug]` e componentes em `apps/web/src/components/job-detail/`.
3. Exibir um **carrossel** no topo da seção de serviços destacando ofertas cujo **prazo (`deadline`) expira no dia corrente** para aquele estabelecimento.

---

## 2. Estado atual (referência no código)

| Área | Onde |
|------|------|
| Página do dashboard | `apps/web/src/app/(portal)/dashboard/establishment/page.tsx` |
| Layout e mock da tabela | `apps/web/src/components/dashboard/establishment-dashboard.tsx` — constante `MOCK_REQUEST_HISTORY` + `RequestHistoryCard` |
| Card da tabela | `apps/web/src/components/cards/request-history-card.tsx` — tipos `RequestHistoryRow`, colunas estilo “Shift Request / Worker / Status / Total Paid” |
| Detalhe da oferta (reutilizar) | `apps/web/src/app/(portal)/jobs/[slug]/page.tsx` + `getServiceOffer` / `mapServiceOfferDetailToJobDetail` |
| Endpoints no cliente | `apps/web/src/config/api/endpoints/service-offers.endpoints.ts` |

---

## 3. Domínio (API)

- Recurso: **`ServiceOffer`** (`apps/api/prisma/schema.prisma`).
- Campos relevantes para UI: `slug` (UUID público na URL), `title`, `description`, `status`, `budget`, `budgetType`, `deadline`, `controls` (JSON — ex.: data/horário do turno no fluxo de criação).
- Relação com estabelecimento: `establishmentId` → `Establishment`; identificação pública do estabelecimento na API é o **`slug` UUID** (`establishments.slug`), disponível no perfil como `user.establishment.slug`.

---

## 4. Integração com a API (`ServiceOfferService`)

Serviço de referência: `apps/api/src/modules/service-offers/services/service-offer.service.ts`  
Controller: `apps/api/src/modules/service-offers/controllers/service-offer.controller.ts`  
Prefixo global da API: **`/api`** (ver `main.ts` / regras do projeto).

### 4.1 Rota principal para a lista do dashboard

**Obter todas as ofertas de um estabelecimento (lista completa para o dono)**

- **Método / path:** `GET /api/service-offers/establishment/:establishmentSlug`
- **Parâmetro:** `establishmentSlug` — UUID (`ParseUUIDPipe`), mesmo valor de `establishments.slug` (ex.: vindo de `user.establishment.slug` no front).
- **Handler:** `ServiceOfferController.findByEstablishment` → `ServiceOfferService.findByEstablishment(establishmentSlug)`.
- **Implementação:** `ServiceOfferRepository.findByEstablishment` — `findMany` por `establishmentId`, `orderBy: { createdAt: 'desc' }`, includes (`category`, `establishment`, `requiredRoles`, `_count.subscriptions`).

**Uso no web:** `serviceOffersEndpoints.byEstablishmentSlug(establishmentSlug)` → string  
`/service-offers/establishment/${establishmentSlug}` (com `API_BASE_URL` apontando para `/api`).

### 4.2 Rota alternativa (paginação / filtros)

**Listagem paginada com filtro por estabelecimento**

- **Método / path:** `GET /api/service-offers`
- **Query:** `establishmentId=<slug UUID do estabelecimento>` (+ `page`, `limit`, etc., conforme `FilterServiceOfferDto` e `PaginationDto`).
- **Handler:** `findAll` → `ServiceOfferService.findAll` — aplica `where.establishment = { slug: establishmentId }`.

Útil se a tabela do dashboard passar a ter **paginação server-side** ou filtros (status, orçamento). Para o MVP da spec, a rota **4.1** costuma bastar.

### 4.3 Detalhe de uma oferta (tela job-detail)

- **Método / path:** `GET /api/service-offers/:slug`
- **Handler:** `ServiceOfferService.findOne(slug)` (com relações via repositório).

No app web isso já alimenta `/jobs/[slug]` via `getServiceOffer` em `apps/web/src/lib/fetch-service-offer-server.ts`.

---

## 5. Navegação e UX

- **Lista no dashboard:** cada linha representa uma **oferta** (serviço postado); ação “detalhes” / clique na linha deve ir para **`/jobs/{slug}`** onde `slug` é o `ServiceOffer.slug`.
- **Paridade com o restante do app:** mesma URL usada em `apps/web/src/app/(portal)/establishments/[slug]/page.tsx` (`href={/jobs/${offer.slug}}`).

---

## 6. Carrossel — “expira hoje”

**Regra de produto (MVP):** considerar ofertas em que o campo `deadline` (ISO `DateTime` na API) cai no **mesmo dia civil** que “hoje” para o estabelecimento.

**Implementação sugerida (sem mudança obrigatória de API no MVP):**

1. Carregar a lista via **4.1** (ou página da **4.2**).
2. No cliente, filtrar itens com `deadline != null` e comparar data (normalizar **timezone**: documentar se usamos `America/Sao_Paulo` ou UTC para o corte do dia).
3. Exibir só esses itens no carrossel (título, status, link para `/jobs/:slug`, opcionalmente orçamento e tempo restante).

**Melhoria futura (opcional):** endpoint dedicado ou filtros `deadlineFrom` / `deadlineTo` em `GET /api/service-offers` para não trazer lista inteira quando houver muitas ofertas.

---

## 7. Mock inicial (referência visual e fallback)

Manter dados mockados **alinhados ao layout atual** até a integração estar estável; usar os mesmos exemplos da UI de referência para desenvolvimento e testes visuais.

**Constante sugerida (já espelhada em `establishment-dashboard.tsx`):**

| shiftName | shiftDate | shiftTime | workerName | status | totalPaid |
|-----------|-----------|-----------|------------|--------|-----------|
| Turno Noturno Sábado | 21 out 2023 | 18:00 - 02:00 | Amanda Lewis | completed | R$ 180,00 |
| Suporte Brunch | 22 out 2023 | 10:00 - 15:00 | James Wilson | pending | R$ 112,50 |
| Assistente de Cozinha Emergência | 19 out 2023 | 17:00 - 23:00 | Rosa Gomez | cancelled | R$ 0,00 |
| Serviço de Jantar Extra | 18 out 2023 | 19:00 - 00:00 | Robert Pike | completed | R$ 125,00 |

**Nota de modelo:** o mock acima mistura **pedido de turno + trabalhador + pagamento** (próximo de `ServiceSubscription`). A API de **`service-offers` por estabelecimento** devolve **ofertas**, não linhas por candidatura. Para o primeiro corte integrado com a API:

- Colunas podem mapear **diretamente** da oferta: título, status da oferta (`OPEN` / `IN_PROGRESS` / …), orçamento (`budget`), prazo (`deadline`).
- Colunas “Worker name” e “Total paid” exigem **dados de inscrições/contratos** (`subscriptions`) ou outro endpoint — tratar como **fase 2** ou placeholder (“—”) até haver contrato definido na spec de subscriptions.

O carrossel “expira hoje” depende apenas de **`deadline`** na oferta e pode ser implementado sem essas colunas.

---

## 8. Tipos compartilhados

- Preferir `ServiceOfferDto` e enums em `@org/types` (`packages/types/src/dto/service-offer.dto.ts`) alinhados às respostas reais da API (envelope `{ data, statusCode, timestamp }` desempacotado pelo `apiClient`).

---

## 9. Critérios de aceite

1. Com usuário autenticado e `user.establishment.slug` definido, o dashboard dispara pedido a **`GET /api/service-offers/establishment/:establishmentSlug`** (ou documenta uso da lista paginada com `establishmentId`).
2. A tabela (ou lista) reflete ofertas reais; estados de carregamento e erro são tratados.
3. Clicar em detalhes de uma oferta abre **`/jobs/:slug`** reutilizando `job-detail` / página de job existente.
4. Carrossel acima da lista mostra apenas ofertas com **deadline no dia atual** (regra de timezone documentada no código).
5. Mock permanece disponível para Storybook, testes ou fallback quando não houver `establishment` / falha de rede (comportamento a combinar).

---

## 10. Fora de escopo (esta spec)

- Criação de ofertas (já existe fluxo em `create-shift-form` + `POST /api/service-offers`).
- Relatórios agregados (“Ver todos os relatórios”) — link pode permanecer placeholder até existir rota `/reports`.
- Saldo “CURRENT BALANCE” / “Add Credits” — apenas layout; integração financeira é outra feature.

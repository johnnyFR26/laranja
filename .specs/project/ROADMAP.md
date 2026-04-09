# Roadmap — Grove Opportunities

**Marco atual:** MVP — identidade, estabelecimentos, vagas e base financeira  
**Status:** Em progresso

---

## Marco 1 — Fundação de identidade e dados

**Objetivo:** Usuários e estabelecimentos com cadastro consistente, regras de perfil (freelancer vs dono) e CPF exclusivo por tipo de uso.

**Critério de conclusão:** CRUD de usuário completo; validação de que freelancer titular não possui estabelecimento e vice-versa na mesma pessoa (CPF); DTOs compartilhados onde aplicável.

### Features

**Autenticação e perfil de usuário** — IN PROGRESS

- Registro e login; sessão/tokens conforme implementação atual da API.
- CRUD de usuário alinhado a papéis (freelancer vs fluxo com estabelecimento).

**Estabelecimento + endereço** — PLANNED

- CRUD de estabelecimento com endereço e campos obrigatórios para operação (detalhar em spec).
- **Controles do estabelecimento** (persistidos preferencialmente em `Establishment.controls` com contrato tipado em `@org/types`):
  - **Tipo de segmento** do negócio (ex.: restaurante, bar, buffet — enumerar na spec).
  - **Uso de uniforme:** sim/não; se **sim**, campo de texto para o freelancer saber o que é exigido (cor, modelo, fornecido pelo local, etc.).
- Validação: postagem de serviço bloqueada até cadastro completo.

---

## Marco 2 — Vagas, créditos e reserva

**Objetivo:** Estabelecimento publica e atualiza serviços/vagas; consumo de créditos para publicar; freelancer encontra vagas; fluxo de reserva do serviço para um freelancer.

**Critério de conclusão:** Criar/editar/listar vagas com expiração curta; créditos impedem postagem sem saldo; estado de reserva acordado documentado e implementado.

**Prioridade neste marco (ordem sugerida):**

1. **Postagem de serviço** (criar/editar, papéis exigidos, expiração/deadline) estável para o dono.
2. **Descoberta para freelancers:** listagem com **filtros** por **papel (role)**, **data** (e regra para **fim de semana**), **localização** (cidade/UF/raio ou CEP — definir na spec).
3. **Paginação:** a API já expõe lista paginada em `GET /api/service-offers` (`page`, `limit`, `totalPages`); a vitrine atual em `/jobs` usa `GET /service-offers/open` **sem** paginação — alinhar produto (migrar UI para endpoint paginado ou paginar `/open`) e garantir filtros server-side coerentes.

### Features

**Serviços / vagas** — PLANNED

- Criar, atualizar e listar vagas com tipo de profissional (assistente de cozinha, garçom, cozinheiro — extensível).
- Expiração de vagas mais curta que “quadro clássico” de emprego.
- Filtros de busca (API + UI): **role**, **data**, **fim de semana**, **localização**; revisar **paginação** end-to-end.

**Créditos do estabelecimento** — PLANNED

- Modelo de créditos para publicação; auditoria mínima de uso.

**Reserva entre restaurante e freelancer** — PLANNED

- Reservar o serviço para o freelancer escolhido (estados e transições em spec).

---

## Marco 3 — Pagamentos (pós-gateway)

**Objetivo:** Integrar gateway de pagamento e fechar o ciclo financeiro na plataforma.

**Critério de conclusão:** Pagamento ou pré-pagamento conforme decisão de produto; reconciliação básica; eventos auditáveis.

### Features

**Gateway de pagamento** — PLANNED

- Integração com provedor (a definir).
- Controle de pagamentos alinhado a reservas e liberação de créditos/comissões se houver.

---

## Considerações futuras (pós-MVP)

- Tempo real (notificações, chat, status ao vivo).
- Estratégias avançadas de cache e performance no Next.
- Expansão de tipos de profissional e verticals além do foco inicial.

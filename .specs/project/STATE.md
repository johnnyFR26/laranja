# State — Grove Opportunities

**Last Updated:** 2026-04-08  
**Current Work:** Marco 2 — filtros de vagas + paginação na UI; controles de estabelecimento (segmento + uniforme)

---

## Recent Decisions (Last 60 days)

### AD-001: Perfis excludentes por CPF (2026-04-08)

**Decision:** Um mesmo CPF não pode representar simultaneamente um freelancer e um titular de estabelecimento; são linhas de uso mutuamente exclusivas.

**Reason:** Evita conflito de incentivos e simplifica regras de crédito, postagem e matching.

**Trade-off:** Pessoa que é dona e também trabalha como freelancer precisará de política explícita (ex.: outro cadastro não permitido — produto deve comunicar isso).

**Impact:** Modelagem de usuário, estabelecimento e validações na API e em formulários.

### AD-002: DTOs compartilhados em `@org/types` (2026-04-08)

**Decision:** Centralizar contratos de request/response e tipos de domínio compartilhados no pacote `packages/types` para web e api.

**Reason:** Menos divergência entre cliente e servidor; validação (ex.: Zod) pode espelhar os mesmos shapes.

**Trade-off:** Pacote pode crescer; exige disciplina de versão e exports.

**Impact:** Novas features devem preferir tipos/DTOs no pacote antes de duplicar no app.

### AD-003: MVP sem tempo real e sem foco em cache Next (2026-04-08)

**Decision:** Adiar atualização em tempo real e otimizações avançadas de cache do Next até após MVP estável.

**Reason:** Priorizar fluxos CRUD, vagas, créditos e base de pagamento.

**Trade-off:** UX pode depender de refresh ou polling simples temporariamente.

**Impact:** Escopo de features claramente cortado no PROJECT.md.

### AD-004: Controles de cadastro do estabelecimento — segmento e uniforme (2026-04-08)

**Decision:** Incluir no cadastro/edição do estabelecimento: **tipo de segmento**; **exige uniforme** (booleano); se sim, **campo de texto** para detalhes do uniforme.

**Reason:** Informação operacional mínima para o freelancer antes de aceitar uma vaga.

**Trade-off:** Pode ficar em `Establishment.controls` (JSON) até haver colunas dedicadas; exige schema Zod/DTO compartilhado para não virar blob opaco.

**Impact:** `packages/types`, formulário web, validação Nest ao criar/atualizar estabelecimento; documentado no ROADMAP Marco 1.

---

## Active Blockers

### B-001: Lista fechada de campos obrigatórios (endereço + estabelecimento)

**Discovered:** 2026-04-08  
**Impact:** Gating de “pode postar serviço” depende da lista exata de campos.  
**Update 2026-04-08:** Definidos **segmento** e **uniforme (+ texto se sim)** para `Establishment.controls`; demais obrigatoriedades (endereço campo a campo, etc.) ainda em spec.  
**Workaround:** DTOs atuais + sub-schema tipado de `controls`.  
**Resolution:** Fechar checklist “cadastro completo” em spec de feature.

### B-002: Gateway de pagamento

**Discovered:** 2026-04-08  
**Impact:** Fluxo financeiro completo fica parcial até escolha do provedor e desenho de webhooks/estados.  
**Workaround:** Modelar estados de reserva e “pendente de pagamento” sem captura real.  
**Resolution:** Decidir provedor (Stripe, Pagar.me, etc.) e documentar em INTEGRATIONS + spec.

---

## Lessons Learned

_(vazio no início do projeto spec-driven)_

---

## Quick Tasks Completed

| #   | Description                          | Date       | Commit | Status  |
| --- | ------------------------------------ | ---------- | ------ | ------- |
| 001 | Criação inicial de PROJECT/ROADMAP/STATE | 2026-04-08 | —      | ✅ Done |
| 002 | Brownfield: `.specs/codebase/*` (7 docs) | 2026-04-08 | —      | ✅ Done |

---

## Deferred Ideas

- [ ] Notificações em tempo real quando o MVP estiver fechado — Capturado durante: definição de escopo  
- [ ] Estratégia de cache Next (ISR, tags) — Capturado durante: definição de escopo  

---

## Todos

- [ ] Fechar checklist completo de “cadastro completo” (além de segmento + uniforme) para travar postagem  
- [x] Mapear codebase (`.specs/codebase/*`)  
- [ ] Estender `FilterServiceOfferDto` + query Prisma: role, data, fim de semana, localização  
- [ ] Jobs UI: ligar filtros ao backend; decidir `/service-offers` paginado vs evolução de `/open`  
- [ ] Spec de feature: CRUD usuário + regra CPF freelancer vs estabelecimento  
- [ ] Spec de feature: créditos + publicação de vaga + expiração  

---

## Preferences

**Model Guidance Shown:** never

# Grove Opportunities

**Visão:** Portal de freelancer que conecta restaurantes (e auxiliares de operação) a profissionais de cozinha e salão — vagas de curta duração, com reserva do serviço e controle de pagamento na plataforma.

**Para:** Restaurantes que precisam de reforço pontual (cozinheiro, assistente de cozinha, garçom) e profissionais que buscam renda extra no dia ou em janelas curtas.

**Resolve:** Hoje muitas vagas circulam por WhatsApp, sem visibilidade, sem garantia de combinação e sem trilha de trabalho/pagamento. A plataforma centraliza descoberta de vagas (com expiração mais curta que redes genéricas), reserva do freelancer pelo estabelecimento e evolução para pagamento integrado.

## Objetivos

- Permitir que estabelecimentos publiquem serviços/vagas por tipo de profissional, com expiração curta, mediante uso de créditos.
- Permitir que freelancers encontrem e se candidatem a vagas alinhadas ao perfil (foco inicial: assistente de cozinha, garçom, cozinheiro).
- Suportar o fluxo de **reserva** do serviço para um freelancer específico entre restaurante e profissional; **pagamento** será integrado em breve via gateway.
- Entregar MVP com cadastros completos, CRUD de usuário e estabelecimento (incluindo endereço), publicação/atualização de serviços e base para controle de pagamentos/créditos.

## Tech stack

**Core:**

- Linguagem: TypeScript
- Frontend: Next.js (App Router), React
- Backend: NestJS
- ORM / dados: Prisma, PostgreSQL
- Infraestrutura: arquitetura na AWS (detalhar em `.specs/codebase/INTEGRATIONS.md` quando mapeado)

**Monorepo:** Nx; pacote compartilhado `@org/types` para DTOs e contratos usados em **web** e **api** sempre que possível.

**Em breve:** gateway de pagamento (fornecedor e fluxo a definir).

## Escopo

### MVP (inclui)

- Cadastro obrigatório de todos os usuários.
- Dois perfis de uso mutuamente excludentes na mesma pessoa física:
  - **Freelancer:** usuário sem estabelecimento vinculado.
  - **Dono de restaurante:** usuário com estabelecimento(s) que publica vagas/serviços.
- Regra de negócio: **não** permitir a mesma pessoa (mesmo CPF) como freelancer e como titular de estabelecimento — perfis excludentes.
- Fluxo completo de **CRUD de usuário**.
- **CRUD de estabelecimento** com dados de endereço e informações necessárias ao negócio, incluindo **tipo de segmento**, indicação de **uso de uniforme** e, se aplicável, **texto descritivo do uniforme** (contrato tipado em `@org/types` / validação alinhada na API).
- **Publicar e atualizar serviços/vagas** (com tipos de profissional alvo).
- **Créditos** para o estabelecimento poder postar vaga (modelo de crédito/controle na plataforma).
- Base de **controle de pagamentos** e reserva de serviço entre as partes (até integração do gateway).
- DTOs alinhados entre front e API via `packages/types` onde fizer sentido.

### Fora do escopo (MVP)

- Qualquer funcionalidade que dependa de **atualização em tempo real** (ex.: notificações push em tempo real, presença online).
- Otimizações e políticas avançadas de **cache do Next** (ISR, revalidate granular, etc.) — foco em concluir o MVP funcional.

### Restrições e políticas

- **Sem postagem de serviço** sem cadastro completo do estabelecimento, incluindo endereço e demais campos obrigatórios (lista detalhada pode ser refinada em spec de feature).
- Prioridade: **finalizar o MVP** antes de incrementos periféricos.

## Métricas de sucesso (MVP)

- Estabelecimento consegue cadastrar-se, completar dados (incluindo endereço), adquirir/usar créditos e publicar vaga com tipo de profissional e janela de validade.
- Freelancer consegue cadastrar-se, visualizar vagas compatíveis e participar do fluxo de reserva acordado no produto.
- API e web compartilham contratos via `@org/types` para reduzir divergência de payload e validação.

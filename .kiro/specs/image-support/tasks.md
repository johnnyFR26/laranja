# Implementation Plan: Suporte a Imagens (image-support)

## Overview

Implementa o CRUD de imagens para User, Establishment e ServiceOffer em `apps/api` (NestJS + Prisma), com S3 privado + CloudFront. A ordem segue: base (schema, migration, config), módulo de storage, módulo de imagens (validação, targets, serviço, controllers), integração (limpeza na exclusão, DTOs) e verificação final.

## Tasks

- [ ] 1. Preparar schema, migration e ambiente
  - [x] 1.1 Adicionar `@default([])` em `imageUrls` nos modelos `User`, `Establishment` e `ServiceOffer` em `apps/api/prisma/schema.prisma`
    - Garante `DEFAULT ARRAY[]::TEXT[]` para registros existentes
    - _Requirements: 9.1, 9.2_
  - [-] 1.2 Criar a migration `add_image_fields` e regenerar o client em `apps/api/src/generated`
    - Rodar `prisma migrate dev --name add_image_fields` e confirmar que o shadow database aplica todo o histórico sem drift (a migration `20260306000047` converte UUID para SERIAL)
    - Conferir que a migration cria só `mainImageUrl` e `imageUrls` nas 3 tabelas (`avatarUrl` e `logoUrl` já existem)
    - Rodar `prisma migrate status` e confirmar banco em sincronia
    - _Requirements: 9.1, 9.2, 9.3, 9.4_
  - [x] 1.3 Atualizar `apps/api/.env.example` com `AWS_REGION`, `AWS_S3_BUCKET`, `AWS_CDN_URL`, `AWS_ACCESS_KEY_ID` e `AWS_SECRET_ACCESS_KEY` (valores fictícios)
    - _Requirements: 10.1_
  - [x] 1.4 Injetar `AWS_REGION` no ambiente do container em `infra/src/backend.ts`
    - _Requirements: 10.2_
  - [x] 1.5 Resolver o bloco `allowBuilds` do `pnpm-workspace.yaml`
    - Substituir cada `set this to true or false` por `true` ou `false` conforme o que o build exige, ou reverter o bloco autogerado
    - _Requirements: 10.4_

- [ ] 2. Implementar o módulo de storage (`apps/api/src/modules/storage`)
  - [x] 2.1 Criar `storage.constants.ts` (tokens `S3_CLIENT` e `STORAGE_CONFIG`), `storage.config.ts` (interface `StorageConfig` e leitura/validação das envs) e `storage.exception.ts` (`StorageException` estendendo `BadGatewayException`)
    - A factory lança `Error('Variável de ambiente ausente: <NOME>')` e remove a barra final de `AWS_CDN_URL`
    - _Requirements: 1.2, 1.6, 1.7, 10.3_
  - [x] 2.2 Implementar `StorageService` com `buildKey`, `upload`, `toUrl`, `toKey`, `deleteByUrl` e `deleteManyByUrl`
    - Chave no formato `{entidade}/{slug}/{papel}/{uuid}.{ext}` com `crypto.randomUUID()`
    - `upload` com `ContentType` e `CacheControl: 'public, max-age=31536000, immutable'`
    - `toKey` retorna `null` para URL fora do CDN; `deleteByUrl` ignora essas URLs com log
    - Erros do SDK logados e relançados como `StorageException`
    - _Requirements: 1.1, 1.3, 1.4, 1.5, 1.7_
  - [~] 2.3 Criar `StorageModule` registrando `STORAGE_CONFIG`, `S3_CLIENT` e `StorageService` (exportado) e importá-lo em `AppModule`
    - _Requirements: 1.1, 1.2, 1.6_
  - [ ]* 2.4 Escrever testes unitários de `StorageService` e da config com `S3_CLIENT` mockado
    - Cobrir `buildKey`, `upload`, `toUrl`/`toKey` (barra final, URL fora do CDN), `deleteByUrl`, falha do SDK e variável ausente
    - _Requirements: 11.1_
  - [ ]* 2.5 Escrever teste parametrizado da propriedade `toKey(toUrl(k)) === k`
    - **Property 5: Escopo de remoção**
    - **Validates: Requirements 1.4, 1.5**

- [~] 3. Checkpoint - storage
  - Garantir que o build e os testes do módulo de storage passam; perguntar ao usuário se houver dúvidas.

- [ ] 4. Implementar base do módulo de imagens (`apps/api/src/modules/images`)
  - [x] 4.1 Criar `image.constants.ts` com `ALLOWED_IMAGE_MIME`, `MAX_IMAGE_FILE_SIZE` (5 MB), `MAX_GALLERY_SIZE` (user 10, establishment 20, service-offer 10), `ImageEntityType` e `ImageSlot`
    - _Requirements: 2.1, 2.3, 2.5_
  - [x] 4.2 Implementar `ImageFilePipe`
    - 400 sem arquivo; 415 para MIME fora da lista ou magic bytes divergentes (JPEG, PNG, WebP); retornar `ValidatedImage { buffer, mimeType, ext, size }` com extensão derivada do MIME detectado
    - _Requirements: 2.1, 2.2, 2.4, 2.6_
  - [ ]* 4.3 Escrever testes unitários de `ImageFilePipe`
    - Arquivo ausente, MIME inválido, assinatura divergente e cada formato válido
    - _Requirements: 11.2_
  - [~] 4.4 Definir a interface `ImageTarget`, `ImageTargetRecord` e implementar `UserImageTarget`, `EstablishmentImageTarget` e `ServiceOfferImageTarget` com Prisma
    - `load` retorna 404 se o slug não existir e inclui `ownerUserId` (offer via `establishment.ownerId`)
    - `update` aceita `Prisma.TransactionClient` opcional
    - `collectUrls` do estabelecimento inclui imagens das suas `serviceOffers`
    - _Requirements: 3.7, 4.7, 5.6, 8.4_
  - [~] 4.5 Implementar `ImageTargetRegistry` (injeta os 3 targets e expõe `get(entity)`)
    - _Requirements: 3.1, 4.1, 5.1_
  - [x] 4.6 Implementar `ImageAuthorizationService.assertCanWrite`
    - Permite se `ownerUserId === current.id` ou `roles` contém `admin`; senão `ForbiddenException`
    - Antes de fixar o nome da role, verificar no código/seed como a role admin é cadastrada, já que `Role.slug` é UUID no schema mas `@Roles('admin')` é usado nos controllers
    - _Requirements: 7.3, 7.5_
  - [ ]* 4.7 Escrever testes unitários de `ImageAuthorizationService` (dono, admin, terceiro)
    - **Property 4: Autorização**
    - **Validates: Requirements 7.2, 7.3, 7.5**

- [ ] 5. Implementar `ImagesService` e DTOs
  - [~] 5.1 Criar DTOs `ImageUrlDto`, `ReorderGalleryDto` e `ImageSetResponseDto` com `class-validator` e Swagger
    - _Requirements: 3.4, 4.4, 5.3, 6.4_
  - [~] 5.2 Implementar `setSingle` e `removeSingle` (avatar, logo, main)
    - Upload antes da persistência; compensação (apagar o novo objeto) se o update falhar
    - Remoção do objeto antigo após o commit, best effort, com log da chave órfã
    - Só apagar o objeto antigo se não estiver mais referenciado por `imageUrls` ou `mainImageUrl`
    - Remoção atualiza o banco primeiro e depois apaga o objeto
    - _Requirements: 3.1, 3.2, 3.5, 4.1, 4.2, 4.5, 5.1, 5.4, 6.1, 8.2, 8.3_
  - [~] 5.3 Implementar `addToGallery`
    - Validar `imageUrls.length + files.length` contra `MAX_GALLERY_SIZE` antes de qualquer upload (422, nada gravado)
    - Compensar uploads já feitos se algum falhar
    - Persistir em `prisma.$transaction` relendo e revalidando o limite
    - _Requirements: 2.5, 3.3, 4.3, 5.2, 8.2_
  - [~] 5.4 Implementar `removeFromGallery`, `promoteToMain`, `reorderGallery` e `list`
    - 404 se a URL não estiver na galeria; reordenação só com permutação exata (400 caso contrário, sem alterar nada)
    - _Requirements: 3.6, 3.7, 4.6, 5.5, 6.2, 6.3, 6.4, 6.5_
  - [ ]* 5.5 Escrever testes unitários de `ImagesService` com storage e targets mockados
    - Upload, substituição, promoção, remoção, limite da galeria, compensação em falha de persistência, objeto compartilhado entre principal e galeria
    - _Requirements: 11.3_
  - [ ]* 5.6 Escrever testes parametrizados das propriedades de galeria
    - **Property 3: Limite da galeria** e **Property 6: Reordenação preserva o conjunto**
    - **Validates: Requirements 2.5, 3.3, 6.4, 6.5**

- [ ] 6. Implementar controllers e wiring
  - [~] 6.1 Criar `UserImagesController` em `users/:slug/images`
    - Rotas: `GET` público, `PUT/DELETE avatar`, `PUT/DELETE/PATCH main`, `POST gallery` (`files`, máx. 10), `DELETE gallery` (`url` no corpo ou query), `PUT gallery/order`
    - `FileInterceptor`/`FilesInterceptor` com `memoryStorage()` e limite de 5 MB; `ParseUUIDPipe`; `@UseGuards(JwtAuthGuard, RolesGuard)`; `@ApiConsumes('multipart/form-data')`; `@Public()` só no `GET`
    - Declarar `gallery/order` antes de rotas parametrizadas
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 6.2, 6.4, 7.1, 7.2, 7.4_
  - [~] 6.2 Criar `EstablishmentImagesController` em `establishments/:slug/images` (com `logo` no lugar de `avatar`)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 7.1, 7.2_
  - [~] 6.3 Criar `ServiceOfferImagesController` em `service-offers/:slug/images` (sem rota de avatar/logo)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 7.1, 7.2_
  - [~] 6.4 Criar `ImagesModule` (providers, controllers, exporta `ImageCleanupService`) e importar `StorageModule` e `ImagesModule` em `AppModule`
    - `ImagesModule` não importa Users, Establishments nem ServiceOffers (evita ciclo)
    - _Requirements: 1.1, 7.1_
  - [ ]* 6.5 Escrever testes de controllers
    - 401 sem token, 403 terceiro, 404 slug inexistente, 413 e 415
    - _Requirements: 11.4_

- [~] 7. Checkpoint - módulo de imagens
  - Garantir que build e testes passam; perguntar ao usuário se houver dúvidas.

- [ ] 8. Limpeza de objetos órfãos e segurança dos DTOs
  - [~] 8.1 Implementar `ImageCleanupService` com `collect(entity, slug)` e `purge(urls)` (best effort com `Promise.allSettled` e log das chaves que falharem)
    - _Requirements: 8.1, 8.3, 8.4_
  - [~] 8.2 Integrar a limpeza em `UserService.remove`, `EstablishmentService.remove` e `ServiceOfferService.remove`
    - Coletar URLs, excluir o registro, depois `purge`; importar `ImagesModule` nos três módulos
    - _Requirements: 8.1, 8.4_
  - [~] 8.3 Remover `avatarUrl` e `logoUrl` dos DTOs de criação e atualização de User e Establishment
    - Antes, buscar usos em `apps/web` e `apps/api-e2e` e ajustar o que depender desses campos
    - _Requirements: 7.2, 7.6_
  - [ ]* 8.4 Escrever testes unitários de `ImageCleanupService`
    - Coleta inclui ofertas do estabelecimento; falha de S3 não propaga
    - _Requirements: 11.3_

- [ ] 9. Finalização
  - [~] 9.1 Decidir sobre `@aws-sdk/s3-request-presigner` (não usado no MVP) e confirmar que `multer`, `@types/multer`, `@nestjs/platform-express` e `@aws-sdk/client-s3` estão declarados
    - _Requirements: 10.5_
  - [~] 9.2 Atualizar a documentação em `.specs/codebase` (STACK, INTEGRATIONS) para AWS S3 + CloudFront, removendo a menção a Supabase
    - _Requirements: 10.6_
  - [~] 9.3 Rodar build, lint e a suíte de testes da API (`nx build api`, `nx lint api`, `nx test api`) e corrigir falhas
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

- [~] 10. Checkpoint final
  - Garantir que todos os testes passam; perguntar ao usuário se houver dúvidas.

## Notes

- Tarefas marcadas com `*` são opcionais (testes) e podem ser puladas para um MVP mais rápido.
- Cada tarefa referencia os requisitos de `requirements.md`; as propriedades referenciam `design.md`.
- Os checkpoints garantem validação incremental.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.3", "1.4", "1.5", "2.1", "4.1"] },
    { "id": 1, "tasks": ["1.2", "2.2", "4.2", "4.6"] },
    { "id": 2, "tasks": ["2.3", "2.4", "2.5", "4.3", "4.4", "4.7", "5.1"] },
    { "id": 3, "tasks": ["4.5"] },
    { "id": 4, "tasks": ["5.2", "5.3", "5.4"] },
    { "id": 5, "tasks": ["5.5", "5.6", "6.1", "6.2", "6.3", "8.1"] },
    { "id": 6, "tasks": ["6.4", "8.4"] },
    { "id": 7, "tasks": ["6.5", "8.2", "8.3"] },
    { "id": 8, "tasks": ["9.1", "9.2"] },
    { "id": 9, "tasks": ["9.3"] }
  ]
}
```
# Requirements Document

## Introduction

Esta funcionalidade adiciona suporte completo a imagens na API (apps/api, NestJS + Prisma + Postgres) para três entidades: User (avatar, imagem principal, galeria), Establishment (logo, imagem principal, galeria) e ServiceOffer (imagem principal, galeria). Os arquivos são armazenados em um bucket AWS S3 privado e servidos publicamente via CloudFront (AWS_CDN_URL). A infraestrutura Pulumi já provê bucket, CDN e usuário IAM. O schema Prisma já possui os campos (avatarUrl, logoUrl, mainImageUrl, imageUrls), porém não existe migration correspondente nem código de upload/storage.

O frontend (por exemplo, map-service-offer-to-card.ts, que hoje usa imageUrl: null fixo) é apenas consumidor das URLs e está fora do escopo.

## Glossary

- **API**: Aplicação NestJS em apps/api.
- **Storage_Module**: Módulo NestJS reutilizável que encapsula o cliente S3 e a geração de chaves e URLs.
- **Image_Service**: Serviço que orquestra validação, upload, persistência e remoção de imagens para as entidades.
- **Image_Validator**: Componente que valida tipo MIME, tamanho e quantidade de imagens.
- **Bucket**: Bucket S3 privado configurado em AWS_S3_BUCKET.
- **CDN_URL**: URL base do CloudFront configurada em AWS_CDN_URL.
- **Object_Key**: Caminho do objeto no Bucket, no formato `{entidade}/{slug}/{papel}/{uuid}.{ext}`.
- **Owner**: Usuário autenticado que é o próprio User, ou proprietário do Establishment, ou proprietário do Establishment ao qual a ServiceOffer pertence.
- **Admin**: Usuário com role ADMIN conforme o módulo roles existente.
- **Gallery**: Lista ordenada de URLs no campo imageUrls de uma entidade.
- **Main_Image**: Imagem de destaque da entidade, armazenada em mainImageUrl.
- **Avatar**: Imagem de perfil do User, armazenada em avatarUrl.
- **Logo**: Logotipo do Establishment, armazenado em logoUrl.
- **Slug**: Identificador público UUID da entidade.
- **Allowed_MIME_Types**: image/jpeg, image/png e image/webp.
- **Max_File_Size**: Tamanho máximo por arquivo (padrão 5 MB, ver Decisões em aberto).
- **Max_Gallery_Size**: Quantidade máxima de imagens na Gallery (padrão 10, ver Decisões em aberto).

## Requirements

### Requirement 1: Módulo de storage reutilizável

**User Story:** Como desenvolvedor, quero um módulo de storage reutilizável sobre o S3, para que qualquer módulo da API envie e remova arquivos de forma consistente.

#### Acceptance Criteria

1. THE Storage_Module SHALL expor operações de upload, remoção e geração de URL pública de objetos.
2. THE Storage_Module SHALL criar o cliente S3 a partir das variáveis AWS_REGION, AWS_S3_BUCKET, AWS_ACCESS_KEY_ID e AWS_SECRET_ACCESS_KEY.
3. WHEN um objeto é enviado, THE Storage_Module SHALL gravá-lo no Bucket usando uma Object_Key no formato `{entidade}/{slug}/{papel}/{uuid}.{ext}`.
4. WHEN uma URL pública é solicitada para uma Object_Key, THE Storage_Module SHALL retornar a concatenação de CDN_URL e Object_Key.
5. WHEN uma URL pública armazenada é fornecida para remoção, THE Storage_Module SHALL derivar a Object_Key removendo o prefixo CDN_URL e remover o objeto do Bucket.
6. IF uma variável de ambiente obrigatória do storage estiver ausente na inicialização, THEN THE API SHALL falhar a inicialização com mensagem identificando a variável ausente.
7. IF uma operação no S3 falhar, THEN THE Storage_Module SHALL registrar o erro em log e lançar uma exceção que a API converte em HTTP 502.

### Requirement 2: Validação de arquivos

**User Story:** Como mantenedor da plataforma, quero validar os arquivos enviados, para que apenas imagens adequadas sejam armazenadas.

#### Acceptance Criteria

1. WHEN um arquivo é recebido, THE Image_Validator SHALL aceitar o arquivo somente se o tipo MIME pertencer a Allowed_MIME_Types.
2. IF o tipo MIME do arquivo não pertencer a Allowed_MIME_Types, THEN THE API SHALL responder HTTP 415 com mensagem indicando os tipos aceitos.
3. IF o tamanho do arquivo exceder Max_File_Size, THEN THE API SHALL responder HTTP 413 com mensagem indicando o limite.
4. IF a requisição de upload não contiver arquivo, THEN THE API SHALL responder HTTP 400.
5. IF a adição de imagens fizer a Gallery exceder Max_Gallery_Size, THEN THE API SHALL responder HTTP 422 e não gravar nenhum arquivo da requisição.
6. WHEN um arquivo é recebido, THE Image_Validator SHALL verificar a assinatura binária (magic bytes) do arquivo e rejeitar com HTTP 415 o arquivo cuja assinatura divergir do tipo MIME declarado.

### Requirement 3: Imagens do User

**User Story:** Como usuário, quero gerenciar meu avatar, imagem principal e galeria, para que meu perfil seja personalizado.

#### Acceptance Criteria

1. WHEN o Owner envia um arquivo válido para o avatar, THE Image_Service SHALL gravar o arquivo no Bucket e persistir a URL em avatarUrl.
2. WHEN o Owner envia um arquivo válido para a imagem principal, THE Image_Service SHALL gravar o arquivo no Bucket e persistir a URL em mainImageUrl.
3. WHEN o Owner envia um ou mais arquivos válidos para a galeria, THE Image_Service SHALL gravar os arquivos no Bucket e acrescentar as URLs ao final de imageUrls.
4. WHEN um User é consultado, THE API SHALL retornar avatarUrl, mainImageUrl e imageUrls como URLs completas do CDN_URL.
5. WHEN o Owner remove o avatar ou a imagem principal, THE Image_Service SHALL remover o objeto do Bucket e definir o campo correspondente como nulo.
6. WHEN o Owner remove uma imagem da galeria, THE Image_Service SHALL remover o objeto do Bucket e retirar a URL de imageUrls.
7. IF a URL informada para remoção não existir no registro do User, THEN THE API SHALL responder HTTP 404.

### Requirement 4: Imagens do Establishment

**User Story:** Como proprietário de estabelecimento, quero gerenciar logo, imagem principal e galeria, para apresentar meu negócio aos clientes.

#### Acceptance Criteria

1. WHEN o Owner envia um arquivo válido para o logo, THE Image_Service SHALL gravar o arquivo no Bucket e persistir a URL em logoUrl.
2. WHEN o Owner envia um arquivo válido para a imagem principal, THE Image_Service SHALL gravar o arquivo no Bucket e persistir a URL em mainImageUrl.
3. WHEN o Owner envia um ou mais arquivos válidos para a galeria, THE Image_Service SHALL gravar os arquivos no Bucket e acrescentar as URLs ao final de imageUrls.
4. WHEN um Establishment é consultado, THE API SHALL retornar logoUrl, mainImageUrl e imageUrls como URLs completas do CDN_URL.
5. WHEN o Owner remove o logo ou a imagem principal, THE Image_Service SHALL remover o objeto do Bucket e definir o campo correspondente como nulo.
6. WHEN o Owner remove uma imagem da galeria, THE Image_Service SHALL remover o objeto do Bucket e retirar a URL de imageUrls.
7. IF o Establishment identificado pelo Slug não existir, THEN THE API SHALL responder HTTP 404.

### Requirement 5: Imagens da ServiceOffer

**User Story:** Como proprietário de estabelecimento, quero gerenciar a imagem principal e a galeria de cada oferta de serviço, para destacar o que ofereço.

#### Acceptance Criteria

1. WHEN o Owner envia um arquivo válido para a imagem principal, THE Image_Service SHALL gravar o arquivo no Bucket e persistir a URL em mainImageUrl.
2. WHEN o Owner envia um ou mais arquivos válidos para a galeria, THE Image_Service SHALL gravar os arquivos no Bucket e acrescentar as URLs ao final de imageUrls.
3. WHEN uma ServiceOffer é consultada, THE API SHALL retornar mainImageUrl e imageUrls como URLs completas do CDN_URL.
4. WHEN o Owner remove a imagem principal, THE Image_Service SHALL remover o objeto do Bucket e definir mainImageUrl como nulo.
5. WHEN o Owner remove uma imagem da galeria, THE Image_Service SHALL remover o objeto do Bucket e retirar a URL de imageUrls.
6. IF a ServiceOffer identificada pelo Slug não existir, THEN THE API SHALL responder HTTP 404.

### Requirement 6: Substituição, imagem principal e ordenação

**User Story:** Como Owner, quero substituir imagens, promover uma imagem da galeria a principal e ordenar a galeria, para controlar a apresentação visual.

#### Acceptance Criteria

1. WHEN o Owner envia um arquivo válido para um campo de imagem única já preenchido, THE Image_Service SHALL gravar o novo arquivo, persistir a nova URL e remover o objeto anterior do Bucket.
2. WHEN o Owner define uma imagem da Gallery como Main_Image, THE Image_Service SHALL atualizar mainImageUrl com a URL escolhida.
3. IF a URL escolhida como Main_Image não pertencer à Gallery da entidade, THEN THE API SHALL responder HTTP 404.
4. WHERE a ordenação da galeria estiver habilitada, WHEN o Owner envia uma nova ordem contendo exatamente o mesmo conjunto de URLs de imageUrls, THE Image_Service SHALL persistir imageUrls na ordem informada.
5. IF a nova ordem da galeria contiver URLs ausentes, duplicadas ou desconhecidas, THEN THE API SHALL responder HTTP 400 e manter imageUrls inalterado.

### Requirement 7: Autorização e leitura pública

**User Story:** Como proprietário, quero que somente eu e administradores alterem minhas imagens, para evitar alterações indevidas, e quero que visitantes vejam as imagens sem autenticação.

#### Acceptance Criteria

1. THE API SHALL permitir leitura das URLs de imagens sem autenticação nos endpoints públicos de consulta de User, Establishment e ServiceOffer.
2. WHEN uma operação de criação, substituição, ordenação ou remoção de imagem é solicitada, THE API SHALL exigir autenticação via guard JWT.
3. IF a requisição de escrita não for de um Owner nem de um Admin, THEN THE API SHALL responder HTTP 403.
4. IF a requisição de escrita não contiver token JWT válido, THEN THE API SHALL responder HTTP 401.
5. WHEN um Admin solicita uma operação de escrita de imagem, THE API SHALL executar a operação para qualquer entidade, conforme o módulo roles existente.
6. THE Bucket SHALL permanecer privado, e THE API SHALL expor os objetos somente pelo CDN_URL.

### Requirement 8: Limpeza de objetos órfãos

**User Story:** Como mantenedor, quero que objetos sem referência sejam removidos do S3, para evitar custo e dados residuais.

#### Acceptance Criteria

1. WHEN um User, Establishment ou ServiceOffer é excluído, THE Image_Service SHALL remover do Bucket todos os objetos referenciados por seus campos de imagem.
2. WHEN a persistência no banco falhar após o upload de um arquivo, THE Image_Service SHALL remover o objeto recém-enviado do Bucket.
3. IF a remoção de um objeto anterior falhar após a substituição bem-sucedida, THEN THE Image_Service SHALL registrar em log a Object_Key órfã e concluir a requisição com sucesso.
4. WHEN um Establishment é excluído, THE Image_Service SHALL remover também os objetos de imagem das ServiceOffers pertencentes a ele.

### Requirement 9: Migration Prisma e client gerado

**User Story:** Como desenvolvedor, quero que o banco reflita o schema Prisma, para que os campos de imagem existam em todos os ambientes.

#### Acceptance Criteria

1. THE API SHALL incluir uma migration Prisma em apps/api/prisma/migrations que crie mainImageUrl e imageUrls para User, Establishment e ServiceOffer, além de avatarUrl e logoUrl caso ainda não existam em migrations anteriores.
2. WHEN a migration é aplicada em um banco existente, THE migration SHALL definir imageUrls como array vazio para registros existentes e preservar os dados atuais.
3. WHEN o schema Prisma é alterado, THE API SHALL regenerar o client em apps/api/src/generated e commitar o resultado junto com a migration.
4. WHEN `prisma migrate status` é executado após a aplicação, THE Prisma SHALL reportar o banco em sincronia com o schema.

### Requirement 10: Configuração e ambiente

**User Story:** Como desenvolvedor, quero variáveis documentadas e dependências consistentes, para configurar o ambiente local sem ambiguidade.

#### Acceptance Criteria

1. THE apps/api/.env.example SHALL listar AWS_REGION, AWS_S3_BUCKET, AWS_CDN_URL, AWS_ACCESS_KEY_ID e AWS_SECRET_ACCESS_KEY com valores de exemplo sem credenciais reais.
2. THE infra/src/backend.ts SHALL injetar AWS_REGION no ambiente do backend, além das variáveis já injetadas.
3. THE API SHALL ler a configuração de storage pelo mecanismo de configuração do NestJS usado nos demais módulos, com validação das variáveis obrigatórias.
4. THE pnpm-workspace.yaml SHALL conter o bloco allowBuilds com cada entrada definida explicitamente como true ou false, sem placeholders, ou ter o bloco autogerado revertido.
5. THE package.json da API SHALL declarar @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, multer, @types/multer e @nestjs/platform-express nas dependências efetivamente usadas pelo código.
6. THE documentação do repositório SHALL tratar AWS S3 com CloudFront como provedor de storage, e não Supabase.

### Requirement 11: Testes unitários

**User Story:** Como desenvolvedor, quero testes unitários da funcionalidade, para evitar regressões.

#### Acceptance Criteria

1. THE Storage_Module SHALL possuir testes unitários com cliente S3 simulado cobrindo upload, remoção, geração de Object_Key e geração de URL.
2. THE Image_Validator SHALL possuir testes unitários cobrindo tipo MIME inválido, assinatura divergente, arquivo acima de Max_File_Size e galeria acima de Max_Gallery_Size.
3. THE Image_Service SHALL possuir testes unitários cobrindo upload, substituição, definição de imagem principal, remoção e limpeza após falha de persistência, com storage e repositórios simulados.
4. THE controllers de imagem SHALL possuir testes unitários cobrindo respostas 401, 403 e 404.

## Decisões em aberto

Cada item abaixo traz a sugestão padrão adotada nestes requisitos até confirmação.

1. Mecanismo de upload: multipart via multer (padrão sugerido para o MVP) ou presigned URL via @aws-sdk/s3-request-presigner. Multipart simplifica validação e limpeza; presigned URL reduz carga na API e pode ser adotada depois.
2. Limites: Max_File_Size de 5 MB por arquivo; Max_Gallery_Size de 10 imagens para User e ServiceOffer e 20 para Establishment.
3. Política de leitura (ACL): Bucket privado com leitura somente via CloudFront (OAC), sem ACL pública por objeto, conforme a infra existente.
4. Galeria reordenável: sim, via endpoint de reordenação (Requirement 6.4); caso contrário, a ordem é a de inserção.
5. Formato de resposta: persistir URLs completas do CDN_URL (padrão) ou apenas Object_Key e montar a URL na leitura. O padrão mantém compatibilidade com os campos String já existentes, mas dificulta troca futura de domínio.

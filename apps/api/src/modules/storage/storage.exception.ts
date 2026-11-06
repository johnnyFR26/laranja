import { BadGatewayException } from '@nestjs/common';

export class StorageException extends BadGatewayException {
  constructor(message = 'Falha ao comunicar com o serviço de armazenamento') {
    super(message);
  }
}

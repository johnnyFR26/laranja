import { ForbiddenException, Injectable } from '@nestjs/common';

/**
 * Nome da role administradora. O `JwtStrategy` devolve `roles` como `Role.slug`
 * e os controllers existentes usam `@Roles('admin')`, então o mesmo valor é usado aqui.
 */
export const ADMIN_ROLE = 'admin';

/** Tipo estrutural mínimo; compatível com `ImageTargetRecord` do design. */
export interface ImageOwnedRecord {
  ownerUserId: number;
}

export interface ImageCurrentUser {
  id: number;
  roles: string[];
}

@Injectable()
export class ImageAuthorizationService {
  /** Permite a escrita ao dono do recurso ou a um admin; caso contrário, 403. */
  assertCanWrite(record: ImageOwnedRecord, current: ImageCurrentUser): void {
    const isOwner = record.ownerUserId === current.id;
    const isAdmin = (current.roles ?? []).includes(ADMIN_ROLE);

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('Você não tem permissão para alterar as imagens deste recurso');
    }
  }
}

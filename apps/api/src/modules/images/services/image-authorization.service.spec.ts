import { ForbiddenException } from '@nestjs/common';
import { ImageAuthorizationService } from './image-authorization.service';

describe('ImageAuthorizationService', () => {
  const service = new ImageAuthorizationService();
  const record = { ownerUserId: 1 };

  it('permite o dono', () => {
    expect(() => service.assertCanWrite(record, { id: 1, roles: [] })).not.toThrow();
  });

  it('permite admin que não é dono', () => {
    expect(() => service.assertCanWrite(record, { id: 2, roles: ['admin'] })).not.toThrow();
  });

  it('nega terceiro sem role admin com 403', () => {
    expect(() => service.assertCanWrite(record, { id: 2, roles: ['user'] })).toThrow(ForbiddenException);
  });
});

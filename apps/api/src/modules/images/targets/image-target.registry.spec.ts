import { NotFoundException } from '@nestjs/common';
import { EstablishmentImageTarget } from './establishment-image.target';
import { ImageTargetRegistry } from './image-target.registry';
import { ServiceOfferImageTarget } from './service-offer-image.target';
import { UserImageTarget } from './user-image.target';

describe('ImageTargetRegistry', () => {
  const user = { entity: 'user' } as UserImageTarget;
  const establishment = {
    entity: 'establishment',
  } as EstablishmentImageTarget;
  const offer = { entity: 'service-offer' } as ServiceOfferImageTarget;
  const registry = new ImageTargetRegistry(user, establishment, offer);

  it('retorna o target de cada entidade', () => {
    expect(registry.get('user')).toBe(user);
    expect(registry.get('establishment')).toBe(establishment);
    expect(registry.get('service-offer')).toBe(offer);
  });

  it('lança NotFoundException para entidade desconhecida', () => {
    expect(() => registry.get('x' as never)).toThrow(NotFoundException);
  });
});

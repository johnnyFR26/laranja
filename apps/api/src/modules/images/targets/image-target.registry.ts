import { Injectable, NotFoundException } from '@nestjs/common';
import { ImageEntityType } from '../image.constants';
import { EstablishmentImageTarget } from './establishment-image.target';
import { ImageTarget } from './image-target.interface';
import { ServiceOfferImageTarget } from './service-offer-image.target';
import { UserImageTarget } from './user-image.target';

@Injectable()
export class ImageTargetRegistry {
  private readonly targets: ReadonlyMap<ImageEntityType, ImageTarget>;

  constructor(
    userTarget: UserImageTarget,
    establishmentTarget: EstablishmentImageTarget,
    serviceOfferTarget: ServiceOfferImageTarget,
  ) {
    this.targets = new Map<ImageEntityType, ImageTarget>(
      [userTarget, establishmentTarget, serviceOfferTarget].map((t) => [
        t.entity,
        t,
      ]),
    );
  }

  get(entity: ImageEntityType): ImageTarget {
    const target = this.targets.get(entity);
    if (!target) {
      throw new NotFoundException(`Entidade sem suporte a imagens: ${entity}`);
    }
    return target;
  }
}

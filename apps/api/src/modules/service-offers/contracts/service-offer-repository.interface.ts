import { ServiceOffer } from '../../../generated/client';
import { IBaseRepository } from '../../../common/contracts/base-repository.interface';

export interface IServiceOfferRepository extends IBaseRepository<ServiceOffer> {
  findByEstablishment(establishmentSlug: string): Promise<ServiceOffer[]>;
  findByCategory(categorySlug: string): Promise<ServiceOffer[]>;
  findWithRelations(slug: string): Promise<ServiceOffer | null>;
}

import { ServiceOffer } from '../../../generated/client';
import { IBaseRepository } from '../../../common/contracts/base-repository.interface';

export interface IServiceOfferRepository extends IBaseRepository<ServiceOffer> {
  findByEstablishment(establishmentId: string): Promise<ServiceOffer[]>;
  findByCategory(categoryId: string): Promise<ServiceOffer[]>;
  findWithRelations(id: string): Promise<ServiceOffer | null>;
}

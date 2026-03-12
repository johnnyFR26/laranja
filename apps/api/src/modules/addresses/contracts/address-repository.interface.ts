import { Address } from '../../../generated/client';
import { IBaseRepository } from '../../../common/contracts/base-repository.interface';

export interface IAddressRepository extends IBaseRepository<Address> {
  findBySlug(slug: string): Promise<Address | null>;
}

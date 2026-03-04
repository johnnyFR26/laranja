import { IBaseRepository } from '../../../common/contracts/base-repository.interface';
import { Role } from '../../../generated/client';

export interface IRoleRepository extends IBaseRepository<Role> {
  findBySlug(slug: string): Promise<Role | null>;
  findByName(name: string): Promise<Role | null>;
}

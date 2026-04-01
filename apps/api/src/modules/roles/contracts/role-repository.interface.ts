import { IBaseRepository } from '../../../common/contracts/base-repository.interface';
import { Role } from '../../../generated/client';
import { CreateRoleDto } from '../dto';

export interface IRoleRepository extends IBaseRepository<Role> {
  findByName(name: string): Promise<Role | null>;
  createMany(roles: CreateRoleDto[]): Promise<Role[]>;
}

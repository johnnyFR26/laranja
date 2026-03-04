import { User } from '../../../generated/client';
import { IBaseRepository } from '../../../common/contracts/base-repository.interface';

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findWithRoles(id: string): Promise<User | null>;
}

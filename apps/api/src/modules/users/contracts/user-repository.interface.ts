import { User } from '../../../generated/client';
import { IBaseRepository } from '../../../common/contracts/base-repository.interface';

export interface IUserRepository extends IBaseRepository<User> {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findWithRoles(id: number): Promise<User | null>;
}

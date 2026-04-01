import { Injectable } from '@nestjs/common';
import { Address } from '../../../generated/client';
import { PrismaService } from '../../../database/prisma.service';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { IAddressRepository } from '../contracts/address-repository.interface';

@Injectable()
export class AddressRepository extends BaseRepository<Address> implements IAddressRepository {
  constructor(prisma: PrismaService) {
    super(prisma, 'address');
  }
}

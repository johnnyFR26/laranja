import { Injectable, BadRequestException } from '@nestjs/common';
import { Address } from '../../../generated/client';
import { PrismaService } from '../../../database/prisma.service';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { IAddressRepository } from '../contracts/address-repository.interface';

@Injectable()
export class AddressRepository extends BaseRepository<Address> implements IAddressRepository {
  constructor(prisma: PrismaService) {
    super(prisma, 'address');
  }

  private parseId(id: string): number {
    const num = parseInt(id, 10);
    if (Number.isNaN(num)) {
      throw new BadRequestException('ID do endereço deve ser um número válido');
    }
    return num;
  }

  async findById(id: string): Promise<Address | null> {
    return this.model.findUnique({
      where: { id: this.parseId(id) },
    });
  }

  async findBySlug(slug: string): Promise<Address | null> {
    return this.model.findUnique({
      where: { slug },
    });
  }

  async update(id: string, data: Partial<Address>): Promise<Address> {
    return this.model.update({
      where: { id: this.parseId(id) },
      data: data as any,
    });
  }

  async delete(id: string): Promise<void> {
    await this.model.delete({
      where: { id: this.parseId(id) },
    });
  }
}

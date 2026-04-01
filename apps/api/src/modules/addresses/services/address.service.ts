import { Injectable, NotFoundException } from '@nestjs/common';
import { Address } from '../../../generated/client';
import { AddressRepository } from '../repositories/address.repository';
import { CreateAddressDto, UpdateAddressDto, FilterAddressDto } from '../dto';
import { IPaginatedResult } from '../../../common/contracts/base-repository.interface';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    return this.addressRepository.create(createAddressDto as Partial<Address>);
  }

  async findAll(filters: FilterAddressDto): Promise<IPaginatedResult<Address>> {
    const { search, ...pagination } = filters;

    const where: any = {};

    if (search) {
      where.OR = [
        { city: { contains: search, mode: 'insensitive' } },
        { neighborhood: { contains: search, mode: 'insensitive' } },
        { street: { contains: search, mode: 'insensitive' } },
        { zipCode: { contains: search, mode: 'insensitive' } },
      ];
    }

    return this.addressRepository.paginate({
      ...pagination,
      ...where,
    });
  }

  async findOne(slug: string): Promise<Address> {
    const address = await this.addressRepository.findBySlug(slug);
    if (!address) {
      throw new NotFoundException('Endereço não encontrado');
    }
    return address;
  }

  async update(slug: string, updateAddressDto: UpdateAddressDto): Promise<Address> {
    await this.findOne(slug);
    return this.addressRepository.update(slug, updateAddressDto as Partial<Address>);
  }

  async remove(slug: string): Promise<void> {
    await this.findOne(slug);
    await this.addressRepository.delete(slug);
  }
}

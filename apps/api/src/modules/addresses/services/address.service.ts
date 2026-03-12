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

  async findOne(id: string): Promise<Address> {
    const address = await this.addressRepository.findById(id);
    if (!address) {
      throw new NotFoundException('Endereço não encontrado');
    }
    return address;
  }

  async findBySlug(slug: string): Promise<Address | null> {
    return this.addressRepository.findBySlug(slug);
  }

  async update(id: string, updateAddressDto: UpdateAddressDto): Promise<Address> {
    await this.findOne(id);
    return this.addressRepository.update(id, updateAddressDto as Partial<Address>);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.addressRepository.delete(id);
  }
}

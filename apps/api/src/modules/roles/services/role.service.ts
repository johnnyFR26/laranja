import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { RoleRepository } from '../repositories/role.repository';
import { CreateRoleDto, CreateManyRolesDto, UpdateRoleDto, FilterRoleDto, AssignRoleDto, RemoveRoleDto } from '../dto';
import { IPaginatedResult } from '../../../common/contracts/base-repository.interface';
import { Role } from '../../../generated/client';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    // Check if slug already exists (when provided)
    if (createRoleDto.slug) {
      const existingBySlug = await this.roleRepository.findBySlug(createRoleDto.slug);
      if (existingBySlug) {
        throw new ConflictException(`Role with slug '${createRoleDto.slug}' already exists`);
      }
    }

    // Check if name already exists
    const existingByName = await this.roleRepository.findByName(createRoleDto.name);
    if (existingByName) {
      throw new ConflictException(`Role with name '${createRoleDto.name}' already exists`);
    }

    return this.roleRepository.create(createRoleDto);
  }

  async createMany(createManyRolesDto: CreateManyRolesDto): Promise<{ created: Role[]; count: number }> {
    const { roles } = createManyRolesDto;

    // Check for duplicates within the request (same slug or name)
    const slugs = new Set<string>();
    const names = new Set<string>();
    for (const r of roles) {
      if (r.slug && slugs.has(r.slug)) {
        throw new BadRequestException(`Duplicate slug '${r.slug}' in request`);
      }
      if (names.has(r.name)) {
        throw new BadRequestException(`Duplicate name '${r.name}' in request`);
      }
      if (r.slug) slugs.add(r.slug);
      names.add(r.name);
    }

    const created = await this.roleRepository.createMany(roles);
    return { created, count: created.length };
  }

  async findAll(filterDto: FilterRoleDto): Promise<IPaginatedResult<Role>> {
    const { page = 1, limit = 10, search, status } = filterDto;

    const where: Record<string, unknown> = {};

    if (status !== undefined) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    return this.roleRepository.findAllPaginated({ page, limit }, where);
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.roleRepository.findById(id);
    if (!role) {
      throw new NotFoundException(`Role with ID '${id}' not found`);
    }
    return role;
  }

  async findBySlug(slug: string): Promise<Role> {
    const role = await this.roleRepository.findBySlug(slug);
    if (!role) {
      throw new NotFoundException(`Role with slug '${slug}' not found`);
    }
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const existingRole = await this.roleRepository.findById(id);
    if (!existingRole) {
      throw new NotFoundException(`Role with ID '${id}' not found`);
    }

    // Check if slug is being updated and if it conflicts
    if (updateRoleDto.slug && updateRoleDto.slug !== existingRole.slug) {
      const existingBySlug = await this.roleRepository.findBySlug(updateRoleDto.slug);
      if (existingBySlug) {
        throw new ConflictException(`Role with slug '${updateRoleDto.slug}' already exists`);
      }
    }

    // Check if name is being updated and if it conflicts
    if (updateRoleDto.name && updateRoleDto.name !== existingRole.name) {
      const existingByName = await this.roleRepository.findByName(updateRoleDto.name);
      if (existingByName) {
        throw new ConflictException(`Role with name '${updateRoleDto.name}' already exists`);
      }
    }

    return this.roleRepository.update(id, updateRoleDto);
  }

  async remove(id: string): Promise<{ message: string }> {
    const existingRole = await this.roleRepository.findById(id);
    if (!existingRole) {
      throw new NotFoundException(`Role with ID '${id}' not found`);
    }

    await this.roleRepository.delete(id);
    return { message: `Role '${existingRole.name}' deleted successfully` };
  }

  async getUserRoles(userId: string): Promise<Role[]> {
    return this.roleRepository.getUserRoles(userId);
  }

  async assignRolesToUser(assignRoleDto: AssignRoleDto): Promise<{ message: string }> {
    const { userId, roleIds } = assignRoleDto;

    // Validate that all roles exist
    for (const roleId of roleIds) {
      const role = await this.roleRepository.findById(roleId);
      if (!role) {
        throw new BadRequestException(`Role with ID '${roleId}' not found`);
      }
    }

    await this.roleRepository.assignRolesToUser(userId, roleIds);
    return { message: `Successfully assigned ${roleIds.length} role(s) to user` };
  }

  async removeRolesFromUser(removeRoleDto: RemoveRoleDto): Promise<{ message: string }> {
    const { userId, roleIds } = removeRoleDto;

    await this.roleRepository.removeRolesFromUser(userId, roleIds);
    return { message: `Successfully removed ${roleIds.length} role(s) from user` };
  }

  async setUserRoles(userId: string, roleIds: string[]): Promise<{ message: string }> {
    // Validate that all roles exist
    for (const roleId of roleIds) {
      const role = await this.roleRepository.findById(roleId);
      if (!role) {
        throw new BadRequestException(`Role with ID '${roleId}' not found`);
      }
    }

    await this.roleRepository.setUserRoles(userId, roleIds);
    return { message: `Successfully set ${roleIds.length} role(s) for user` };
  }
}

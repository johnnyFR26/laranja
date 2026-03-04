import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { RoleService } from '../services/role.service';
import { CreateRoleDto, UpdateRoleDto, FilterRoleDto, AssignRoleDto, RemoveRoleDto } from '../dto';
import { Roles, Public } from '../../../common/decorators';

@ApiTags('Roles')
@ApiBearerAuth()
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({ status: 201, description: 'Role created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin only' })
  @ApiResponse({ status: 409, description: 'Conflict - Role already exists' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all roles with pagination' })
  @ApiResponse({ status: 200, description: 'List of roles' })
  findAll(@Query() filterDto: FilterRoleDto) {
    return this.roleService.findAll(filterDto);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get a role by ID' })
  @ApiParam({ name: 'id', description: 'Role UUID' })
  @ApiResponse({ status: 200, description: 'Role found' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.roleService.findOne(id);
  }

  @Get('slug/:slug')
  @Public()
  @ApiOperation({ summary: 'Get a role by slug' })
  @ApiParam({ name: 'slug', description: 'Role slug' })
  @ApiResponse({ status: 200, description: 'Role found' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  findBySlug(@Param('slug') slug: string) {
    return this.roleService.findBySlug(slug);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update a role' })
  @ApiParam({ name: 'id', description: 'Role UUID' })
  @ApiResponse({ status: 200, description: 'Role updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin only' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  @ApiResponse({ status: 409, description: 'Conflict - Role already exists' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a role' })
  @ApiParam({ name: 'id', description: 'Role UUID' })
  @ApiResponse({ status: 200, description: 'Role deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin only' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.roleService.remove(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all roles for a user' })
  @ApiParam({ name: 'userId', description: 'User UUID' })
  @ApiResponse({ status: 200, description: 'List of user roles' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getUserRoles(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.roleService.getUserRoles(userId);
  }

  @Post('assign')
  @Roles('admin')
  @ApiOperation({ summary: 'Assign roles to a user' })
  @ApiResponse({ status: 201, description: 'Roles assigned successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid role ID' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin only' })
  assignRolesToUser(@Body() assignRoleDto: AssignRoleDto) {
    return this.roleService.assignRolesToUser(assignRoleDto);
  }

  @Post('remove')
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove roles from a user' })
  @ApiResponse({ status: 200, description: 'Roles removed successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin only' })
  removeRolesFromUser(@Body() removeRoleDto: RemoveRoleDto) {
    return this.roleService.removeRolesFromUser(removeRoleDto);
  }

  @Patch('user/:userId/set')
  @Roles('admin')
  @ApiOperation({ summary: 'Set all roles for a user (replaces existing roles)' })
  @ApiParam({ name: 'userId', description: 'User UUID' })
  @ApiResponse({ status: 200, description: 'User roles set successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid role ID' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin only' })
  setUserRoles(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body('roleIds') roleIds: string[],
  ) {
    return this.roleService.setUserRoles(userId, roleIds);
  }
}

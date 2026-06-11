import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import {
  AssignRoleRequestDto,
  CreateRoleDto,
  RoleResponseDto,
  UpdateRoleDto,
  UserResponseDto,
} from '@dad-group-1/backend-common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('roles')
export class AuthorizationController {
  private readonly logger = new Logger(AuthorizationController.name);
  constructor(private authorizationService: AuthorizationService) {}

  @Post()
  @ApiBody({ type: CreateRoleDto })
  @ApiGlobalResponse(RoleResponseDto)
  @ApiOperation({
    summary: 'Create a new role',
    description: 'Add a new role to the system.',
  })
  create(@Body() body: CreateRoleDto): Observable<RoleResponseDto> {
    this.logger.log('Creating a new role record');
    return this.authorizationService.create(body);
  }

  @ApiOperation({
    summary: 'Get all roles',
    description: 'Retrieve a list of all roles in the system.',
  })
  @Get()
  @ApiGlobalResponse(RoleResponseDto)
  findAll(): Observable<RoleResponseDto[]> {
    this.logger.log('Retrieving all role records');
    return this.authorizationService.findAll();
  }

  @ApiOperation({
    summary: 'Get role by ID',
    description: 'Retrieve a specific role by its ID.',
  })
  @Get(':id')
  @ApiGlobalResponse(RoleResponseDto)
  findOne(@Param('id') id: string): Observable<RoleResponseDto> {
    this.logger.log('Retrieving role record with ID: ' + id);
    return this.authorizationService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update role',
    description: 'Update the details of an existing role.',
  })
  @Patch(':id')
  @ApiBody({ type: UpdateRoleDto })
  @ApiGlobalResponse(RoleResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Observable<RoleResponseDto> {
    this.logger.log('Updating role record with ID: ' + id);
    return this.authorizationService.update(id, updateRoleDto);
  }

  @ApiOperation({
    summary: 'Delete role',
    description: 'Remove a role from the system.',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Observable<unknown> {
    this.logger.log('Deleting role record with ID: ' + id);
    return this.authorizationService.remove(id);
  }
}

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller()
export class UserRoleController {
  private readonly logger = new Logger(UserRoleController.name);
  constructor(private authorizationService: AuthorizationService) {}

  /*@ApiOperation({
    summary: 'Add role to user',
    description: 'Assign a specific role to a user.',
  })
  @Post('/users/:id/roles/add')
  @ApiBody({ type: AddRoleToUserDto })
  @ApiGlobalResponse(UserRoleResponseDto)
  addRoleToUser(
    @Param('id') id: string,
    @Body() body: AddRoleToUserDto,
  ): Observable<UserRoleResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.authorizationService.addRoleToUser(Number(id), body);
  }*/

  /*@ApiOperation({
    summary: 'Remove role from user',
    description: 'Remove a specific role from a user.',
  })
  @Delete('/users/:id/roles/:roleId/remove')
  removeUserRole(
    @Param('id') id: string,
    @Param('roleId') roleId: string,
  ): Observable<unknown> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    assertObjectIsNumber(roleId, `Invalid ID: '${roleId}' is not a number`);
    return this.authorizationService.removeUserRole(Number(id), Number(roleId));
  }*/

  /*@ApiOperation({
    summary: 'Assign roles to user',
    description: 'Assign multiple roles to a user, replacing existing roles.',
  })
  @Put('/users/:id/roles/assign')
  @ApiBody({ type: AssignRolesDto })
  @ApiGlobalResponse(UserRoleResponseDto)
  assignRoles(
    @Param('id') id: string,
    @Body() body: AssignRolesDto,
  ): Observable<UserRoleResponseDto[]> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.authorizationService.assignRoles(Number(id), body);
  }*/

  @ApiOperation({
    summary: 'Assign role to user',
    description: 'Assign role to a user, replacing existing role.',
  })
  @Put('/users/:id/roles/assign')
  @ApiBody({ type: AssignRoleRequestDto })
  @ApiGlobalResponse(UserResponseDto)
  assignRole(
    @Param('id') id: string,
    @Body() body: { role_id: number },
  ): Observable<UserResponseDto> {
    this.logger.log(`Assigning role ID ${body.role_id} to user ID ${id}`);
    return this.authorizationService.assignRole(id, body);
  }

  /*@ApiOperation({
    summary: 'Get user roles',
    description: 'Retrieve all roles assigned to a specific user.',
  })
  @Get('/users/:id/roles')
  @ApiGlobalResponse(UserRoleResponseDto)
  getUserRoles(@Param('id') id: string): Observable<UserRoleResponseDto[]> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.authorizationService.getUserRoles(Number(id));
  }*/

  @ApiOperation({
    summary: 'Get user role',
    description: 'Retrieve the role assigned to a specific user.',
  })
  @Get('/users/:id/role')
  @ApiGlobalResponse(RoleResponseDto)
  getUserRole(@Param('id') id: string): Observable<RoleResponseDto> {
    this.logger.log(`Retrieving role for user ID ${id}`);
    return this.authorizationService.getUserRole(id);
  }
}

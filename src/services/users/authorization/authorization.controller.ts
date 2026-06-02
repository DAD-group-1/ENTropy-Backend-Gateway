import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import {
  AddRoleToUserDto,
  AssignRolesDto,
  CreateRoleDto,
  DeleteRoleDto,
  RoleResponseDto,
  UpdateRoleDto,
  UserRoleResponseDto,
} from '@dad-group-1/backend-common';
import { Observable } from 'rxjs';
import { assertObjectIsNumber } from '../../../helpers/check-utils';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('roles')
export class AuthorizationController {
  constructor(private authorizationService: AuthorizationService) {}

  @Post()
  @ApiBody({ type: CreateRoleDto })
  @ApiGlobalResponse(RoleResponseDto)
  create(@Body() body: CreateRoleDto): Observable<RoleResponseDto> {
    return this.authorizationService.create(body);
  }

  @Get()
  @ApiGlobalResponse(RoleResponseDto)
  findAll(): Observable<RoleResponseDto[]> {
    return this.authorizationService.findAll();
  }

  @Get(':id')
  @ApiGlobalResponse(RoleResponseDto)
  findOne(@Param('id') id: string): Observable<RoleResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.authorizationService.findOne(Number(id));
  }

  @Patch(':id')
  @ApiBody({ type: UpdateRoleDto })
  @ApiGlobalResponse(RoleResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Observable<RoleResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.authorizationService.update(Number(id), updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<unknown> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    const body: DeleteRoleDto = { role_id: Number(id) };
    return this.authorizationService.remove(body);
  }
}

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller()
export class UserRoleController {
  constructor(private authorizationService: AuthorizationService) {}

  @Post('/users/:id/roles/add')
  @ApiBody({ type: AddRoleToUserDto })
  @ApiGlobalResponse(UserRoleResponseDto)
  addRoleToUser(
    @Param('id') id: string,
    @Body() body: AddRoleToUserDto,
  ): Observable<UserRoleResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.authorizationService.addRoleToUser(Number(id), body);
  }

  @Delete('/users/:id/roles/:roleId/remove')
  removeUserRole(
    @Param('id') id: string,
    @Param('roleId') roleId: string,
  ): Observable<unknown> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    assertObjectIsNumber(roleId, `Invalid ID: '${roleId}' is not a number`);
    return this.authorizationService.removeUserRole(Number(id), Number(roleId));
  }

  @Put('/users/:id/roles/assign')
  @ApiBody({ type: AssignRolesDto })
  @ApiGlobalResponse(UserRoleResponseDto)
  assignRoles(
    @Param('id') id: string,
    @Body() body: AssignRolesDto,
  ): Observable<UserRoleResponseDto[]> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.authorizationService.assignRoles(Number(id), body);
  }

  @Get('/users/:id/roles')
  @ApiGlobalResponse(UserRoleResponseDto)
  getUserRoles(@Param('id') id: string): Observable<UserRoleResponseDto[]> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.authorizationService.getUserRoles(Number(id));
  }
}

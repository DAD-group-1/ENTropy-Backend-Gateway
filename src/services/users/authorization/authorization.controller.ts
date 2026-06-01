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
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('roles')
export class AuthorizationController {
  constructor(private authorizationService: AuthorizationService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiBody({ type: CreateRoleDto })
  @ApiResponse({ type: RoleResponseDto })
  create(@Body() body: CreateRoleDto): Observable<RoleResponseDto> {
    return this.authorizationService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiResponse({ type: [RoleResponseDto] })
  findAll(): Observable<RoleResponseDto[]> {
    return this.authorizationService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiResponse({ type: RoleResponseDto })
  findOne(@Param('id') id: string): Observable<RoleResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.authorizationService.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiBody({ type: UpdateRoleDto })
  @ApiResponse({ type: RoleResponseDto })
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Observable<RoleResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.authorizationService.update(Number(id), updateRoleDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string): Observable<unknown> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    const body: DeleteRoleDto = { role_id: Number(id) };
    return this.authorizationService.remove(body);
  }
}

@Controller()
export class UserRoleController {
  constructor(private authorizationService: AuthorizationService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('/users/:id/roles/add')
  @ApiBody({ type: AddRoleToUserDto })
  @ApiResponse({ type: UserRoleResponseDto })
  addRoleToUser(
    @Param('id') id: string,
    @Body() body: AddRoleToUserDto,
  ): Observable<UserRoleResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.authorizationService.addRoleToUser(Number(id), body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('/users/:id/roles/:roleId/remove')
  removeUserRole(
    @Param('id') id: string,
    @Param('roleId') roleId: string,
  ): Observable<unknown> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    assertObjectIsNumber(roleId, `Invalid ID: '${roleId}' is not a number`);
    return this.authorizationService.removeUserRole(Number(id), Number(roleId));
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('/users/:id/roles/assign')
  @ApiBody({ type: AssignRolesDto })
  @ApiResponse({ type: [UserRoleResponseDto] })
  assignRoles(
    @Param('id') id: string,
    @Body() body: AssignRolesDto,
  ): Observable<UserRoleResponseDto[]> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.authorizationService.assignRoles(Number(id), body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/users/:id/roles')
  @ApiResponse({ type: [UserRoleResponseDto] })
  getUserRoles(@Param('id') id: string): Observable<UserRoleResponseDto[]> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.authorizationService.getUserRoles(Number(id));
  }
}

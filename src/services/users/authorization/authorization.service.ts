import { Inject, Injectable } from '@nestjs/common';
import { usersServiceClientModuleName } from '../../../helpers/client-modules';
import { ClientProxy } from '@nestjs/microservices';
import {
  AddRoleToUserDto,
  AssignRolesDto,
  CreateRoleDto,
  CreateUserRoleRequestDto,
  DeleteRoleDto,
  DeleteUserRoleRequestDto,
  GetUserRoleDto,
  RoleResponseDto,
  UpdateRoleDto,
  UserRoleResponseDto,
} from '@dad-group-1/backend-common';
import { Observable } from 'rxjs';
import { catchRpcException } from '../../../helpers/check-utils';
import { UpdateCommand } from '../../../helpers/commands';

@Injectable()
export class AuthorizationService {
  constructor(
    @Inject(usersServiceClientModuleName)
    private readonly usersClient: ClientProxy,
  ) {}

  create(body: CreateRoleDto): Observable<RoleResponseDto> {
    return this.usersClient
      .send<RoleResponseDto, CreateRoleDto>({ cmd: 'create_role' }, body)
      .pipe(catchRpcException<RoleResponseDto>());
  }

  findAll(): Observable<RoleResponseDto[]> {
    return this.usersClient
      .send<
        RoleResponseDto[],
        Record<string, unknown>
      >({ cmd: 'get_roles' }, {})
      .pipe(catchRpcException<RoleResponseDto[]>());
  }

  findOne(id: number): Observable<RoleResponseDto> {
    return this.usersClient
      .send<RoleResponseDto, number>({ cmd: 'get_role' }, id)
      .pipe(catchRpcException<RoleResponseDto>());
  }

  update(id: number, updateData: UpdateRoleDto): Observable<RoleResponseDto> {
    return this.usersClient
      .send<
        RoleResponseDto,
        UpdateCommand<UpdateRoleDto>
      >({ cmd: 'update_role' }, { id, updateData })
      .pipe(catchRpcException<RoleResponseDto>());
  }

  remove(body: DeleteRoleDto): Observable<unknown> {
    return this.usersClient
      .send({ cmd: 'delete_role' }, body)
      .pipe(catchRpcException());
  }

  addRoleToUser(
    userId: number,
    body: AddRoleToUserDto,
  ): Observable<UserRoleResponseDto> {
    const payload: CreateUserRoleRequestDto = {
      user_id: userId,
      role_id: body.role_id,
    };
    return this.usersClient
      .send<
        UserRoleResponseDto,
        CreateUserRoleRequestDto
      >({ cmd: 'add_role_to_user' }, payload)
      .pipe(catchRpcException<UserRoleResponseDto>());
  }

  removeUserRole(userId: number, roleId: number): Observable<unknown> {
    const payload: DeleteUserRoleRequestDto = {
      user_id: userId,
      role_id: roleId,
    };
    return this.usersClient
      .send({ cmd: 'remove_user_role' }, payload)
      .pipe(catchRpcException());
  }

  assignRoles(
    userId: number,
    body: AssignRolesDto,
  ): Observable<UserRoleResponseDto[]> {
    const payload = {
      user_id: userId,
      role_ids: body.role_ids,
    };
    return this.usersClient
      .send<
        UserRoleResponseDto[],
        { user_id: number; role_ids: number[] }
      >({ cmd: 'assign_roles_to_user' }, payload)
      .pipe(catchRpcException<UserRoleResponseDto[]>());
  }

  getUserRoles(userId: number): Observable<UserRoleResponseDto[]> {
    const payload: GetUserRoleDto = { user_id: userId };
    return this.usersClient
      .send<
        UserRoleResponseDto[],
        GetUserRoleDto
      >({ cmd: 'get_user_roles' }, payload)
      .pipe(catchRpcException<UserRoleResponseDto[]>());
  }
}

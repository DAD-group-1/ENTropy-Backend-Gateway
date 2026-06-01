import { Inject, Injectable } from '@nestjs/common';
import { usersServiceClientModuleName } from '../../../helpers/client-modules';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateRoleDto,
  DeleteRoleDto,
  RoleResponseDto,
  UpdateRoleDto,
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
}

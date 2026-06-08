import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  PaginationQueryDto,
  UserListResponseDto,
  UserResponseDto,
} from '@dad-group-1/backend-common';
import { ClientProxy } from '@nestjs/microservices';
import { usersServiceClientModuleName } from '../../../helpers/client-modules';
import {
  assertObjectIsNumber,
  catchRpcException,
} from '../../../helpers/check-utils';

@Injectable()
export class UserService {
  constructor(
    @Inject(usersServiceClientModuleName)
    private readonly usersClient: ClientProxy,
  ) {}

  findAll(query: PaginationQueryDto): Observable<UserListResponseDto> {
    return this.usersClient.send<UserListResponseDto, PaginationQueryDto>(
      { cmd: 'find_all_users' },
      query,
    );
  }

  findOne(id: string): Observable<UserResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.usersClient
      .send<UserResponseDto, number>({ cmd: 'find_one_user' }, Number(id))
      .pipe(catchRpcException<UserResponseDto>());
  }
}

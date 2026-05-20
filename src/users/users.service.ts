import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { User } from './users/interfaces/user.interface';
import { CreateUserDto } from './users/interfaces/dtos/create-user.dto';
import { UpdateUserDto } from './users/interfaces/dtos/update-user.dto';
import { assertObjectIsNumber } from '../common/check-utils';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
  ) {}

  create(createUserDto: CreateUserDto): Observable<User> {
    return this.usersClient.send<User, CreateUserDto>(
      { cmd: 'create_user' },
      createUserDto,
    );
  }

  findAll(): Observable<User[]> {
    return this.usersClient.send<User[], Record<string, never>>(
      { cmd: 'find_all_users' },
      {},
    );
  }

  findOne(id: string): Observable<User> {
    assertObjectIsNumber(id);
    return this.usersClient.send<User, number>(
      { cmd: 'find_one_user' },
      Number(id),
    );
  }

  update(id: string, updateUserDto: UpdateUserDto): Observable<User> {
    assertObjectIsNumber(id);
    return this.usersClient.send<
      User,
      { id: number; updateUserDto: UpdateUserDto }
    >({ cmd: 'update_user' }, { id: Number(id), updateUserDto });
  }

  remove(id: string): Observable<User> {
    assertObjectIsNumber(id);
    return this.usersClient.send<User, number>(
      { cmd: 'remove_user' },
      Number(id),
    );
  }
}

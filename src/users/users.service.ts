import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';

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
    return this.usersClient.send<User, string>({ cmd: 'find_one_user' }, id);
  }

  update(id: string, updateUserDto: UpdateUserDto): Observable<User> {
    return this.usersClient.send<User, { id: string } & UpdateUserDto>(
      { cmd: 'update_user' },
      { id, ...updateUserDto },
    );
  }

  remove(id: string): Observable<User> {
    return this.usersClient.send<User, string>({ cmd: 'remove_user' }, id);
  }
}

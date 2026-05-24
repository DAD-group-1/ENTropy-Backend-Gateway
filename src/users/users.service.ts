import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import type { RegisterStudentRequestDto } from './dto/requests/register-student.request.dto';
import type { RegisterTeacherRequestDto } from './dto/requests/register-teacher.request.dto';
import type { ServiceRegisterResponse } from './interfaces/service/responses/register.service.response';
import type { RegisterStudentResponseDto } from './dto/responses/register-student.response.dto';
import type { RegisterTeacherResponseDto } from './dto/responses/register-teacher.response.dto';

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
      { cmd: 'find_all_students' },
      {},
    );
  }

  findOne(id: string): Observable<User> {
    return this.usersClient.send<User, string>({ cmd: 'find_one_user' }, id);
  }

  update(id: string, updateUserDto: UpdateUserDto): Observable<User> {
    return this.usersClient.send<
      User,
      { id: string; updateUserDto: UpdateUserDto }
    >({ cmd: 'update_user' }, { id, updateUserDto });
  }

  remove(id: string): Observable<User> {
    return this.usersClient.send<User, string>({ cmd: 'remove_user' }, id);
  }

  async sendRegister(
    email: string,
    password: string,
  ): Promise<ServiceRegisterResponse> {
    const response = await firstValueFrom(
      this.usersClient.send({ cmd: 'register' }, { email, password }),
    );

    return response as ServiceRegisterResponse;
  }

  async sendRegisterStudent(
    payload: RegisterStudentRequestDto,
  ): Promise<RegisterStudentResponseDto> {
    return await firstValueFrom(
      this.usersClient.send<
        RegisterStudentResponseDto,
        RegisterStudentRequestDto
      >({ cmd: 'create_student' }, payload),
    );
  }

  async sendRegisterTeacher(
    payload: RegisterTeacherRequestDto,
  ): Promise<RegisterTeacherResponseDto> {
    return await firstValueFrom(
      this.usersClient.send<
        RegisterTeacherResponseDto,
        RegisterTeacherRequestDto
      >({ cmd: 'create_instructor' }, payload),
    );
  }

  async sendLogin(
    email: string,
    password: string,
  ): Promise<Record<string, string>> {
    return await firstValueFrom(
      this.usersClient.send<Record<string, string>>(
        { cmd: 'login' },
        { email, password },
      ),
    );
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Student } from './interfaces/student.interface';
import { usersServiceClientModuleName } from '../../common/client-modules';
import { assertObjectIsNumber, throwHttpError } from '../../common/check-utils';
import { MicroserviceRpcException } from '../../common/interfaces/error.interface';
import {
  CreateStudentDto,
  UpdateStudentDto,
} from './interfaces/dtos/student.dto';

@Injectable()
export class StudentService {
  constructor(
    @Inject(usersServiceClientModuleName)
    private readonly usersClient: ClientProxy,
  ) {}

  create(createStudentDto: CreateStudentDto): Observable<Student> {
    return this.usersClient.send<Student, CreateStudentDto>(
      { cmd: 'create_student' },
      createStudentDto,
    );
  }

  findAll(): Observable<Student[]> {
    return this.usersClient.send<Student[], Record<string, unknown>>(
      { cmd: 'find_all_students' },
      {},
    );
  }

  findOne(id: string): Observable<Student> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.usersClient
      .send<Student, number>({ cmd: 'find_one_student' }, Number(id))
      .pipe(
        catchError((error: MicroserviceRpcException) => {
          throwHttpError(error.message, error.code);
          return EMPTY;
        }),
      );
  }

  update(
    id: string,
    updateData: UpdateStudentDto,
  ): Observable<Student> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.usersClient
      .send<
        Student,
        { id: number; updateStudentDto: UpdateStudentDto }
      >({ cmd: 'update_student' }, { id: Number(id), updateStudentDto: updateData })
      .pipe(
        catchError((error: MicroserviceRpcException) => {
          throwHttpError(error.message, error.code);
          return EMPTY;
        }),
      );
  }

  remove(id: string): Observable<void> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.usersClient
      .send<void, number>({ cmd: 'remove_student' }, Number(id))
      .pipe(
        catchError((error: MicroserviceRpcException) => {
          throwHttpError(error.message, error.code);
          return EMPTY;
        }),
      );
  }
}

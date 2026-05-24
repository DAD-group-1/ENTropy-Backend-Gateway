import {Inject, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {ClientProxy} from '@nestjs/microservices';
import {Student, assertObjectIsNumber, catchRpcException, CreateStudentDto, UpdateStudentDto,} from '@dad-group-1/backend-common';
import {usersServiceClientModuleName} from "../../helpers/client-modules";

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
      .pipe(catchRpcException<Student>());
  }

  update(
    id: string,
    updateData: UpdateStudentDto,
  ): Observable<Student> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.usersClient
      .send<
        Student,
        { id: number; updateData: UpdateStudentDto }
      >({ cmd: 'update_student' }, { id: Number(id), updateData: updateData })
      .pipe(catchRpcException<Student>());
  }

  remove(id: string): Observable<void> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.usersClient
      .send<void, number>({ cmd: 'remove_student' }, Number(id))
      .pipe(catchRpcException<void>());
  }
}

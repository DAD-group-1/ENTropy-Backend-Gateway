import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Student } from './interfaces/student.interface';
import { CreateStudentDto } from './interfaces/dtos/create-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
  ) {}

  createStudent(createStudentDto: CreateStudentDto): Observable<Student> {
    return this.usersClient.send<Student, CreateStudentDto>(
      { cmd: 'create_student' },
      createStudentDto,
    );
  }

  findAll(): Observable<Student[]> {
    return this.usersClient.send<Student[], void>(
      { cmd: 'find_all_students' },
      undefined,
    );
  }

  findOne(id: number): Observable<Student> {
    return this.usersClient.send<Student, number>(
      { cmd: 'find_one_student' },
      id,
    );
  }

  update(
    id: number,
    updateData: Partial<CreateStudentDto>,
  ): Observable<Student> {
    return this.usersClient.send<
      Student,
      { id: number; updateData: Partial<CreateStudentDto> }
    >({ cmd: 'update_student' }, { id, updateData });
  }

  remove(id: number): Observable<void> {
    return this.usersClient.send<void, number>({ cmd: 'remove_student' }, id);
  }
}

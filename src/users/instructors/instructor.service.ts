import { Inject, Injectable } from '@nestjs/common';
import { usersServiceClientModuleName } from '../../common/client-modules';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateInstructorDto,
  UpdateInstructorDto,
} from './interfaces/dtos/instructor.dto';
import { Instructor } from './interfaces/instructor.interface';
import { Observable } from 'rxjs';
import {
  assertObjectIsNumber,
  catchRpcException,
} from '../../common/check-utils';

@Injectable()
export class InstructorService {
  constructor(
    @Inject(usersServiceClientModuleName)
    private readonly usersClient: ClientProxy,
  ) {}

  create(createInstructorDto: CreateInstructorDto) {
    return this.usersClient
      .send<
        Instructor,
        CreateInstructorDto
      >({ cmd: 'create_instructor' }, createInstructorDto)
      .pipe(catchRpcException<Instructor>());
  }

  findAll(): Observable<Instructor[]> {
    return this.usersClient.send({ cmd: 'find_all_instructors' }, {});
  }

  findOne(id: string): Observable<Instructor> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.usersClient
      .send<Instructor, number>({ cmd: 'find_one_instructor' }, Number(id))
      .pipe(catchRpcException<Instructor>());
  }

  update(id: string, updateData: UpdateInstructorDto): Observable<Instructor> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.usersClient
      .send<
        Instructor,
        { id: number; updateData: UpdateInstructorDto }
      >({ cmd: 'update_instructor' }, { id: Number(id), updateData })
      .pipe(catchRpcException<Instructor>());
  }

  remove(id: number): Observable<void> {
    return this.usersClient.send({ cmd: 'remove_instructor' }, id);
  }
}

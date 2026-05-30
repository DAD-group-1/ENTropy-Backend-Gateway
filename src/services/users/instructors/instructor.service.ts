import { Inject, Injectable } from '@nestjs/common';
import { usersServiceClientModuleName } from '../../../helpers/client-modules';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateInstructorDto,
  CreateInstructorResponseDto,
  Instructor,
  UpdateInstructorDto,
} from '@dad-group-1/backend-common';
import { Observable } from 'rxjs';
import { UpdateCommand } from '../../../helpers/commands';
import {
  assertObjectIsNumber,
  catchRpcException,
} from '../../../helpers/check-utils';

@Injectable()
export class InstructorService {
  constructor(
    @Inject(usersServiceClientModuleName)
    private readonly usersClient: ClientProxy,
  ) {}

  create(createInstructorDto: CreateInstructorDto) {
    return this.usersClient
      .send<
        CreateInstructorResponseDto,
        CreateInstructorDto
      >({ cmd: 'create_instructor' }, createInstructorDto)
      .pipe(catchRpcException<CreateInstructorResponseDto>());
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
        UpdateCommand<UpdateInstructorDto>
      >({ cmd: 'update_instructor' }, { id: Number(id), updateData: updateData })
      .pipe(catchRpcException<Instructor>());
  }

  remove(id: number): Observable<void> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.usersClient
      .send<void, number>({ cmd: 'remove_instructor' }, Number(id))
      .pipe(catchRpcException<void>());
  }
}

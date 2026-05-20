import { Inject, Injectable } from '@nestjs/common';
import { usersServiceClientModuleName } from '../../common/client-modules';
import { ClientProxy } from '@nestjs/microservices';
import { CreateInstructorDto } from './interfaces/dtos/create-instructor.dto';
import { Instructor } from './interfaces/instructor.interface';
import { Observable } from 'rxjs';

@Injectable()
export class InstructorService {
  constructor(
    @Inject(usersServiceClientModuleName)
    private readonly usersClient: ClientProxy,
  ) {}

  create(createInstructorDto: CreateInstructorDto) {
    return this.usersClient.send<Instructor, CreateInstructorDto>(
      { cmd: 'create_instructor' },
      createInstructorDto,
    );
  }

  findAll(): Observable<Instructor[]> {
    return this.usersClient.send({ cmd: 'find_all_instructors' }, undefined);
  }

  findOne(id: number): Observable<Instructor> {
    return this.usersClient.send({ cmd: 'find_one_instructor' }, id);
  }

  update(
    id: number,
    updateData: Partial<CreateInstructorDto>,
  ): Observable<Instructor> {
    return this.usersClient.send(
      { cmd: 'update_instructor' },
      { id, updateData },
    );
  }

  remove(id: number): Observable<void> {
    return this.usersClient.send({ cmd: 'remove_instructor' }, id);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { usersServiceClientModuleName } from '../../../helpers/client-modules';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateInstructorRequestDto,
  CreateInstructorResponseDto,
  InstructorListResponseDto,
  InstructorResponseDto,
  PaginationQueryDto,
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

  create(createInstructorDto: CreateInstructorRequestDto) {
    return this.usersClient
      .send<
        CreateInstructorResponseDto,
        CreateInstructorRequestDto
      >({ cmd: 'create_instructor' }, createInstructorDto)
      .pipe(catchRpcException<CreateInstructorResponseDto>());
  }

  findAll(query: PaginationQueryDto): Observable<InstructorListResponseDto> {
    return this.usersClient.send<InstructorListResponseDto, PaginationQueryDto>(
      { cmd: 'find_all_instructors' },
      query,
    );
  }

  findOne(id: string): Observable<InstructorResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.usersClient
      .send<
        InstructorResponseDto,
        number
      >({ cmd: 'find_one_instructor' }, Number(id))
      .pipe(catchRpcException<InstructorResponseDto>());
  }

  update(
    id: string,
    updateData: UpdateInstructorDto,
  ): Observable<InstructorResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.usersClient
      .send<
        InstructorResponseDto,
        UpdateCommand<UpdateInstructorDto>
      >({ cmd: 'update_instructor' }, { id: Number(id), updateData: updateData })
      .pipe(catchRpcException<InstructorResponseDto>());
  }

  remove(id: number): Observable<void> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.usersClient
      .send<void, number>({ cmd: 'remove_instructor' }, Number(id))
      .pipe(catchRpcException<void>());
  }
}

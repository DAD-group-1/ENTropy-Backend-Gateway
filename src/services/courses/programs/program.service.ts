import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  CreateProgramRequestDto,
  ProgramResponseDto,
  UpdateProgramDto,
} from '@dad-group-1/backend-common';
import { ClientProxy } from '@nestjs/microservices';
import { coursesServiceClientModuleName } from '../../../helpers/client-modules';
import {
  assertObjectIsNumber,
  catchRpcException,
} from '../../../helpers/check-utils';
import { UpdateCommand } from '../../../helpers/commands';

@Injectable()
export class ProgramService {
  constructor(
    @Inject(coursesServiceClientModuleName)
    private readonly billingClient: ClientProxy,
  ) {}

  create(
    createProgramDto: CreateProgramRequestDto,
  ): Observable<ProgramResponseDto> {
    return this.billingClient
      .send<
        ProgramResponseDto,
        CreateProgramRequestDto
      >({ cmd: 'create_program' }, createProgramDto)
      .pipe(catchRpcException<ProgramResponseDto>());
  }

  findAll(): Observable<ProgramResponseDto[]> {
    return this.billingClient.send<ProgramResponseDto[], null>(
      { cmd: 'find_all_programs' },
      null,
    );
  }

  findOne(id: string): Observable<ProgramResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.billingClient
      .send<ProgramResponseDto, number>({ cmd: 'find_one_program' }, Number(id))
      .pipe(catchRpcException<ProgramResponseDto>());
  }

  update(
    id: string,
    updateData: UpdateProgramDto,
  ): Observable<ProgramResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.billingClient
      .send<
        ProgramResponseDto,
        UpdateCommand<UpdateProgramDto>
      >({ cmd: 'update_program' }, { id: Number(id), updateData: updateData })
      .pipe(catchRpcException<ProgramResponseDto>());
  }

  remove(id: string): Observable<void> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.billingClient
      .send<void, number>({ cmd: 'remove_program' }, Number(id))
      .pipe(catchRpcException<void>());
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  CreateScheduleRequestDto,
  Schedule,
  ScheduleResponseDto,
  UpdateScheduleDto,
} from '@dad-group-1/backend-common';
import { ClientProxy } from '@nestjs/microservices';
import { schedulesServiceClientModuleName } from '../../../helpers/client-modules';
import {
  assertObjectIsNumber,
  catchRpcException,
} from '../../../helpers/check-utils';
import { UpdateCommand } from '../../../helpers/commands';

@Injectable()
export class ScheduleService {
  constructor(
    @Inject(schedulesServiceClientModuleName)
    private readonly schedulesClient: ClientProxy,
  ) {}

  create(
    createScheduleDto: CreateScheduleRequestDto,
  ): Observable<ScheduleResponseDto> {
    return this.schedulesClient
      .send<
        ScheduleResponseDto,
        CreateScheduleRequestDto
      >({ cmd: 'create_schedule' }, createScheduleDto)
      .pipe(catchRpcException<ScheduleResponseDto>());
  }

  findAll(): Observable<Schedule[]> {
    return this.schedulesClient.send<ScheduleResponseDto[], null>(
      { cmd: 'find_all_schedules' },
      null,
    );
  }

  findOne(id: string): Observable<ScheduleResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.schedulesClient
      .send<
        ScheduleResponseDto,
        number
      >({ cmd: 'find_one_schedule' }, Number(id))
      .pipe(catchRpcException<Schedule>());
  }

  update(
    id: string,
    updateData: UpdateScheduleDto,
  ): Observable<ScheduleResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.schedulesClient
      .send<
        ScheduleResponseDto,
        UpdateCommand<UpdateScheduleDto>
      >({ cmd: 'update_schedule' }, { id: Number(id), updateData: updateData })
      .pipe(catchRpcException<ScheduleResponseDto>());
  }

  remove(id: string): Observable<void> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.schedulesClient
      .send<void, number>({ cmd: 'remove_schedule' }, Number(id))
      .pipe(catchRpcException<void>());
  }
}

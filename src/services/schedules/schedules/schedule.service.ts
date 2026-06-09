import { Inject, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  CreateScheduleRequestDto,
  PaginationQueryDto,
  Schedule,
  ScheduleListResponseDto,
  ScheduleResponseDto,
  SearchPaginationQueryDto,
  TemporalQueryDto,
  TemporalSearchQueryDto,
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
  private readonly logger = new Logger(ScheduleService.name);
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

  findAll(query: PaginationQueryDto): Observable<ScheduleListResponseDto> {
    return this.schedulesClient.send<
      ScheduleListResponseDto,
      PaginationQueryDto
    >({ cmd: 'find_all_schedules' }, query);
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

  findByProgramId(programId: string, query: PaginationQueryDto) {
    assertObjectIsNumber(
      programId,
      `Invalid Program ID: '${programId}' is not a number`,
    );

    return this.schedulesClient.send<
      ScheduleListResponseDto,
      SearchPaginationQueryDto
    >(
      { cmd: 'find_schedules_by_program' },
      { id: Number(programId), query: query },
    );
  }

  findByProgramInDateRange(programId: string, query: TemporalQueryDto) {
    assertObjectIsNumber(
      programId,
      `Invalid Program ID: '${programId}' is not a number`,
    );

    return this.schedulesClient.send<
      ScheduleResponseDto[],
      TemporalSearchQueryDto
    >(
      { cmd: 'find_schedules_by_program_between_dates' },
      {
        id: Number(programId),
        startDate: query.startDate,
        endDate: query.endDate,
      },
    );
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

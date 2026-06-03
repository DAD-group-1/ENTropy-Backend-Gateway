import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  Attendance,
  AttendanceListResponseDto,
  AttendanceResponseDto,
  CreateAttendanceRequestDto,
  PaginationQueryDto,
  UpdateAttendanceDto,
} from '@dad-group-1/backend-common';
import { ClientProxy } from '@nestjs/microservices';
import { attendancesServiceClientModuleName } from '../../../helpers/client-modules';
import {
  assertObjectIsNumber,
  catchRpcException,
} from '../../../helpers/check-utils';
import { UpdateCommand } from '../../../helpers/commands';

@Injectable()
export class AttendanceService {
  constructor(
    @Inject(attendancesServiceClientModuleName)
    private readonly attendancesClient: ClientProxy,
  ) {}

  create(
    createAttendanceDto: CreateAttendanceRequestDto,
  ): Observable<AttendanceResponseDto> {
    return this.attendancesClient
      .send<
        AttendanceResponseDto,
        CreateAttendanceRequestDto
      >({ cmd: 'create_attendance' }, createAttendanceDto)
      .pipe(catchRpcException<AttendanceResponseDto>());
  }

  findAll(query: PaginationQueryDto): Observable<AttendanceListResponseDto> {
    return this.attendancesClient.send<
      AttendanceListResponseDto,
      PaginationQueryDto
    >({ cmd: 'find_all_attendances' }, query);
  }

  findOne(id: string): Observable<AttendanceResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.attendancesClient
      .send<
        AttendanceResponseDto,
        number
      >({ cmd: 'find_one_attendance' }, Number(id))
      .pipe(catchRpcException<Attendance>());
  }

  update(
    id: string,
    updateData: UpdateAttendanceDto,
  ): Observable<AttendanceResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.attendancesClient
      .send<
        AttendanceResponseDto,
        UpdateCommand<UpdateAttendanceDto>
      >({ cmd: 'update_attendance' }, { id: Number(id), updateData: updateData })
      .pipe(catchRpcException<AttendanceResponseDto>());
  }

  remove(id: string): Observable<void> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.attendancesClient
      .send<void, number>({ cmd: 'remove_attendance' }, Number(id))
      .pipe(catchRpcException<void>());
  }
}

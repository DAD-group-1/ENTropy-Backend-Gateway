import { Inject, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  AttendanceListResponseDto,
  AttendanceResponseDto,
  CreateAttendanceRequestDto,
  PaginationQueryDto,
  SearchPaginationQueryDto,
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
  private readonly logger = new Logger(AttendanceService.name);
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
      .pipe(catchRpcException<AttendanceResponseDto>());
  }

  findByStudentId(studentId: string, query: PaginationQueryDto) {
    assertObjectIsNumber(
      studentId,
      `Invalid student ID: '${studentId}' is not a number`,
    );

    return this.attendancesClient
      .send<
        AttendanceListResponseDto,
        SearchPaginationQueryDto
      >({ cmd: 'find_attendances_by_student' }, { id: Number(studentId), query: query })
      .pipe(catchRpcException<AttendanceListResponseDto>());
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

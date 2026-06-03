import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  CreateGradeRequestDto,
  Grade,
  GradeListResponseDto,
  GradeResponseDto,
  PaginationQueryDto,
  UpdateGradeDto,
} from '@dad-group-1/backend-common';
import { ClientProxy } from '@nestjs/microservices';
import { enrollmentsServiceClientModuleName } from '../../../helpers/client-modules';
import {
  assertObjectIsNumber,
  catchRpcException,
} from '../../../helpers/check-utils';
import { UpdateCommand } from '../../../helpers/commands';

@Injectable()
export class GradeService {
  constructor(
    @Inject(enrollmentsServiceClientModuleName)
    private readonly gradesClient: ClientProxy,
  ) {}

  create(createGradeDto: CreateGradeRequestDto): Observable<GradeResponseDto> {
    return this.gradesClient
      .send<
        GradeResponseDto,
        CreateGradeRequestDto
      >({ cmd: 'create_grade' }, createGradeDto)
      .pipe(catchRpcException<GradeResponseDto>());
  }

  findAll(query: PaginationQueryDto): Observable<GradeListResponseDto> {
    return this.gradesClient.send<GradeListResponseDto, PaginationQueryDto>(
      { cmd: 'find_all_grades' },
      query,
    );
  }

  findOne(id: string): Observable<GradeResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.gradesClient
      .send<GradeResponseDto, number>({ cmd: 'find_one_grade' }, Number(id))
      .pipe(catchRpcException<Grade>());
  }

  update(id: string, updateData: UpdateGradeDto): Observable<GradeResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.gradesClient
      .send<
        GradeResponseDto,
        UpdateCommand<UpdateGradeDto>
      >({ cmd: 'update_grade' }, { id: Number(id), updateData: updateData })
      .pipe(catchRpcException<GradeResponseDto>());
  }

  remove(id: string): Observable<void> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.gradesClient
      .send<void, number>({ cmd: 'remove_grade' }, Number(id))
      .pipe(catchRpcException<void>());
  }
}

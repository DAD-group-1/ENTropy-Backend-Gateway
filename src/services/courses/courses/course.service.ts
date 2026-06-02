import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  CourseResponseDto,
  CreateCourseRequestDto,
  UpdateCourseDto,
} from '@dad-group-1/backend-common';
import { ClientProxy } from '@nestjs/microservices';
import { coursesServiceClientModuleName } from '../../../helpers/client-modules';
import {
  assertObjectIsNumber,
  catchRpcException,
} from '../../../helpers/check-utils';
import { UpdateCommand } from '../../../helpers/commands';

@Injectable()
export class CourseService {
  constructor(
    @Inject(coursesServiceClientModuleName)
    private readonly billingClient: ClientProxy,
  ) {}

  create(
    createCourseDto: CreateCourseRequestDto,
  ): Observable<CourseResponseDto> {
    return this.billingClient
      .send<
        CourseResponseDto,
        CreateCourseRequestDto
      >({ cmd: 'create_course' }, createCourseDto)
      .pipe(catchRpcException<CourseResponseDto>());
  }

  findAll(): Observable<CourseResponseDto[]> {
    return this.billingClient.send<CourseResponseDto[], null>(
      { cmd: 'find_all_courses' },
      null,
    );
  }

  findOne(id: string): Observable<CourseResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.billingClient
      .send<CourseResponseDto, number>({ cmd: 'find_one_course' }, Number(id))
      .pipe(catchRpcException<CourseResponseDto>());
  }

  update(
    id: string,
    updateData: UpdateCourseDto,
  ): Observable<CourseResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.billingClient
      .send<
        CourseResponseDto,
        UpdateCommand<UpdateCourseDto>
      >({ cmd: 'update_course' }, { id: Number(id), updateData: updateData })
      .pipe(catchRpcException<CourseResponseDto>());
  }

  remove(id: string): Observable<void> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.billingClient
      .send<void, number>({ cmd: 'remove_course' }, Number(id))
      .pipe(catchRpcException<void>());
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  CreateEnrollmentRequestDto,
  Enrollment,
  EnrollmentResponseDto,
  UpdateEnrollmentDto,
} from '@dad-group-1/backend-common';
import { ClientProxy } from '@nestjs/microservices';
import { enrollmentsServiceClientModuleName } from '../../../helpers/client-modules';
import {
  assertObjectIsNumber,
  catchRpcException,
} from '../../../helpers/check-utils';
import { UpdateCommand } from '../../../helpers/commands';

@Injectable()
export class EnrollmentService {
  constructor(
    @Inject(enrollmentsServiceClientModuleName)
    private readonly enrollmentsClient: ClientProxy,
  ) {}

  create(
    createEnrollmentDto: CreateEnrollmentRequestDto,
  ): Observable<EnrollmentResponseDto> {
    return this.enrollmentsClient
      .send<
        EnrollmentResponseDto,
        CreateEnrollmentRequestDto
      >({ cmd: 'create_enrollment' }, createEnrollmentDto)
      .pipe(catchRpcException<EnrollmentResponseDto>());
  }

  findAll(): Observable<Enrollment[]> {
    return this.enrollmentsClient.send<EnrollmentResponseDto[], null>(
      { cmd: 'find_all_enrollments' },
      null,
    );
  }

  findOne(id: string): Observable<EnrollmentResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.enrollmentsClient
      .send<
        EnrollmentResponseDto,
        number
      >({ cmd: 'find_one_enrollment' }, Number(id))
      .pipe(catchRpcException<EnrollmentResponseDto>());
  }

  update(id: string, updateData: UpdateEnrollmentDto): Observable<Enrollment> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.enrollmentsClient
      .send<
        EnrollmentResponseDto,
        UpdateCommand<UpdateEnrollmentDto>
      >({ cmd: 'update_enrollment' }, { id: Number(id), updateData: updateData })
      .pipe(catchRpcException<EnrollmentResponseDto>());
  }

  remove(id: string): Observable<void> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.enrollmentsClient
      .send<void, number>({ cmd: 'remove_enrollment' }, Number(id))
      .pipe(catchRpcException<void>());
  }
}

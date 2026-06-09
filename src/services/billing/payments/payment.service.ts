import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  CreatePaymentRequestDto,
  PaginationQueryDto,
  PaymentListResponseDto,
  PaymentResponseDto,
  SearchPaginationQueryDto,
  UpdatePaymentDto,
} from '@dad-group-1/backend-common';
import { ClientProxy } from '@nestjs/microservices';
import { billingServiceClientModuleName } from '../../../helpers/client-modules';
import {
  assertObjectIsNumber,
  catchRpcException,
} from '../../../helpers/check-utils';
import { UpdateCommand } from '../../../helpers/commands';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(billingServiceClientModuleName)
    private readonly billingClient: ClientProxy,
  ) {}

  create(
    createPaymentDto: CreatePaymentRequestDto,
  ): Observable<PaymentResponseDto> {
    return this.billingClient
      .send<
        PaymentResponseDto,
        CreatePaymentRequestDto
      >({ cmd: 'create_payment' }, createPaymentDto)
      .pipe(catchRpcException<PaymentResponseDto>());
  }

  findAll(query: PaginationQueryDto): Observable<PaymentListResponseDto> {
    return this.billingClient.send<PaymentListResponseDto, PaginationQueryDto>(
      { cmd: 'find_all_payments' },
      query,
    );
  }

  findOne(id: string): Observable<PaymentResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.billingClient
      .send<PaymentResponseDto, number>({ cmd: 'find_one_payment' }, Number(id))
      .pipe(catchRpcException<PaymentResponseDto>());
  }

  findByStudentId(studentId: string, query: PaginationQueryDto) {
    assertObjectIsNumber(
      studentId,
      `Invalid student ID: '${studentId}' is not a number`,
    );

    return this.billingClient
      .send<
        PaymentListResponseDto,
        SearchPaginationQueryDto
      >({ cmd: 'find_payments_by_student_id' }, { id: Number(studentId), query: query })
      .pipe(catchRpcException<PaymentListResponseDto>());
  }

  update(
    id: string,
    updateData: UpdatePaymentDto,
  ): Observable<PaymentResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.billingClient
      .send<
        PaymentResponseDto,
        UpdateCommand<UpdatePaymentDto>
      >({ cmd: 'update_payment' }, { id: Number(id), updateData: updateData })
      .pipe(catchRpcException<PaymentResponseDto>());
  }

  remove(id: string): Observable<void> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.billingClient
      .send<void, number>({ cmd: 'remove_payment' }, Number(id))
      .pipe(catchRpcException<void>());
  }
}

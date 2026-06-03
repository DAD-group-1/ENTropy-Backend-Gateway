import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  CreatePaymentRequestDto,
  PaginationQueryDto,
  Payment,
  PaymentListResponseDto,
  PaymentResponseDto,
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

  findOne(id: string): Observable<Payment> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.billingClient
      .send<PaymentResponseDto, number>({ cmd: 'find_one_payment' }, Number(id))
      .pipe(catchRpcException<Payment>());
  }

  update(id: string, updateData: UpdatePaymentDto): Observable<Payment> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.billingClient
      .send<
        PaymentResponseDto,
        UpdateCommand<UpdatePaymentDto>
      >({ cmd: 'update_payment' }, { id: Number(id), updateData: updateData })
      .pipe(catchRpcException<Payment>());
  }

  remove(id: string): Observable<void> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.billingClient
      .send<void, number>({ cmd: 'remove_payment' }, Number(id))
      .pipe(catchRpcException<void>());
  }
}

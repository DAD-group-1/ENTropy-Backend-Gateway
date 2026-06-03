import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  CreatePaymentMethodRequestDto,
  PaginationQueryDto,
  PaymentMethodListResponseDto,
  PaymentMethodResponseDto,
  UpdatePaymentMethodRequestDto,
} from '@dad-group-1/backend-common';
import { ClientProxy } from '@nestjs/microservices';
import { billingServiceClientModuleName } from '../../../helpers/client-modules';
import {
  assertObjectIsNumber,
  catchRpcException,
} from '../../../helpers/check-utils';
import { UpdateCommand } from '../../../helpers/commands';

@Injectable()
export class PaymentMethodService {
  constructor(
    @Inject(billingServiceClientModuleName)
    private readonly billingClient: ClientProxy,
  ) {}

  create(
    createPaymentDto: CreatePaymentMethodRequestDto,
  ): Observable<PaymentMethodResponseDto> {
    return this.billingClient
      .send<
        PaymentMethodResponseDto,
        CreatePaymentMethodRequestDto
      >({ cmd: 'create_payment_method' }, createPaymentDto)
      .pipe(catchRpcException<PaymentMethodResponseDto>());
  }

  findAll(query: PaginationQueryDto): Observable<PaymentMethodListResponseDto> {
    return this.billingClient.send<
      PaymentMethodListResponseDto,
      PaginationQueryDto
    >({ cmd: 'find_all_payment_methods' }, query);
  }

  findOne(id: string): Observable<PaymentMethodResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.billingClient
      .send<
        PaymentMethodResponseDto,
        number
      >({ cmd: 'find_one_payment_method' }, Number(id))
      .pipe(catchRpcException<PaymentMethodResponseDto>());
  }

  update(
    id: string,
    updateData: UpdatePaymentMethodRequestDto,
  ): Observable<PaymentMethodResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.billingClient
      .send<
        PaymentMethodResponseDto,
        UpdateCommand<UpdatePaymentMethodRequestDto>
      >({ cmd: 'update_payment_method' }, { id: Number(id), updateData: updateData })
      .pipe(catchRpcException<PaymentMethodResponseDto>());
  }

  remove(id: string): Observable<void> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.billingClient
      .send<void, number>({ cmd: 'remove_payment_method' }, Number(id))
      .pipe(catchRpcException<void>());
  }
}

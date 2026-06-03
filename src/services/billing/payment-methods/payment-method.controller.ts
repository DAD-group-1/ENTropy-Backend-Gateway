import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  CreatePaymentMethodDto,
  PaginationQueryDto,
  PaymentMethodListResponseDto,
  PaymentMethodResponseDto,
  UpdatePaymentMethodDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { PaymentMethodService } from './payment-method.service';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';
import { PaginationQuery } from '../../../decorators/pagination.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payment-methods')
export class PaymentMethodController {
  constructor(private readonly paymentMethodsService: PaymentMethodService) {}

  @Post()
  @ApiBody({ type: CreatePaymentMethodDto })
  @ApiGlobalResponse(PaymentMethodResponseDto)
  @ApiOperation({
    summary: 'Create a new payment method',
    description: 'Add a new payment method to the system.',
  })
  create(
    @Body() createPaymentMethodDto: CreatePaymentMethodDto,
  ): Observable<PaymentMethodResponseDto> {
    return this.paymentMethodsService.create(createPaymentMethodDto);
  }

  @ApiOperation({
    summary: 'Get all payment methods',
    description:
      'Retrieve a list of all payment methods with pagination support.',
  })
  @Get()
  @ApiBody({ type: CreatePaymentMethodDto })
  @ApiGlobalResponse(PaymentMethodListResponseDto)
  findAll(
    @PaginationQuery() query: PaginationQueryDto,
  ): Observable<PaymentMethodListResponseDto> {
    return this.paymentMethodsService.findAll(query);
  }

  @ApiOperation({
    summary: 'Get a payment method by ID',
    description: 'Retrieve details of a specific payment method using its ID.',
  })
  @Get(':id')
  @ApiGlobalResponse(PaymentMethodResponseDto)
  findOne(@Param('id') id: string): Observable<PaymentMethodResponseDto> {
    return this.paymentMethodsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a payment method',
    description:
      'Update the details of an existing payment method using its ID.',
  })
  @Patch(':id')
  @ApiBody({ type: UpdatePaymentMethodDto })
  @ApiGlobalResponse(PaymentMethodResponseDto)
  update(
    @Param('id') id: string,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
  ): Observable<PaymentMethodResponseDto> {
    return this.paymentMethodsService.update(id, updatePaymentMethodDto);
  }

  @ApiOperation({
    summary: 'Delete a payment method',
    description: 'Remove a payment method from the system using its ID.',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    return this.paymentMethodsService.remove(id);
  }
}

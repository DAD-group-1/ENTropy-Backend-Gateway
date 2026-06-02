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
  PaymentMethodResponseDto,
  UpdatePaymentMethodDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { PaymentMethodService } from './payment-method.service';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payment-methods')
export class PaymentMethodController {
  constructor(private readonly paymentMethodsService: PaymentMethodService) {}

  @Post()
  @ApiBody({ type: CreatePaymentMethodDto })
  @ApiGlobalResponse(PaymentMethodResponseDto)
  create(
    @Body() createPaymentMethodDto: CreatePaymentMethodDto,
  ): Observable<PaymentMethodResponseDto> {
    return this.paymentMethodsService.create(createPaymentMethodDto);
  }

  @Get()
  @ApiBody({ type: CreatePaymentMethodDto })
  @ApiGlobalResponse(PaymentMethodResponseDto, true)
  findAll(): Observable<PaymentMethodResponseDto[]> {
    return this.paymentMethodsService.findAll();
  }

  @Get(':id')
  @ApiGlobalResponse(PaymentMethodResponseDto)
  findOne(@Param('id') id: string): Observable<PaymentMethodResponseDto> {
    return this.paymentMethodsService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdatePaymentMethodDto })
  @ApiGlobalResponse(PaymentMethodResponseDto)
  update(
    @Param('id') id: string,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
  ): Observable<PaymentMethodResponseDto> {
    return this.paymentMethodsService.update(id, updatePaymentMethodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    return this.paymentMethodsService.remove(id);
  }
}

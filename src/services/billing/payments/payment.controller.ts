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
  CreatePaymentDto,
  PaymentResponseDto,
  UpdatePaymentDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiBody({ type: CreatePaymentDto })
  @ApiGlobalResponse(PaymentResponseDto)
  create(
    @Body() createPaymentDto: CreatePaymentDto,
  ): Observable<PaymentResponseDto> {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiGlobalResponse(PaymentResponseDto, true)
  findAll(): Observable<PaymentResponseDto[]> {
    return this.paymentService.findAll();
  }

  @Get(':id')
  @ApiGlobalResponse(PaymentResponseDto)
  findOne(@Param('id') id: string): Observable<PaymentResponseDto> {
    return this.paymentService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdatePaymentDto })
  @ApiGlobalResponse(PaymentResponseDto)
  update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ): Observable<PaymentResponseDto> {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    return this.paymentService.remove(id);
  }
}

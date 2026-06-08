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
  PaginationQueryDto,
  PaymentListResponseDto,
  PaymentResponseDto,
  UpdatePaymentDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';
import { PaginationQuery } from '../../../decorators/pagination.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiBody({ type: CreatePaymentDto })
  @ApiGlobalResponse(PaymentResponseDto)
  @ApiOperation({
    summary: 'Create a new payment record',
    description: 'Add a new payment record to the system.',
  })
  create(
    @Body() createPaymentDto: CreatePaymentDto,
  ): Observable<PaymentResponseDto> {
    return this.paymentService.create(createPaymentDto);
  }

  @ApiOperation({
    summary: 'Get a list of payments',
    description: 'Retrieve a paginated list of payments from the system.',
  })
  @Get()
  @ApiGlobalResponse(PaymentListResponseDto)
  findAll(
    @PaginationQuery() query: PaginationQueryDto,
  ): Observable<PaymentListResponseDto> {
    return this.paymentService.findAll(query);
  }

  @ApiOperation({
    summary: 'Get a payment by ID',
    description: 'Retrieve a single payment record by its unique ID.',
  })
  @Get(':id')
  @ApiGlobalResponse(PaymentResponseDto)
  findOne(@Param('id') id: string): Observable<PaymentResponseDto> {
    return this.paymentService.findOne(id);
  }

  @ApiOperation({
    summary: 'Get all payments for a student',
    description:
      'Retrieve a list of all payment records associated with a specific student ID.',
  })
  @Get('student/:studentId')
  @ApiGlobalResponse(PaymentListResponseDto)
  findByStudentId(
    @Param('studentId') studentId: string,
    @PaginationQuery() query: PaginationQueryDto,
  ): Observable<PaymentListResponseDto> {
    return this.paymentService.findByStudentId(studentId, query);
  }

  @ApiOperation({
    summary: 'Update a payment record',
    description: 'Update the details of an existing payment record by its ID.',
  })
  @Patch(':id')
  @ApiBody({ type: UpdatePaymentDto })
  @ApiGlobalResponse(PaymentResponseDto)
  update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ): Observable<PaymentResponseDto> {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @ApiOperation({
    summary: 'Delete a payment record',
    description: 'Remove a payment record from the system by its ID.',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    return this.paymentService.remove(id);
  }
}

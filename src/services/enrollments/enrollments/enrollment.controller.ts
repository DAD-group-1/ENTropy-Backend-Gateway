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
  CreateEnrollmentRequestDto,
  EnrollmentListResponseDto,
  EnrollmentResponseDto,
  PaginationQueryDto,
  UpdateEnrollmentDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { EnrollmentService } from './enrollment.service';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';
import { PaginationQuery } from '../../../decorators/pagination.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  @ApiBody({ type: CreateEnrollmentRequestDto })
  @ApiGlobalResponse(EnrollmentResponseDto)
  @ApiOperation({
    summary: 'Create a new enrollment record',
    description: 'Add a new enrollment record to the system.',
  })
  create(
    @Body() createEnrollmentDto: CreateEnrollmentRequestDto,
  ): Observable<EnrollmentResponseDto> {
    return this.enrollmentService.create(createEnrollmentDto);
  }

  @ApiOperation({
    summary: 'Get a list of enrollments',
    description: 'Retrieve a paginated list of enrollments.',
  })
  @Get()
  @ApiGlobalResponse(EnrollmentListResponseDto)
  findAll(
    @PaginationQuery() query: PaginationQueryDto,
  ): Observable<EnrollmentListResponseDto> {
    return this.enrollmentService.findAll(query);
  }

  @ApiOperation({
    summary: 'Get a specific enrollment',
    description: 'Retrieve details of a specific enrollment by its ID.',
  })
  @Get(':id')
  @ApiGlobalResponse(EnrollmentResponseDto)
  findOne(@Param('id') id: string): Observable<EnrollmentResponseDto> {
    return this.enrollmentService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update an enrollment',
    description: 'Update details of an existing enrollment by its ID.',
  })
  @Patch(':id')
  @ApiBody({ type: UpdateEnrollmentDto })
  @ApiGlobalResponse(EnrollmentResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ): Observable<EnrollmentResponseDto> {
    return this.enrollmentService.update(id, updateEnrollmentDto);
  }

  @ApiOperation({
    summary: 'Delete an enrollment',
    description: 'Remove an enrollment from the system by its ID.',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    return this.enrollmentService.remove(id);
  }
}

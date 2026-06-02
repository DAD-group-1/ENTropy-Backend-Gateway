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
  EnrollmentResponseDto,
  UpdateEnrollmentDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { EnrollmentService } from './enrollment.service';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  @ApiBody({ type: CreateEnrollmentRequestDto })
  @ApiGlobalResponse(EnrollmentResponseDto)
  create(
    @Body() createEnrollmentDto: CreateEnrollmentRequestDto,
  ): Observable<EnrollmentResponseDto> {
    return this.enrollmentService.create(createEnrollmentDto);
  }

  @Get()
  @ApiGlobalResponse(EnrollmentResponseDto, true)
  findAll(): Observable<EnrollmentResponseDto[]> {
    return this.enrollmentService.findAll();
  }

  @Get(':id')
  @ApiGlobalResponse(EnrollmentResponseDto)
  findOne(@Param('id') id: string): Observable<EnrollmentResponseDto> {
    return this.enrollmentService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateEnrollmentDto })
  @ApiGlobalResponse(EnrollmentResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ): Observable<EnrollmentResponseDto> {
    return this.enrollmentService.update(id, updateEnrollmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    return this.enrollmentService.remove(id);
  }
}

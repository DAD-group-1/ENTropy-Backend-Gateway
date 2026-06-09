import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  AttendanceListResponseDto,
  AttendanceResponseDto,
  CreateAttendanceRequestDto,
  PaginationQueryDto,
  UpdateAttendanceDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';
import { PaginationQuery } from '../../../decorators/pagination.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('attendances')
export class AttendanceController {
  private readonly logger = new Logger(AttendanceController.name);
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @ApiBody({ type: CreateAttendanceRequestDto })
  @ApiGlobalResponse(AttendanceResponseDto)
  @ApiOperation({
    summary: 'Create a new attendance record',
    description: 'Add a new attendance record to the system.',
  })
  create(
    @Body() createAttendanceDto: CreateAttendanceRequestDto,
  ): Observable<AttendanceResponseDto> {
    return this.attendanceService.create(createAttendanceDto);
  }

  @ApiOperation({
    summary: 'Get all attendance records',
    description: 'Retrieve a paginated list of all attendance records.',
  })
  @Get()
  @ApiGlobalResponse(AttendanceListResponseDto)
  findAll(
    @PaginationQuery() query: PaginationQueryDto,
  ): Observable<AttendanceListResponseDto> {
    return this.attendanceService.findAll(query);
  }

  @ApiOperation({
    summary: 'Get a specific attendance record',
    description: 'Retrieve details of a specific attendance record by its ID.',
  })
  @Get(':id')
  @ApiGlobalResponse(AttendanceResponseDto)
  findOne(@Param('id') id: string): Observable<AttendanceResponseDto> {
    return this.attendanceService.findOne(id);
  }

  @ApiOperation({
    summary: 'Get attendance records for a specific student',
    description:
      'Retrieve a paginated list of attendance records for a given student ID.',
  })
  @Get('student/:studentId')
  @ApiGlobalResponse(AttendanceListResponseDto)
  findByStudentId(
    @Param('studentId') studentId: string,
    @PaginationQuery() query: PaginationQueryDto,
  ): Observable<AttendanceListResponseDto> {
    return this.attendanceService.findByStudentId(studentId, query);
  }

  @ApiOperation({
    summary: 'Update an attendance record',
    description:
      'Update the details of an existing attendance record by its ID.',
  })
  @Patch(':id')
  @ApiBody({ type: UpdateAttendanceDto })
  @ApiGlobalResponse(AttendanceResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ): Observable<AttendanceResponseDto> {
    return this.attendanceService.update(id, updateAttendanceDto);
  }

  @ApiOperation({
    summary: 'Delete an attendance record',
    description: 'Remove an attendance record from the system by its ID.',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    return this.attendanceService.remove(id);
  }
}

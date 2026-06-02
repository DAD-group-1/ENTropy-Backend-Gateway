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
  AttendanceResponseDto,
  CreateAttendanceRequestDto,
  UpdateAttendanceDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('attendances')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @ApiBody({ type: CreateAttendanceRequestDto })
  @ApiGlobalResponse(AttendanceResponseDto)
  create(
    @Body() createAttendanceDto: CreateAttendanceRequestDto,
  ): Observable<AttendanceResponseDto> {
    return this.attendanceService.create(createAttendanceDto);
  }

  @Get()
  @ApiGlobalResponse(AttendanceResponseDto, true)
  findAll(): Observable<AttendanceResponseDto[]> {
    return this.attendanceService.findAll();
  }

  @Get(':id')
  @ApiGlobalResponse(AttendanceResponseDto)
  findOne(@Param('id') id: string): Observable<AttendanceResponseDto> {
    return this.attendanceService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateAttendanceDto })
  @ApiGlobalResponse(AttendanceResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ): Observable<AttendanceResponseDto> {
    return this.attendanceService.update(id, updateAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    return this.attendanceService.remove(id);
  }
}

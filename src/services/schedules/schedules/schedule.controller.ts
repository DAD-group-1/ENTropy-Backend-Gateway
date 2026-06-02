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
  CreateScheduleRequestDto,
  ScheduleResponseDto,
  UpdateScheduleDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { ScheduleService } from './schedule.service';
import { RolesGuard } from '../../../guards/roles.guard';
import { Roles, UserRole } from '../../../decorators/roles.decorator';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @Roles(UserRole.Instructor, UserRole.Management, UserRole.Admin)
  @ApiBody({ type: CreateScheduleRequestDto })
  @ApiGlobalResponse(ScheduleResponseDto)
  create(
    @Body() createScheduleDto: CreateScheduleRequestDto,
  ): Observable<ScheduleResponseDto> {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get()
  @ApiGlobalResponse(ScheduleResponseDto, true)
  findAll(): Observable<ScheduleResponseDto[]> {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  @ApiGlobalResponse(ScheduleResponseDto)
  findOne(@Param('id') id: string): Observable<ScheduleResponseDto> {
    return this.scheduleService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateScheduleDto })
  @ApiGlobalResponse(ScheduleResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ): Observable<ScheduleResponseDto> {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    return this.scheduleService.remove(id);
  }
}

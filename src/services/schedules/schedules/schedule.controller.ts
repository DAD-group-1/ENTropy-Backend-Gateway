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
  CreateScheduleRequestDto,
  PaginationQueryDto,
  ScheduleListResponseDto,
  ScheduleResponseDto,
  TemporalQueryDto,
  UpdateScheduleDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ScheduleService } from './schedule.service';
import { RolesGuard } from '../../../guards/roles.guard';
import { Roles, UserRole } from '../../../decorators/roles.decorator';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';
import {
  PaginationQuery,
  TemporalQuery,
} from '../../../decorators/pagination.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('schedules')
export class ScheduleController {
  private readonly logger = new Logger(ScheduleController.name);
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @Roles(UserRole.Instructor, UserRole.Management, UserRole.Admin)
  @ApiBody({ type: CreateScheduleRequestDto })
  @ApiGlobalResponse(ScheduleResponseDto)
  @ApiOperation({
    summary: 'Create a new schedule record',
    description: 'Add a new schedule record to the system.',
  })
  create(
    @Body() createScheduleDto: CreateScheduleRequestDto,
  ): Observable<ScheduleResponseDto> {
    return this.scheduleService.create(createScheduleDto);
  }

  @ApiOperation({
    summary: 'Get all schedule records',
    description: 'Retrieve a list of all schedule records in the system.',
  })
  @Get()
  @ApiGlobalResponse(ScheduleListResponseDto)
  findAll(
    @PaginationQuery() query: PaginationQueryDto,
  ): Observable<ScheduleListResponseDto> {
    return this.scheduleService.findAll(query);
  }

  @ApiOperation({
    summary: 'Get a schedule record by ID',
    description: 'Retrieve a single schedule record by its unique ID.',
  })
  @Get(':id')
  @ApiGlobalResponse(ScheduleResponseDto)
  findOne(@Param('id') id: string): Observable<ScheduleResponseDto> {
    return this.scheduleService.findOne(id);
  }

  @ApiOperation({
    summary: 'Get all the schedule records for a specific program',
    description:
      'Retrieve a list of schedule records associated with a specific program ID.',
  })
  @Get('program/:programId')
  @ApiGlobalResponse(ScheduleListResponseDto, true)
  findByProgramId(
    @Param('programId') programId: string,
    @PaginationQuery() query: PaginationQueryDto,
  ): Observable<ScheduleListResponseDto> {
    return this.scheduleService.findByProgramId(programId, query);
  }

  @ApiOperation({
    summary: 'Get all the schedule records between a specific date range',
    description:
      'Retrieve a list of schedule records that fall within a specified date range.',
  })
  @Get('program/:programId/date-range')
  @ApiGlobalResponse(ScheduleResponseDto, true)
  findByDateRange(
    @Param('programId') programId: string,
    @TemporalQuery() query: TemporalQueryDto,
  ): Observable<ScheduleResponseDto[]> {
    return this.scheduleService.findByProgramInDateRange(programId, query);
  }

  @ApiOperation({
    summary: 'Update a schedule record',
    description: 'Update an existing schedule record by its unique ID.',
  })
  @Patch(':id')
  @ApiBody({ type: UpdateScheduleDto })
  @ApiGlobalResponse(ScheduleResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ): Observable<ScheduleResponseDto> {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  @ApiOperation({
    summary: 'Delete a schedule record',
    description: 'Remove a schedule record from the system by its unique ID.',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    return this.scheduleService.remove(id);
  }
}

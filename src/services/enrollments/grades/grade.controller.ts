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
  CreateGradeRequestDto,
  GradeListResponseDto,
  GradeResponseDto,
  PaginationQueryDto,
  UpdateGradeDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { GradeService } from './grade.service';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';
import { PaginationQuery } from '../../../decorators/pagination.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('grades')
export class GradeController {
  private readonly logger = new Logger(GradeController.name);
  constructor(private readonly gradeService: GradeService) {}

  @Post()
  @ApiBody({ type: CreateGradeRequestDto })
  @ApiGlobalResponse(GradeResponseDto)
  @ApiOperation({
    summary: 'Create a new grade record',
    description: 'Add a new grade record to the system.',
  })
  create(
    @Body() createGradeDto: CreateGradeRequestDto,
  ): Observable<GradeResponseDto> {
    this.logger.log('Creating a new grade record');
    return this.gradeService.create(createGradeDto);
  }

  @ApiOperation({
    summary: 'Get all grade records',
    description: 'Retrieve a list of all grade records in the system.',
  })
  @Get()
  @ApiGlobalResponse(GradeListResponseDto)
  findAll(
    @PaginationQuery() query: PaginationQueryDto,
  ): Observable<GradeListResponseDto> {
    this.logger.log('Retrieving all grade records with pagination');
    return this.gradeService.findAll(query);
  }

  @ApiOperation({
    summary: 'Get a grade record by ID',
    description: 'Retrieve a specific grade record using its unique ID.',
  })
  @Get(':id')
  @ApiGlobalResponse(GradeResponseDto)
  findOne(@Param('id') id: string): Observable<GradeResponseDto> {
    this.logger.log('Retrieving grade record with ID: ' + id);
    return this.gradeService.findOne(id);
  }

  @ApiOperation({
    summary: 'Get grade records by student ID',
    description:
      'Retrieve all grade records associated with a specific student ID.',
  })
  @Get('student/:studentId')
  @ApiGlobalResponse(GradeListResponseDto)
  findByStudentId(
    @Param('studentId') studentId: string,
    @PaginationQuery() query: PaginationQueryDto,
  ): Observable<GradeListResponseDto> {
    this.logger.log('Retrieving grade records for student ID: ' + studentId);
    return this.gradeService.findByStudentId(studentId, query);
  }

  @ApiOperation({
    summary: 'Update a grade record',
    description: 'Modify an existing grade record using its unique ID.',
  })
  @Patch(':id')
  @ApiBody({ type: UpdateGradeDto })
  @ApiGlobalResponse(GradeResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateGradeDto: UpdateGradeDto,
  ): Observable<GradeResponseDto> {
    this.logger.log('Updating grade record with ID: ' + id);
    return this.gradeService.update(id, updateGradeDto);
  }

  @ApiOperation({
    summary: 'Delete a grade record',
    description:
      'Remove a specific grade record from the system using its unique ID.',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    this.logger.log('Deleting grade record with ID: ' + id);
    return this.gradeService.remove(id);
  }
}

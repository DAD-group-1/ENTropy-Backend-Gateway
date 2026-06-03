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
    return this.gradeService.findAll(query);
  }

  @ApiOperation({
    summary: 'Get a grade record by ID',
    description: 'Retrieve a specific grade record using its unique ID.',
  })
  @Get(':id')
  @ApiGlobalResponse(GradeResponseDto)
  findOne(@Param('id') id: string): Observable<GradeResponseDto> {
    return this.gradeService.findOne(id);
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
    return this.gradeService.update(id, updateGradeDto);
  }

  @ApiOperation({
    summary: 'Delete a grade record',
    description:
      'Remove a specific grade record from the system using its unique ID.',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    return this.gradeService.remove(id);
  }
}

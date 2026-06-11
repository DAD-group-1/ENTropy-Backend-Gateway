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
  CourseListResponseDto,
  CourseResponseDto,
  CreateCourseDto,
  PaginationQueryDto,
  UpdateCourseDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';
import { PaginationQuery } from '../../../decorators/pagination.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('courses')
export class CourseController {
  private readonly logger = new Logger(CourseController.name);
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @ApiBody({ type: CreateCourseDto })
  @ApiGlobalResponse(CourseResponseDto)
  @ApiOperation({
    summary: 'Create a new course record',
    description: 'Add a new course record to the system.',
  })
  create(
    @Body() createCourseDto: CreateCourseDto,
  ): Observable<CourseResponseDto> {
    this.logger.log('Creating a new course record');
    return this.courseService.create(createCourseDto);
  }

  @ApiOperation({
    summary: 'Get a list of courses',
    description: 'Retrieve a paginated list of courses from the system.',
  })
  @Get()
  @ApiGlobalResponse(CourseListResponseDto)
  findAll(
    @PaginationQuery() query: PaginationQueryDto,
  ): Observable<CourseListResponseDto> {
    this.logger.log('Retrieving a list of courses with pagination');
    return this.courseService.findAll(query);
  }

  @ApiOperation({
    summary: 'Get a course by ID',
    description: 'Retrieve a single course record by its unique ID.',
  })
  @Get(':id')
  @ApiGlobalResponse(CourseResponseDto)
  findOne(@Param('id') id: string): Observable<CourseResponseDto> {
    this.logger.log('Retrieving course with ID: ' + id);
    return this.courseService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a course by ID',
    description: 'Update an existing course record by its unique ID.',
  })
  @Patch(':id')
  @ApiBody({ type: UpdateCourseDto })
  @ApiGlobalResponse(CourseResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Observable<CourseResponseDto> {
    this.logger.log('Updating course with ID: ' + id);
    return this.courseService.update(id, updateCourseDto);
  }

  @ApiOperation({
    summary: 'Delete a course by ID',
    description: 'Remove a course record from the system by its unique ID.',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    this.logger.log('Deleting course with ID: ' + id);
    return this.courseService.remove(id);
  }
}

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
  CourseResponseDto,
  CreateCourseDto,
  UpdateCourseDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @ApiBody({ type: CreateCourseDto })
  @ApiGlobalResponse(CourseResponseDto)
  create(
    @Body() createCourseDto: CreateCourseDto,
  ): Observable<CourseResponseDto> {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  @ApiGlobalResponse(CourseResponseDto, true)
  findAll(): Observable<CourseResponseDto[]> {
    return this.courseService.findAll();
  }

  @Get(':id')
  @ApiGlobalResponse(CourseResponseDto)
  findOne(@Param('id') id: string): Observable<CourseResponseDto> {
    return this.courseService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateCourseDto })
  @ApiGlobalResponse(CourseResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Observable<CourseResponseDto> {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    return this.courseService.remove(id);
  }
}

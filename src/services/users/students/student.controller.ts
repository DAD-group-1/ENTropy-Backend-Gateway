import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, UseGuards, } from '@nestjs/common';
import { StudentService } from './student.service';
import { Observable } from 'rxjs';
import {
  CreateStudentDto,
  CreateStudentResponseDto,
  PaginationQueryDto,
  Student,
  StudentListResponseDto,
  UpdateStudentDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';
import { PaginationQuery } from '../../../decorators/pagination.decorators';

@Controller('students')
export class StudentController {
  readonly logger = new Logger(StudentController.name);
  constructor(private readonly studentService: StudentService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiBody({ type: CreateStudentDto })
  @ApiGlobalResponse(CreateStudentResponseDto)
  create(
    @Body() createStudentDto: CreateStudentDto,
  ): Observable<CreateStudentResponseDto> {
    return this.studentService.create(createStudentDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiGlobalResponse(CreateStudentResponseDto)
  findAll(
    @PaginationQuery() query: PaginationQueryDto,
  ): Observable<StudentListResponseDto> {
    return this.studentService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiGlobalResponse(CreateStudentResponseDto)
  findOne(@Param('id') id: string): Observable<Student> {
    return this.studentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiBody({ type: UpdateStudentDto })
  @ApiGlobalResponse(CreateStudentResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Observable<Student> {
    return this.studentService.update(id, updateStudentDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    return this.studentService.remove(id);
  }
}

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
import { StudentService } from './student.service';
import { Observable } from 'rxjs';
import {
  CreateStudentDto,
  CreateStudentResponseDto,
  PaginationQueryDto,
  Student,
  StudentListResponseDto,
  StudentResponseDto,
  UpdateStudentDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';
import { PaginationQuery } from '../../../decorators/pagination.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('students')
export class StudentController {
  readonly logger = new Logger(StudentController.name);
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @ApiBody({ type: CreateStudentDto })
  @ApiGlobalResponse(CreateStudentResponseDto)
  @ApiOperation({
    summary: 'Create a new student record',
    description: 'Add a new student record to the system.',
  })
  create(
    @Body() createStudentDto: CreateStudentDto,
  ): Observable<CreateStudentResponseDto> {
    return this.studentService.create(createStudentDto);
  }

  @ApiOperation({
    summary: 'Get all student records',
    description: 'Retrieve a list of all student records in the system.',
  })
  @Get()
  @ApiGlobalResponse(StudentListResponseDto)
  findAll(
    @PaginationQuery() query: PaginationQueryDto,
  ): Observable<StudentListResponseDto> {
    return this.studentService.findAll(query);
  }

  @ApiOperation({
    summary: 'Get a student record by ID',
    description: 'Retrieve a single student record by its unique ID.',
  })
  @Get(':id')
  @ApiGlobalResponse(StudentResponseDto)
  findOne(@Param('id') id: string): Observable<Student> {
    return this.studentService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a student record',
    description: 'Update an existing student record by its unique ID.',
  })
  @Patch(':id')
  @ApiBody({ type: UpdateStudentDto })
  @ApiGlobalResponse(CreateStudentResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Observable<Student> {
    return this.studentService.update(id, updateStudentDto);
  }

  @ApiOperation({
    summary: 'Delete a student record',
    description: 'Remove a student record from the system by its unique ID.',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    return this.studentService.remove(id);
  }
}

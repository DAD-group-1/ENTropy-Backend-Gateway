import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { Observable } from 'rxjs';
import {
  CreateStudentDto,
  CreateStudentResponseDto,
  Student,
  UpdateStudentDto,
} from '@dad-group-1/backend-common';
import { MessageTransformerInterceptor } from '../../helpers/message-interceptor';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { throwHttpError } from '../../helpers/check-utils';

@Controller('students')
@UseInterceptors(MessageTransformerInterceptor)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(
    @Body() createStudentDto: CreateStudentDto,
  ): Observable<CreateStudentResponseDto> {
    const result = this.studentService.create(createStudentDto);
    if (!result)
      throw new throwHttpError(
        'Instructor registration failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return result;
  }

  @Get()
  findAll(): Observable<Student[]> {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<Student> {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Observable<Student> {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    return this.studentService.remove(id);
  }
}

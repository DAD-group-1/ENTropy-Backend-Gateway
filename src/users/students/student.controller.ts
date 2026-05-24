import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { Observable } from 'rxjs';
import { Student } from './interfaces/student.interface';
import { TransformInterceptor } from '../../common/transform-interceptor';
import {
  CreateStudentDto,
  UpdateStudentDto,
} from './interfaces/dtos/student.dto';
import { RegisterStudentRequestDto } from '../../../../../ENTropy-Backend-Common/src/core/services/users/students/interfaces/dtos/register-student.request.dto';
import type { RegisterStudentResponseDto } from '../../../../../ENTropy-Backend-Common/src/core/services/users/students/interfaces/dtos/register-student.response.dto';

@Controller('students')
@UseInterceptors(TransformInterceptor)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto): Observable<Student> {
    return this.studentService.create(createStudentDto);
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

  @Post('register')
  async registerStudent(
    @Body() body: RegisterStudentRequestDto,
  ): Promise<RegisterStudentResponseDto> {
    const result = await this.studentService.register(body);
    if (!result) throw new UnauthorizedException('Student registration failed');
    return result;
  }
}

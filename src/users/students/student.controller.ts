import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { Observable } from 'rxjs';
import { CreateStudentDto } from './interfaces/dtos/create-student.dto';
import { Student } from './interfaces/student.interface';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(
    @Body() createStudentDto: CreateStudentDto,
  ): Observable<Student> {
    return this.studentService.createStudent(createStudentDto);
  }

  @Get()
  findAll(): Observable<Student[]> {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Body('id') id: number): Observable<Student> {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Body('id') id: number,
    @Body() updateStudentDto: Partial<CreateStudentDto>,
  ): Observable<Student> {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Body('id') id: number): Observable<void> {
    return this.studentService.remove(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
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

@Controller('students')
@UseInterceptors(MessageTransformerInterceptor)
export class StudentController {
    constructor(private readonly studentService: StudentService) {
    }

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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('register')
  async registerStudent(
    @Body() body: CreateStudentDto,
  ): Promise<CreateStudentResponseDto> {
    const result = await this.studentService.register(body);
    if (!result) throw new UnauthorizedException('Student registration failed');
    return result;
  }
}

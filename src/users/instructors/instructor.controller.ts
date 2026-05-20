import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { CreateInstructorDto } from './interfaces/dtos/create-instructor.dto';
import { Observable } from 'rxjs';
import { Instructor } from './interfaces/instructor.interface';

@Controller('instructors')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Post()
  create(
    @Body() createInstructorDto: CreateInstructorDto,
  ): Observable<Instructor> {
    return this.instructorService.create(createInstructorDto);
  }

  @Get()
  findAll(): Observable<Instructor[]> {
    return this.instructorService.findAll();
  }

  @Get(':id')
  findOne(@Body('id') id: number): Observable<Instructor> {
    return this.instructorService.findOne(id);
  }

  @Patch(':id')
  update(
    @Body('id') id: number,
    @Body() updateInstructorDto: Partial<CreateInstructorDto>,
  ): Observable<Instructor> {
    return this.instructorService.update(id, updateInstructorDto);
  }

  @Delete(':id')
  remove(@Body('id') id: number): Observable<void> {
    return this.instructorService.remove(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InstructorService } from './instructor.service';
import {
  CreateInstructorDto,
  UpdateInstructorDto,
} from './interfaces/dtos/instructor.dto';
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
  findOne(@Param('id') id: string): Observable<Instructor> {
    return this.instructorService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInstructorDto: UpdateInstructorDto,
  ): Observable<Instructor> {
    return this.instructorService.update(id, updateInstructorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Observable<void> {
    return this.instructorService.remove(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { Observable } from 'rxjs';
import {
  CreateInstructorDto,
  CreateInstructorResponseDto,
  Instructor,
  UpdateInstructorDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { MessageTransformerInterceptor } from '../../helpers/message-interceptor';

@Controller('instructors')
@UseInterceptors(MessageTransformerInterceptor)
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(
    @Body() body: CreateInstructorDto,
  ): Observable<CreateInstructorResponseDto> {
    return this.instructorService.create(body);
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

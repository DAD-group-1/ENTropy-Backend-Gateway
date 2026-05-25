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
import { throwHttpError } from '../../helpers/check-utils';

@Controller('instructors')
@UseInterceptors(MessageTransformerInterceptor)
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('create')
  create(
    @Body() body: CreateInstructorDto,
  ): Observable<CreateInstructorResponseDto> {
    const result = this.instructorService.create(body);
    if (!result)
      throwHttpError(
        'Instructor registration failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return result;
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

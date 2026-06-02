import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { Observable } from 'rxjs';
import {
  CreateInstructorDto,
  CreateInstructorResponseDto,
  Instructor,
  UpdateInstructorDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../../../decorators/roles.decorator';
import { RolesGuard } from '../../../guards/roles.guard';

@Controller('instructors')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @ApiBearerAuth()
  @Post()
  @ApiBody({ type: CreateInstructorDto })
  @ApiResponse({ type: CreateInstructorResponseDto })
  create(
    @Body() body: CreateInstructorDto,
  ): Observable<CreateInstructorResponseDto> {
    return this.instructorService.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @ApiBearerAuth()
  @Get()
  @ApiResponse({ type: [CreateInstructorResponseDto] })
  findAll(): Observable<Instructor[]> {
    return this.instructorService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @ApiBearerAuth()
  @Get(':id')
  @ApiResponse({ type: CreateInstructorResponseDto })
  findOne(@Param('id') id: string): Observable<Instructor> {
    return this.instructorService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @ApiBearerAuth()
  @Patch(':id')
  @ApiBody({ type: UpdateInstructorDto })
  @ApiResponse({ type: CreateInstructorResponseDto })
  update(
    @Param('id') id: string,
    @Body() updateInstructorDto: UpdateInstructorDto,
  ): Observable<Instructor> {
    return this.instructorService.update(id, updateInstructorDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: number): Observable<void> {
    return this.instructorService.remove(id);
  }
}

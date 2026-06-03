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
  InstructorResponseDto,
  UpdateInstructorDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Roles, UserRole } from '../../../decorators/roles.decorator';
import { RolesGuard } from '../../../guards/roles.guard';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('instructors')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @ApiGlobalResponse(CreateInstructorResponseDto)
  @ApiBody({ type: CreateInstructorDto })
  @Roles(UserRole.Admin)
  @Post()
  create(
    @Body() body: CreateInstructorDto,
  ): Observable<CreateInstructorResponseDto> {
    return this.instructorService.create(body);
  }

  @Roles(UserRole.Admin)
  @Get()
  @ApiGlobalResponse(InstructorResponseDto, true)
  findAll(): Observable<Instructor[]> {
    return this.instructorService.findAll();
  }

  @Roles(UserRole.Admin)
  @Get(':id')
  @ApiGlobalResponse(InstructorResponseDto)
  findOne(@Param('id') id: string): Observable<Instructor> {
    return this.instructorService.findOne(id);
  }

  @Roles(UserRole.Admin)
  @Patch(':id')
  @ApiBody({ type: UpdateInstructorDto })
  @ApiGlobalResponse(CreateInstructorResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateInstructorDto: UpdateInstructorDto,
  ): Observable<Instructor> {
    return this.instructorService.update(id, updateInstructorDto);
  }

  @Roles(UserRole.Admin)
  @Delete(':id')
  remove(@Param('id') id: number): Observable<void> {
    return this.instructorService.remove(id);
  }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { Observable } from 'rxjs';
import {
  CreateInstructorDto,
  CreateInstructorRequestDto,
  CreateInstructorResponseDto,
  InstructorListResponseDto,
  InstructorResponseDto,
  PaginationQueryDto,
  UpdateInstructorDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Roles, UserRole } from '../../../decorators/roles.decorator';
import { RolesGuard } from '../../../guards/roles.guard';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';
import { PaginationQuery } from '../../../decorators/pagination.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('instructors')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @ApiGlobalResponse(CreateInstructorResponseDto)
  @ApiBody({ type: CreateInstructorDto })
  @Roles(UserRole.Admin)
  @Post()
  @ApiOperation({
    summary: 'Create a new instructor',
    description:
      'Add a new instructor to the system with the provided details.',
  })
  create(
    @Body() body: CreateInstructorRequestDto,
  ): Observable<CreateInstructorResponseDto> {
    return this.instructorService.create(body);
  }

  @ApiOperation({
    summary: 'Get a list of all instructors',
    description: 'Retrieve a paginated list of all instructors in the system.',
  })
  @Roles(UserRole.Instructor, UserRole.Admin)
  @Get()
  @ApiGlobalResponse(InstructorListResponseDto)
  findAll(
    @PaginationQuery() query: PaginationQueryDto,
  ): Observable<InstructorListResponseDto> {
    return this.instructorService.findAll(query);
  }

  @ApiOperation({
    summary: 'Get a specific instructor by ID',
    description:
      'Retrieve detailed information about a specific instructor using their unique ID.',
  })
  @Roles(UserRole.Instructor, UserRole.Admin)
  @Get(':id')
  @ApiGlobalResponse(InstructorResponseDto)
  findOne(@Param('id') id: string): Observable<InstructorResponseDto> {
    return this.instructorService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update an existing instructor',
    description:
      'Modify the details of an existing instructor using their unique ID.',
  })
  @Roles(UserRole.Admin)
  @Patch(':id')
  @ApiBody({ type: UpdateInstructorDto })
  @ApiGlobalResponse(CreateInstructorResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateInstructorDto: UpdateInstructorDto,
  ): Observable<InstructorResponseDto> {
    return this.instructorService.update(id, updateInstructorDto);
  }

  @ApiOperation({
    summary: 'Delete an instructor',
    description: 'Remove an instructor from the system using their unique ID.',
  })
  @Roles(UserRole.Admin)
  @Delete(':id')
  remove(@Param('id') id: number): Observable<void> {
    return this.instructorService.remove(id);
  }
}

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
import { Observable } from 'rxjs';
import {
  CreateProgramDto,
  PaginationQueryDto,
  ProgramListResponseDto,
  ProgramResponseDto,
  UpdateProgramDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ProgramService } from './program.service';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';
import { PaginationQuery } from '../../../decorators/pagination.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('programs')
export class ProgramController {
  constructor(private readonly courseService: ProgramService) {}

  @Post()
  @ApiBody({ type: CreateProgramDto })
  @ApiGlobalResponse(ProgramResponseDto)
  @ApiOperation({
    summary: 'Create a new program record',
    description: 'Add a new program record to the system.',
  })
  create(
    @Body() createProgramDto: CreateProgramDto,
  ): Observable<ProgramResponseDto> {
    return this.courseService.create(createProgramDto);
  }

  @ApiOperation({
    summary: 'Get all program records',
    description: 'Retrieve a list of all program records in the system.',
  })
  @Get()
  @ApiGlobalResponse(ProgramListResponseDto)
  findAll(
    @PaginationQuery() query: PaginationQueryDto,
  ): Observable<ProgramListResponseDto> {
    return this.courseService.findAll(query);
  }

  @ApiOperation({
    summary: 'Get a program record by ID',
    description: 'Retrieve a specific program record using its unique ID.',
  })
  @Get(':id')
  @ApiBody({ type: ProgramResponseDto })
  @ApiGlobalResponse(ProgramResponseDto)
  findOne(@Param('id') id: string): Observable<ProgramResponseDto> {
    return this.courseService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a program record',
    description: 'Modify an existing program record by its ID.',
  })
  @Patch(':id')
  @ApiBody({ type: UpdateProgramDto })
  @ApiGlobalResponse(ProgramResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateProgramDto: UpdateProgramDto,
  ): Observable<ProgramResponseDto> {
    return this.courseService.update(id, updateProgramDto);
  }

  @ApiOperation({
    summary: 'Delete a program record',
    description: 'Remove a program record from the system by its ID.',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    return this.courseService.remove(id);
  }
}

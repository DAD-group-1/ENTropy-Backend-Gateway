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
  ProgramResponseDto,
  UpdateProgramDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { ProgramService } from './program.service';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('programs')
export class ProgramController {
  constructor(private readonly courseService: ProgramService) {}

  @Post()
  @ApiBody({ type: CreateProgramDto })
  @ApiGlobalResponse(ProgramResponseDto)
  create(
    @Body() createProgramDto: CreateProgramDto,
  ): Observable<ProgramResponseDto> {
    return this.courseService.create(createProgramDto);
  }

  @Get()
  @ApiGlobalResponse(ProgramResponseDto, true)
  findAll(): Observable<ProgramResponseDto[]> {
    return this.courseService.findAll();
  }

  @Get(':id')
  @ApiBody({ type: ProgramResponseDto })
  @ApiGlobalResponse(ProgramResponseDto)
  findOne(@Param('id') id: string): Observable<ProgramResponseDto> {
    return this.courseService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateProgramDto })
  @ApiGlobalResponse(ProgramResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateProgramDto: UpdateProgramDto,
  ): Observable<ProgramResponseDto> {
    return this.courseService.update(id, updateProgramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    return this.courseService.remove(id);
  }
}

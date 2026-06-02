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
  CreateGradeRequestDto,
  GradeResponseDto,
  UpdateGradeDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { GradeService } from './grade.service';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('grades')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Post()
  @ApiBody({ type: CreateGradeRequestDto })
  @ApiGlobalResponse(GradeResponseDto)
  create(
    @Body() createGradeDto: CreateGradeRequestDto,
  ): Observable<GradeResponseDto> {
    return this.gradeService.create(createGradeDto);
  }

  @Get()
  @ApiGlobalResponse(GradeResponseDto, true)
  findAll(): Observable<GradeResponseDto[]> {
    return this.gradeService.findAll();
  }

  @Get(':id')
  @ApiGlobalResponse(GradeResponseDto)
  findOne(@Param('id') id: string): Observable<GradeResponseDto> {
    return this.gradeService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateGradeDto })
  @ApiGlobalResponse(GradeResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateGradeDto: UpdateGradeDto,
  ): Observable<GradeResponseDto> {
    return this.gradeService.update(id, updateGradeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    return this.gradeService.remove(id);
  }
}

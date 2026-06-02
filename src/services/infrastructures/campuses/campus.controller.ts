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
  CampusResponseDto,
  CreateCampusRequestDto,
  UpdateCampusDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CampusService } from './campus.service';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('campuses')
export class CampusController {
  constructor(private readonly campusService: CampusService) {}

  @Post()
  @ApiBody({ type: CreateCampusRequestDto })
  @ApiGlobalResponse(CampusResponseDto)
  create(
    @Body() createCampusDto: CreateCampusRequestDto,
  ): Observable<CampusResponseDto> {
    return this.campusService.create(createCampusDto);
  }

  @Get()
  @ApiGlobalResponse(CampusResponseDto, true)
  findAll(): Observable<CampusResponseDto[]> {
    return this.campusService.findAll();
  }

  @Get(':id')
  @ApiGlobalResponse(CampusResponseDto)
  findOne(@Param('id') id: string): Observable<CampusResponseDto> {
    return this.campusService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateCampusDto })
  @ApiGlobalResponse(CampusResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateCampusDto: UpdateCampusDto,
  ): Observable<CampusResponseDto> {
    return this.campusService.update(id, updateCampusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    return this.campusService.remove(id);
  }
}

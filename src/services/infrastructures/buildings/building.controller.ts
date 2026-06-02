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
  BuildingResponseDto,
  CreateBuildingRequestDto,
  UpdateBuildingDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { BuildingService } from './building.service';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('buildings')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Post()
  @ApiBody({ type: CreateBuildingRequestDto })
  @ApiGlobalResponse(BuildingResponseDto)
  create(
    @Body() createBuildingDto: CreateBuildingRequestDto,
  ): Observable<BuildingResponseDto> {
    return this.buildingService.create(createBuildingDto);
  }

  @Get()
  @ApiGlobalResponse(BuildingResponseDto, true)
  findAll(): Observable<BuildingResponseDto[]> {
    return this.buildingService.findAll();
  }

  @Get(':id')
  @ApiGlobalResponse(BuildingResponseDto)
  findOne(@Param('id') id: string): Observable<BuildingResponseDto> {
    return this.buildingService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateBuildingDto })
  @ApiGlobalResponse(BuildingResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateBuildingDto: UpdateBuildingDto,
  ): Observable<BuildingResponseDto> {
    return this.buildingService.update(id, updateBuildingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    return this.buildingService.remove(id);
  }
}

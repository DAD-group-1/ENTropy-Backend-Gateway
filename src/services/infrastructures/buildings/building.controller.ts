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
  BuildingListResponseDto,
  BuildingResponseDto,
  CreateBuildingRequestDto,
  PaginationQueryDto,
  UpdateBuildingDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { BuildingService } from './building.service';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';
import { PaginationQuery } from '../../../decorators/pagination.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('buildings')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Post()
  @ApiBody({ type: CreateBuildingRequestDto })
  @ApiGlobalResponse(BuildingResponseDto)
  @ApiOperation({
    summary: 'Create a new building record',
    description: 'Add a new building record to the system.',
  })
  create(
    @Body() createBuildingDto: CreateBuildingRequestDto,
  ): Observable<BuildingResponseDto> {
    return this.buildingService.create(createBuildingDto);
  }

  @ApiOperation({
    summary: 'Get all buildings',
    description: 'Retrieve a list of all buildings with pagination support.',
  })
  @Get()
  @ApiGlobalResponse(BuildingListResponseDto)
  findAll(
    @PaginationQuery() query: PaginationQueryDto,
  ): Observable<BuildingListResponseDto> {
    return this.buildingService.findAll(query);
  }

  @ApiOperation({
    summary: 'Get a building by ID',
    description: 'Retrieve a single building record by its unique ID.',
  })
  @Get(':id')
  @ApiGlobalResponse(BuildingResponseDto)
  findOne(@Param('id') id: string): Observable<BuildingResponseDto> {
    return this.buildingService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a building record',
    description: 'Update an existing building record by its unique ID.',
  })
  @Patch(':id')
  @ApiBody({ type: UpdateBuildingDto })
  @ApiGlobalResponse(BuildingResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateBuildingDto: UpdateBuildingDto,
  ): Observable<BuildingResponseDto> {
    return this.buildingService.update(id, updateBuildingDto);
  }

  @ApiOperation({
    summary: 'Delete a building record',
    description: 'Remove an existing building record by its unique ID.',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    return this.buildingService.remove(id);
  }
}

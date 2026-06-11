import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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
  private readonly logger = new Logger(BuildingController.name);
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
    this.logger.log('Creating a new building record');
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
    this.logger.log('Retrieving all building records with pagination');
    return this.buildingService.findAll(query);
  }

  @ApiOperation({
    summary: 'Get a building by ID',
    description: 'Retrieve a single building record by its unique ID.',
  })
  @Get(':id')
  @ApiGlobalResponse(BuildingResponseDto)
  findOne(@Param('id') id: string): Observable<BuildingResponseDto> {
    this.logger.log('Retrieving building record with ID: ' + id);
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
    this.logger.log('Updating building record with ID: ' + id);
    return this.buildingService.update(id, updateBuildingDto);
  }

  @ApiOperation({
    summary: 'Delete a building record',
    description: 'Remove an existing building record by its unique ID.',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    this.logger.log('Deleting building record with ID: ' + id);
    return this.buildingService.remove(id);
  }
}

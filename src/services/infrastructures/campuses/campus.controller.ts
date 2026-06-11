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
  CampusListResponseDto,
  CampusResponseDto,
  CreateCampusRequestDto,
  PaginationQueryDto,
  UpdateCampusDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CampusService } from './campus.service';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';
import { PaginationQuery } from '../../../decorators/pagination.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('campuses')
export class CampusController {
  private readonly logger = new Logger(CampusController.name);
  constructor(private readonly campusService: CampusService) {}

  @Post()
  @ApiBody({ type: CreateCampusRequestDto })
  @ApiGlobalResponse(CampusResponseDto)
  @ApiOperation({
    summary: 'Create a new campus record',
    description: 'Add a new campus record to the system.',
  })
  create(
    @Body() createCampusDto: CreateCampusRequestDto,
  ): Observable<CampusResponseDto> {
    this.logger.log('Creating a new campus record');
    return this.campusService.create(createCampusDto);
  }

  @ApiOperation({
    summary: 'Get all campuses',
    description: 'Retrieve a list of all campuses with pagination support.',
  })
  @Get()
  @ApiGlobalResponse(CampusListResponseDto)
  findAll(
    @PaginationQuery() query: PaginationQueryDto,
  ): Observable<CampusListResponseDto> {
    this.logger.log('Retrieving all campus records with pagination');
    return this.campusService.findAll(query);
  }

  @ApiOperation({
    summary: 'Get a campus by ID',
    description: 'Retrieve a single campus record by its unique ID.',
  })
  @Get(':id')
  @ApiGlobalResponse(CampusResponseDto)
  findOne(@Param('id') id: string): Observable<CampusResponseDto> {
    this.logger.log('Retrieving campus record with ID: ' + id);
    return this.campusService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a campus record',
    description: 'Update an existing campus record by its unique ID.',
  })
  @Patch(':id')
  @ApiBody({ type: UpdateCampusDto })
  @ApiGlobalResponse(CampusResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateCampusDto: UpdateCampusDto,
  ): Observable<CampusResponseDto> {
    this.logger.log('Updating campus record with ID: ' + id);
    return this.campusService.update(id, updateCampusDto);
  }

  @ApiOperation({
    summary: 'Delete a campus record',
    description: 'Remove an existing campus record by its unique ID.',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    this.logger.log('Deleting campus record with ID: ' + id);
    return this.campusService.remove(id);
  }
}

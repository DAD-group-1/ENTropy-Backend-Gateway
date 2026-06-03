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
  CreateRoomTypeRequestDto,
  PaginationQueryDto,
  RoomTypeListResponseDto,
  RoomTypeResponseDto,
  UpdateRoomTypeDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { RoomTypeService } from './room-type.service';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';
import { PaginationQuery } from '../../../decorators/pagination.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('room-types')
export class RoomTypeController {
  constructor(private readonly roomTypeService: RoomTypeService) {}

  @Post()
  @ApiBody({ type: CreateRoomTypeRequestDto })
  @ApiGlobalResponse(RoomTypeResponseDto)
  @ApiOperation({
    summary: 'Create a new room type record',
    description: 'Add a new room type record to the system.',
  })
  create(
    @Body() createRoomTypeDto: CreateRoomTypeRequestDto,
  ): Observable<RoomTypeResponseDto> {
    return this.roomTypeService.create(createRoomTypeDto);
  }

  @ApiOperation({
    summary: 'Get all room types',
    description: 'Retrieve a list of all room types with pagination.',
  })
  @Get()
  @ApiGlobalResponse(RoomTypeListResponseDto)
  findAll(
    @PaginationQuery() query: PaginationQueryDto,
  ): Observable<RoomTypeListResponseDto> {
    return this.roomTypeService.findAll(query);
  }

  @ApiOperation({
    summary: 'Get a room type by ID',
    description: 'Retrieve a single room type record by its unique ID.',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Observable<RoomTypeResponseDto> {
    return this.roomTypeService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a room type',
    description: 'Update an existing room type record by its unique ID.',
  })
  @Patch(':id')
  @ApiBody({ type: UpdateRoomTypeDto })
  @ApiGlobalResponse(RoomTypeResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateRoomTypeDto: UpdateRoomTypeDto,
  ): Observable<RoomTypeResponseDto> {
    return this.roomTypeService.update(id, updateRoomTypeDto);
  }

  @ApiOperation({
    summary: 'Delete a room type',
    description: 'Remove a room type record from the system by its unique ID.',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    return this.roomTypeService.remove(id);
  }
}

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
  CreateRoomRequestDto,
  PaginationQueryDto,
  RoomListResponseDto,
  RoomResponseDto,
  UpdateRoomDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { RoomService } from './room.service';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';
import { PaginationQuery } from '../../../decorators/pagination.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @ApiBody({ type: CreateRoomRequestDto })
  @ApiGlobalResponse(RoomResponseDto)
  @ApiOperation({
    summary: 'Create a new room record',
    description: 'Add a new room record to the system.',
  })
  create(
    @Body() createRoomDto: CreateRoomRequestDto,
  ): Observable<RoomResponseDto> {
    return this.roomService.create(createRoomDto);
  }

  @ApiOperation({
    summary: 'Get a list of rooms',
    description: 'Retrieve a paginated list of rooms from the system.',
  })
  @Get()
  @ApiGlobalResponse(RoomListResponseDto)
  findAll(
    @PaginationQuery() query: PaginationQueryDto,
  ): Observable<RoomListResponseDto> {
    return this.roomService.findAll(query);
  }

  @ApiOperation({
    summary: 'Get a room by ID',
    description: 'Retrieve a single room record by its unique ID.',
  })
  @Get(':id')
  @ApiGlobalResponse(RoomResponseDto)
  findOne(@Param('id') id: string): Observable<RoomResponseDto> {
    return this.roomService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a room record',
    description: 'Update an existing room record in the system.',
  })
  @Patch(':id')
  @ApiBody({ type: UpdateRoomDto })
  @ApiGlobalResponse(RoomResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ): Observable<RoomResponseDto> {
    return this.roomService.update(id, updateRoomDto);
  }

  @ApiOperation({
    summary: 'Delete a room record',
    description: 'Remove a room record from the system by its unique ID.',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    return this.roomService.remove(id);
  }
}

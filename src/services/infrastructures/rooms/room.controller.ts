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
  RoomResponseDto,
  UpdateRoomDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { RoomService } from './room.service';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @ApiBody({ type: CreateRoomRequestDto })
  @ApiGlobalResponse(RoomResponseDto)
  create(
    @Body() createRoomDto: CreateRoomRequestDto,
  ): Observable<RoomResponseDto> {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  @ApiBody({ type: CreateRoomRequestDto })
  @ApiGlobalResponse(RoomResponseDto, true)
  findAll(): Observable<RoomResponseDto[]> {
    return this.roomService.findAll();
  }

  @Get(':id')
  @ApiGlobalResponse(RoomResponseDto)
  findOne(@Param('id') id: string): Observable<RoomResponseDto> {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateRoomDto })
  @ApiGlobalResponse(RoomResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ): Observable<RoomResponseDto> {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    return this.roomService.remove(id);
  }
}

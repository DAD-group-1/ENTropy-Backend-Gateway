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
  RoomTypeResponseDto,
  UpdateRoomTypeDto,
} from '@dad-group-1/backend-common';
import { JwtAuthGuard } from '../../../guards/jwt.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { RoomTypeService } from './room-type.service';
import { ApiGlobalResponse } from '../../../decorators/api.decorators';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('room-types')
export class RoomTypeController {
  constructor(private readonly roomTypeService: RoomTypeService) {}

  @Post()
  @ApiBody({ type: CreateRoomTypeRequestDto })
  @ApiGlobalResponse(RoomTypeResponseDto)
  create(
    @Body() createRoomTypeDto: CreateRoomTypeRequestDto,
  ): Observable<RoomTypeResponseDto> {
    return this.roomTypeService.create(createRoomTypeDto);
  }

  @Get()
  @ApiGlobalResponse(RoomTypeResponseDto, true)
  findAll(): Observable<RoomTypeResponseDto[]> {
    return this.roomTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<RoomTypeResponseDto> {
    return this.roomTypeService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateRoomTypeDto })
  @ApiGlobalResponse(RoomTypeResponseDto)
  update(
    @Param('id') id: string,
    @Body() updateRoomTypeDto: UpdateRoomTypeDto,
  ): Observable<RoomTypeResponseDto> {
    return this.roomTypeService.update(id, updateRoomTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<void> {
    return this.roomTypeService.remove(id);
  }
}

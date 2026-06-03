import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  CreateRoomRequestDto,
  PaginationQueryDto,
  Room,
  RoomListResponseDto,
  RoomResponseDto,
  UpdateRoomDto,
} from '@dad-group-1/backend-common';
import { ClientProxy } from '@nestjs/microservices';
import { infrastructuresServiceClientModuleName } from '../../../helpers/client-modules';
import {
  assertObjectIsNumber,
  catchRpcException,
} from '../../../helpers/check-utils';
import { UpdateCommand } from '../../../helpers/commands';

@Injectable()
export class RoomService {
  constructor(
    @Inject(infrastructuresServiceClientModuleName)
    private readonly roomsClient: ClientProxy,
  ) {}

  create(createRoomDto: CreateRoomRequestDto): Observable<RoomResponseDto> {
    return this.roomsClient
      .send<
        RoomResponseDto,
        CreateRoomRequestDto
      >({ cmd: 'create_room' }, createRoomDto)
      .pipe(catchRpcException<RoomResponseDto>());
  }

  findAll(query: PaginationQueryDto): Observable<RoomListResponseDto> {
    return this.roomsClient.send<RoomListResponseDto, PaginationQueryDto>(
      { cmd: 'find_all_rooms' },
      query,
    );
  }

  findOne(id: string): Observable<RoomResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.roomsClient
      .send<RoomResponseDto, number>({ cmd: 'find_one_room' }, Number(id))
      .pipe(catchRpcException<Room>());
  }

  update(id: string, updateData: UpdateRoomDto): Observable<RoomResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.roomsClient
      .send<
        RoomResponseDto,
        UpdateCommand<UpdateRoomDto>
      >({ cmd: 'update_room' }, { id: Number(id), updateData: updateData })
      .pipe(catchRpcException<RoomResponseDto>());
  }

  remove(id: string): Observable<void> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.roomsClient
      .send<void, number>({ cmd: 'remove_room' }, Number(id))
      .pipe(catchRpcException<void>());
  }
}

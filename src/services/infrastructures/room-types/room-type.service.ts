import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  CreateRoomTypeRequestDto,
  RoomType,
  RoomTypeResponseDto,
  UpdateRoomTypeDto,
} from '@dad-group-1/backend-common';
import { ClientProxy } from '@nestjs/microservices';
import { infrastructuresServiceClientModuleName } from '../../../helpers/client-modules';
import {
  assertObjectIsNumber,
  catchRpcException,
} from '../../../helpers/check-utils';
import { UpdateCommand } from '../../../helpers/commands';

@Injectable()
export class RoomTypeService {
  constructor(
    @Inject(infrastructuresServiceClientModuleName)
    private readonly roomTypesClient: ClientProxy,
  ) {}

  create(
    createRoomTypeDto: CreateRoomTypeRequestDto,
  ): Observable<RoomTypeResponseDto> {
    return this.roomTypesClient
      .send<
        RoomTypeResponseDto,
        CreateRoomTypeRequestDto
      >({ cmd: 'create_room_type' }, createRoomTypeDto)
      .pipe(catchRpcException<RoomTypeResponseDto>());
  }

  findAll(): Observable<RoomType[]> {
    return this.roomTypesClient.send<RoomTypeResponseDto[], null>(
      { cmd: 'find_all_room_types' },
      null,
    );
  }

  findOne(id: string): Observable<RoomTypeResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.roomTypesClient
      .send<
        RoomTypeResponseDto,
        number
      >({ cmd: 'find_one_room_type' }, Number(id))
      .pipe(catchRpcException<RoomType>());
  }

  update(
    id: string,
    updateData: UpdateRoomTypeDto,
  ): Observable<RoomTypeResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.roomTypesClient
      .send<
        RoomTypeResponseDto,
        UpdateCommand<UpdateRoomTypeDto>
      >({ cmd: 'update_room_type' }, { id: Number(id), updateData: updateData })
      .pipe(catchRpcException<RoomTypeResponseDto>());
  }

  remove(id: string): Observable<void> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.roomTypesClient
      .send<void, number>({ cmd: 'remove_room_type' }, Number(id))
      .pipe(catchRpcException<void>());
  }
}

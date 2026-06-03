import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  Building,
  BuildingListResponseDto,
  BuildingResponseDto,
  CreateBuildingRequestDto,
  PaginationQueryDto,
  UpdateBuildingDto,
} from '@dad-group-1/backend-common';
import { ClientProxy } from '@nestjs/microservices';
import { infrastructuresServiceClientModuleName } from '../../../helpers/client-modules';
import {
  assertObjectIsNumber,
  catchRpcException,
} from '../../../helpers/check-utils';
import { UpdateCommand } from '../../../helpers/commands';

@Injectable()
export class BuildingService {
  constructor(
    @Inject(infrastructuresServiceClientModuleName)
    private readonly buildingsClient: ClientProxy,
  ) {}

  create(
    createBuildingDto: CreateBuildingRequestDto,
  ): Observable<BuildingResponseDto> {
    return this.buildingsClient
      .send<
        BuildingResponseDto,
        CreateBuildingRequestDto
      >({ cmd: 'create_building' }, createBuildingDto)
      .pipe(catchRpcException<BuildingResponseDto>());
  }

  findAll(query: PaginationQueryDto): Observable<BuildingListResponseDto> {
    return this.buildingsClient.send<
      BuildingListResponseDto,
      PaginationQueryDto
    >({ cmd: 'find_all_buildings' }, query);
  }

  findOne(id: string): Observable<BuildingResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.buildingsClient
      .send<
        BuildingResponseDto,
        number
      >({ cmd: 'find_one_building' }, Number(id))
      .pipe(catchRpcException<Building>());
  }

  update(
    id: string,
    updateData: UpdateBuildingDto,
  ): Observable<BuildingResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.buildingsClient
      .send<
        BuildingResponseDto,
        UpdateCommand<UpdateBuildingDto>
      >({ cmd: 'update_building' }, { id: Number(id), updateData: updateData })
      .pipe(catchRpcException<BuildingResponseDto>());
  }

  remove(id: string): Observable<void> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.buildingsClient
      .send<void, number>({ cmd: 'remove_building' }, Number(id))
      .pipe(catchRpcException<void>());
  }
}

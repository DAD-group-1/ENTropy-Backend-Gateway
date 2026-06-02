import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  Campus,
  CampusResponseDto,
  CreateCampusRequestDto,
  UpdateCampusDto,
} from '@dad-group-1/backend-common';
import { ClientProxy } from '@nestjs/microservices';
import { infrastructuresServiceClientModuleName } from '../../../helpers/client-modules';
import {
  assertObjectIsNumber,
  catchRpcException,
} from '../../../helpers/check-utils';
import { UpdateCommand } from '../../../helpers/commands';

@Injectable()
export class CampusService {
  constructor(
    @Inject(infrastructuresServiceClientModuleName)
    private readonly infrastructuresClient: ClientProxy,
  ) {}

  create(
    createCampusDto: CreateCampusRequestDto,
  ): Observable<CampusResponseDto> {
    return this.infrastructuresClient
      .send<
        CampusResponseDto,
        CreateCampusRequestDto
      >({ cmd: 'create_campus' }, createCampusDto)
      .pipe(catchRpcException<CampusResponseDto>());
  }

  findAll(): Observable<Campus[]> {
    return this.infrastructuresClient.send<CampusResponseDto[], null>(
      { cmd: 'find_all_campuses' },
      null,
    );
  }

  findOne(id: string): Observable<CampusResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.infrastructuresClient
      .send<CampusResponseDto, number>({ cmd: 'find_one_campus' }, Number(id))
      .pipe(catchRpcException<CampusResponseDto>());
  }

  update(
    id: string,
    updateData: UpdateCampusDto,
  ): Observable<CampusResponseDto> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);

    return this.infrastructuresClient
      .send<
        CampusResponseDto,
        UpdateCommand<UpdateCampusDto>
      >({ cmd: 'update_campus' }, { id: Number(id), updateData: updateData })
      .pipe(catchRpcException<CampusResponseDto>());
  }

  remove(id: string): Observable<void> {
    assertObjectIsNumber(id, `Invalid ID: '${id}' is not a number`);
    return this.infrastructuresClient
      .send<void, number>({ cmd: 'remove_campus' }, Number(id))
      .pipe(catchRpcException<void>());
  }
}

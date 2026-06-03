import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { notificationsServiceClientModuleName } from '../../helpers/client-modules';

import {
  CreateNotificationDto,
  DeleteNotificationResponseDto,
  GetNotificationListResponseDto,
  GetNotificationResponseDto,
  NotificationResponseDto,
  PaginationQueryDto,
  SearchPaginationQueryDto,
  UpdateNotificationDto,
} from '@dad-group-1/backend-common';

import { UpdateCommand } from '../../helpers/commands';
import { catchRpcException } from '../../helpers/check-utils';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(notificationsServiceClientModuleName)
    private readonly notificationsClient: ClientProxy,
  ) {}

  create(createNotificationDto: CreateNotificationDto) {
    return this.notificationsClient
      .send<
        NotificationResponseDto,
        CreateNotificationDto
      >({ cmd: 'create_notification' }, createNotificationDto)
      .pipe(catchRpcException<NotificationResponseDto>());
  }

  findAll(query: PaginationQueryDto) {
    return this.notificationsClient.send<
      GetNotificationListResponseDto,
      PaginationQueryDto
    >({ cmd: 'find_all_notifications' }, query);
  }

  findAllForUser(userId: number, query: PaginationQueryDto) {
    return this.notificationsClient.send<
      GetNotificationListResponseDto,
      SearchPaginationQueryDto
    >({ cmd: 'find_all_notifications_for_user' }, { id: userId, query });
  }

  findOne(id: string) {
    return this.notificationsClient
      .send<
        GetNotificationResponseDto,
        string
      >({ cmd: 'find_one_notification' }, id)
      .pipe(catchRpcException<NotificationResponseDto>());
  }

  update(id: string, updateData: UpdateNotificationDto) {
    return this.notificationsClient
      .send<
        NotificationResponseDto,
        UpdateCommand<UpdateNotificationDto>
      >({ cmd: 'update_notification' }, { id, updateData })
      .pipe(catchRpcException<NotificationResponseDto>());
  }

  remove(id: string) {
    return this.notificationsClient
      .send<
        DeleteNotificationResponseDto,
        string
      >({ cmd: 'remove_notification' }, id)
      .pipe(catchRpcException<DeleteNotificationResponseDto>());
  }
}

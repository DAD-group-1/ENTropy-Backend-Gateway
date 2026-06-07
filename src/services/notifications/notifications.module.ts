import { Module } from '@nestjs/common';
import { notificationsServiceClientModule } from '../../helpers/client-modules';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { WebsocketModule } from '../../websocket/websocket.module';

@Module({
  imports: [notificationsServiceClientModule, WebsocketModule],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [notificationsServiceClientModule],
})
export class NotificationsModule {}

import { Module } from '@nestjs/common';
import { notificationsServiceClientModule } from '../../helpers/client-modules';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';

@Module({
  imports: [notificationsServiceClientModule],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [notificationsServiceClientModule],
})
export class NotificationsModule {}

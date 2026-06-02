import { Module } from '@nestjs/common';
import { schedulesServiceClientModule } from '../../../helpers/client-modules';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [schedulesServiceClientModule],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [schedulesServiceClientModule],
})
export class ScheduleModule {}

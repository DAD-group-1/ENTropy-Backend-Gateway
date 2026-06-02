import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { attendancesServiceClientModule } from '../../../helpers/client-modules';

@Module({
  imports: [attendancesServiceClientModule],
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports: [attendancesServiceClientModule],
})
export class AttendanceModule {}

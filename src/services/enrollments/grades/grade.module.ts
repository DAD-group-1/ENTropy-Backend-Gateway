import { Module } from '@nestjs/common';
import {
  attendancesServiceClientModule,
  enrollmentsServiceClientModule,
} from '../../../helpers/client-modules';
import { GradeController } from './grade.controller';
import { GradeService } from './grade.service';

@Module({
  imports: [enrollmentsServiceClientModule],
  controllers: [GradeController],
  providers: [GradeService],
  exports: [attendancesServiceClientModule],
})
export class GradeModule {}

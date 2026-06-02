import { Module } from '@nestjs/common';
import { enrollmentsServiceClientModule } from '../../../helpers/client-modules';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';

@Module({
  imports: [enrollmentsServiceClientModule],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
  exports: [enrollmentsServiceClientModule],
})
export class EnrollmentModule {}

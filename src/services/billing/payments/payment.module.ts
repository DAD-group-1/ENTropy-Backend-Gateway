import { Module } from '@nestjs/common';
import { billingServiceClientModule } from '../../../helpers/client-modules';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [billingServiceClientModule],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [billingServiceClientModule],
})
export class PaymentModule {}

import { Module } from '@nestjs/common';
import { billingServiceClientModule } from '../../../helpers/client-modules';
import { PaymentMethodController } from './payment-method.controller';
import { PaymentMethodService } from './payment-method.service';

@Module({
  imports: [billingServiceClientModule],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
  exports: [billingServiceClientModule],
})
export class PaymentMethodModule {}

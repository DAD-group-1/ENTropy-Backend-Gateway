import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { usersServiceClientModule } from '../../../helpers/client-modules';

@Module({
  imports: [usersServiceClientModule],
  providers: [AuthorizationService],
  controllers: [AuthorizationController],
  exports: [usersServiceClientModule],
})
export class AuthorizationModule {}

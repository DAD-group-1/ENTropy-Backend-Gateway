import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import {
  AuthorizationController,
  UserRoleController,
} from './authorization.controller';
import { usersServiceClientModule } from '../../../helpers/client-modules';

@Module({
  imports: [usersServiceClientModule],
  providers: [AuthorizationService],
  controllers: [AuthorizationController, UserRoleController],
  exports: [usersServiceClientModule],
})
export class AuthorizationModule {}

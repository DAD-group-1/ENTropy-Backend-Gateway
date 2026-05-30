import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { usersServiceClientModule } from '../../../helpers/client-modules';

@Module({
  imports: [usersServiceClientModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [usersServiceClientModule],
})
export class AuthenticationModule {}

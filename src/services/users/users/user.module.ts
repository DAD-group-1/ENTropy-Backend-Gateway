import { Module } from '@nestjs/common';
import { usersServiceClientModule } from '../../../helpers/client-modules';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [usersServiceClientModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [usersServiceClientModule],
})
export class UserModule {}

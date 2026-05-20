import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

export const usersClientModule = ClientsModule.registerAsync([
  {
    name: 'USERS_SERVICE',
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      transport: Transport.TCP,
      options: {
        host: configService.get<string>('USERS_SERVICE_HOST', 'localhost'),
        port: configService.get<number>('USERS_SERVICE_PORT', 3001),
      },
    }),
    inject: [ConfigService],
  },
]);

@Module({
  imports: [usersClientModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [usersClientModule], // This makes USERS_SERVICE available to any module that imports UserModule
})
export class UsersModule {}

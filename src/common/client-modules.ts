import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const usersServiceClientModuleName = 'USERS_SERVICE';
export const usersServiceClientModule = ClientsModule.registerAsync([
  {
    name: usersServiceClientModuleName,
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

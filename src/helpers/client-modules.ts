import { ClientsModule, RmqOptions, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DynamicModule } from '@nestjs/common';
import { RmqUrl } from '@nestjs/microservices/external/rmq-url.interface';

export class MicroserviceNetworkConfig {
  hostEnvVarName: string;
  portEnvVarName: string;
  defaultHost: string;
  defaultPort: number;
}

export const CLIENT_MODULES_CONFIG: {
  name: string;
  config: MicroserviceNetworkConfig;
}[] = [];

export const CLIENT_MODULES_RABBITMQ_CONFIG: {
  name: string;
}[] = [];

/**
 * Creates a dynamic client module for a microservice in NestJS using TCP transport.
 * The module is configured using environment variables for the host and port, with default values provided.
 *
 * @param name The name of the Microservice, in upper case
 * @param microserviceNetworkConfig An optional configuration object that specifies the environment variable names and default values for the host and port.
 * @param microserviceNetworkConfig.hostEnvVarName The name of the environment variable that contains the host for the microservice. Defaults to `${name}_HOST`.
 * @param microserviceNetworkConfig.portEnvVarName The name of the environment variable that contains the port for the microservice. Defaults to `${name}_PORT`.
 * @param microserviceNetworkConfig.defaultHost The default host for the microservice if the environment variable is not set. Defaults to `localhost`.
 * @param microserviceNetworkConfig.defaultPort The default port for the microservice if the environment variable is not set. Defaults to `3001`.
 * @returns {DynamicModule} A dynamic module configured for the specified microservice client.
 */
const createClientModule = (
  name: string,
  microserviceNetworkConfig: Partial<MicroserviceNetworkConfig> = {},
): DynamicModule => {
  const config = {
    hostEnvVarName: `${name}_HOST`,
    portEnvVarName: `${name}_PORT`,
    defaultHost: `localhost`,
    defaultPort: 3001,
    ...microserviceNetworkConfig, // overrides only what's passed
  };
  CLIENT_MODULES_CONFIG.push({ name, config });
  return ClientsModule.registerAsync([
    {
      name: name,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: Transport.TCP,
        options: {
          host: configService.get<string>(
            config.hostEnvVarName,
            config.defaultHost,
          ),
          port: configService.get<number>(
            config.portEnvVarName,
            config.defaultPort,
          ),
        },
      }),
      inject: [ConfigService],
    },
  ]);
};

const createClientModuleRabbit = (name: string): DynamicModule => {
  CLIENT_MODULES_RABBITMQ_CONFIG.push({ name });
  return ClientsModule.registerAsync([
    {
      name: name,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: Transport.RMQ,
        options: {
          urls: [
            {
              username: configService.getOrThrow<string>('RABBITMQ_USERNAME'),
              password: configService.getOrThrow<string>('RABBITMQ_PASSWORD'),
              hostname: configService.getOrThrow<string>('RABBITMQ_HOST'),
              port: configService.getOrThrow<number>('RABBITMQ_PORT'),
            } as RmqUrl,
          ],
          queue: `${name}_QUEUE`,
          queueOptions: {
            durable: true,
          },
        },
      }),
      inject: [ConfigService],
    },
  ]);
};

export const usersServiceClientModuleName = 'USERS_SERVICE';
export const usersServiceClientModule = createClientModuleRabbit(
  usersServiceClientModuleName,
);

export const notificationsServiceClientModuleName = 'NOTIFICATIONS_SERVICE';
export const notificationsServiceClientModule: DynamicModule =
  createClientModuleRabbit(notificationsServiceClientModuleName);

export const attendancesServiceClientModuleName = 'ATTENDANCES_SERVICE';
export const attendancesServiceClientModule: DynamicModule =
  createClientModuleRabbit(attendancesServiceClientModuleName);

export const billingServiceClientModuleName = 'BILLING_SERVICE';
export const billingServiceClientModule: DynamicModule =
  createClientModuleRabbit(billingServiceClientModuleName);

export const coursesServiceClientModuleName = 'COURSES_SERVICE';
export const coursesServiceClientModule: DynamicModule =
  createClientModuleRabbit(coursesServiceClientModuleName);

export const enrollmentsServiceClientModuleName = 'ENROLLMENTS_SERVICE';
export const enrollmentsServiceClientModule: DynamicModule =
  createClientModuleRabbit(enrollmentsServiceClientModuleName);

export const infrastructuresServiceClientModuleName = 'INFRASTRUCTURES_SERVICE';
export const infrastructuresServiceClientModule: DynamicModule =
  createClientModuleRabbit(infrastructuresServiceClientModuleName);

export const schedulesServiceClientModuleName = 'SCHEDULES_SERVICE';
export const schedulesServiceClientModule: DynamicModule =
  createClientModuleRabbit(schedulesServiceClientModuleName);

export const agentServiceClientModuleName = 'AGENT_SERVICE';

export const agentServiceClientModule: DynamicModule = createClientModuleRabbit(
  agentServiceClientModuleName,
);

import {ClientsModule, Transport} from '@nestjs/microservices';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {DynamicModule} from "@nestjs/common";

export class MicroserviceNetworkConfig {
    hostEnvVarName: string;
    portEnvVarName: string;
    defaultHost: string;
    defaultPort: number;
}

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
    microserviceNetworkConfig: Partial<MicroserviceNetworkConfig> = {
        hostEnvVarName: `${name}_HOST`,
        portEnvVarName: `${name}_PORT`,
        defaultHost: `localhost`,
        defaultPort: 3001,
    },
): DynamicModule =>
    ClientsModule.registerAsync([
        {
            name: name,
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                transport: Transport.TCP,
                options: {
                    host: configService.get<string>(microserviceNetworkConfig.hostEnvVarName!, microserviceNetworkConfig.defaultHost!),
                    port: configService.get<number>(microserviceNetworkConfig.portEnvVarName!, microserviceNetworkConfig.defaultPort!),
                },
            }),
            inject: [ConfigService],
        },
    ]);

export const usersServiceClientModuleName = 'USERS_SERVICE';
export const usersServiceClientModule: DynamicModule = createClientModule(usersServiceClientModuleName, {defaultPort: 3001});
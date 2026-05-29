import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule, } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { HttpExceptionFilter } from './helpers/http-exception-filter';
import { createWinstonLogger } from '@dad-group-1/backend-common';
import { Logger } from '@nestjs/common';
import { MessageTransformerInterceptor } from './helpers/message-interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, {
    logger: createWinstonLogger('gateway', 'info'),
  });
  const configService = app.get(ConfigService);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());

  app.setGlobalPrefix('api');

  app.useGlobalInterceptors(new MessageTransformerInterceptor());

  const config = new DocumentBuilder()
    .setTitle('ENTropy API')
    .setDescription('The ENTropy API description')
    .setVersion('1.0')
    .addTag('swiirzi-redhidi-en0ri4ni')
    .addBearerAuth()
    .build();

  const swaggerOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => {
      const controller = controllerKey.replace(/Controller$/, '');
      // Example output: "Users_create"
      return `${controller}_${methodKey}`;
    },
  };

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, swaggerOptions);
  SwaggerModule.setup('api', app, documentFactory);

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);

  new Logger('Bootstrap').log(
    `Gateway is running on: http://localhost:${port}`,
  );
}

bootstrap();

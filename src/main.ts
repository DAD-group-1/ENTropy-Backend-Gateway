import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { HttpExceptionFilter } from './helpers/http-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('ENTropy API')
    .setDescription('The ENTropy API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
  console.log(`Gateway is running on: http://localhost:${port}`);
}
bootstrap();

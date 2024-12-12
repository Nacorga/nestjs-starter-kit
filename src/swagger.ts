import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('NestJS Starter Kit API')
  .setVersion('1.0')
  .addTag('nestjs-starter-kit')
  .build();

export const swaggerDoc = (app: INestApplication) => SwaggerModule.createDocument(app, config);

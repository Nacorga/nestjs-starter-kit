import helmet from 'helmet';
import * as compression from 'compression';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerDoc } from './swagger';

async function bootstrap() {
  const staticOrigins = process.env.CORS_ORIGINS?.split(',') || [];

  const corsOpts: CorsOptions = {
    origin: staticOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  };

  const app = await NestFactory.create(AppModule);

  app.enableCors(corsOpts);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.use(helmet({ hsts: { maxAge: 7776000000 } }));
  app.use(compression());

  SwaggerModule.setup('api', app, swaggerDoc(app));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

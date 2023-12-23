import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';

async function bootstrap() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enabled: true,
  });
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3030',
    methods: 'GET,POST',
  });

  app.useGlobalPipes(new ValidationPipe());

  const port = 3200;
  await app.listen(port);
}
bootstrap();

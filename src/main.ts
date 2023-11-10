import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');

  app.useGlobalPipes(new ValidationPipe());

  const port = 3000;
  await app.listen(port);
  logger.log(`application listening on port ${port}`);
}
bootstrap();

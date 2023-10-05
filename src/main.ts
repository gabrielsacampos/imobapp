import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './config/winston.config';

async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create(AppModule, { logger });

  const config = new DocumentBuilder()
    .setTitle('ImobManager')
    .setDescription('API stores data from 3rd-party API into personal Database')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  const port = 3000;
  logger.log(`App running at http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();

import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }),
        new winston.transports.DailyRotateFile({
          filename: 'application-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    }),
  ],
})
export class LoggerModule {}

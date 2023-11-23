import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { LoggerQueueRepository } from './logger-queue.repository';
import { LoggerQueueService } from './logger.queue-service';

@Module({
  providers: [PrismaService, LoggerQueueRepository, LoggerQueueService],
  exports: [LoggerQueueRepository, LoggerQueueService],
})
export class LoggerQueueModule { }

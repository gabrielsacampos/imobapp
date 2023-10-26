import { Module } from '@nestjs/common';
import { FailedQueueJobsService } from './failed-queue-jobs.service';
import { FailedQueueJobsController } from './failed-queue-jobs.controller';
import { PrismaService } from 'src/prisma-client/prisma.service';

@Module({
  controllers: [FailedQueueJobsController],
  providers: [FailedQueueJobsService, PrismaService],
})
export class FailedQueueJobsModule {}

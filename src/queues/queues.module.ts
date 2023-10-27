import { Module } from '@nestjs/common';
import { QueuesService } from './queues.service';
import { QueuesController } from './queues.controller';
import { GranatumQueueModule } from './granatumQueue/granatumQueue.module';
import { FailedQueueJobsModule } from 'src/repository/failed-queue-jobs/failed-queue-jobs.module';
import { FailedQueueJobsService } from 'src/repository/failed-queue-jobs/failed-queue-jobs.service';
import { SharedModule } from 'src/shared.module';

@Module({
  imports: [SharedModule, GranatumQueueModule, FailedQueueJobsModule],
  controllers: [QueuesController],
  providers: [QueuesService, FailedQueueJobsService],
})
export class QueuesModule {}

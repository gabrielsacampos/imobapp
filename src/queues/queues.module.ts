import { Module } from '@nestjs/common';
import { QueuesService } from './queues.service';
import { QueuesController } from './queues.controller';
import { QueueGranatumModule } from './queue-granatum/queue-granatum.module';
import { FailedQueueJobsModule } from 'src/repository/failed-queue-jobs/failed-queue-jobs.module';
import { FailedQueueJobsService } from 'src/repository/failed-queue-jobs/failed-queue-jobs.service';
import { SharedModule } from 'src/shared.module';
import { QueueImobziModule } from './queue-imobzi/queue-imobzi.module';
import { QueueGranatumService } from './queue-granatum/queue-granatum.service';
import { QueueImobziService } from './queue-imobzi/queue-imobzi.service';

@Module({
  imports: [SharedModule, QueueGranatumModule, FailedQueueJobsModule, QueueImobziModule],
  controllers: [QueuesController],
  providers: [QueuesService, QueueGranatumService, QueueImobziService, FailedQueueJobsService],
})
export class QueuesModule {}

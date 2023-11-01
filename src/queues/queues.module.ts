import { Module } from '@nestjs/common';
import { ImobziModule } from 'src/3party-client/imobzi/imobzi.module';
import { FailedQueueJobsModule } from 'src/repository/failed-queue-jobs/failed-queue-jobs.module';
import { FailedQueueJobsService } from 'src/repository/failed-queue-jobs/failed-queue-jobs.service';
import { SharedModule } from 'src/shared.module';
import { QueueGranatumModule } from './queue-granatum/queue-granatum.module';
import { QueueGranatumService } from './queue-granatum/queue-granatum.service';
import { QueueImobziModule } from './queue-imobzi/queue-imobzi.module';
import { QueueImobziService } from './queue-imobzi/queue-imobzi.service';
import { QueuesController } from './queues.controller';
import { QueuesService } from './queues.service';

@Module({
  imports: [SharedModule, ImobziModule, QueueGranatumModule, FailedQueueJobsModule, QueueImobziModule],
  controllers: [QueuesController],
  providers: [QueuesService, QueueGranatumService, QueueImobziService, FailedQueueJobsService],
})
export class QueuesModule {}

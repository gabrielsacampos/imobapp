import { Injectable } from '@nestjs/common';
import { FailedQueueJobsService } from 'src/repository/failed-queue-jobs/failed-queue-jobs.service';
import { QueueGranatumService } from './queue-granatum/queue-granatum.service';
import { FetchDb } from './queue-granatum/interfaces/imobziQueue.interface';
import { StoreDb } from './queue-imobzi/interfaces/imobziQueue.interface';
import { QueueImobziService } from './queue-imobzi/queue-imobzi.service';

@Injectable()
export class QueuesService {
  constructor(
    private readonly failedQueueJobsService: FailedQueueJobsService,
    private readonly queueImobziService: QueueImobziService,
    private readonly granatumQueuesService: QueueGranatumService,
  ) {}

  async imobziStoreDb(data: StoreDb) {
    try {
      await this.queueImobziService.storeDb(data);
    } catch (error) {
      this.failedQueueJobsService.handleError(error);
    }
  }

  async granatumSyncDb(data: FetchDb) {
    try {
      await this.granatumQueuesService.fetchDb(data);
    } catch (error) {
      this.failedQueueJobsService.handleError(error);
    }
  }
}

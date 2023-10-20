import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { GroupItems } from './interfaces/granatum.service.interface';

@Injectable()
export class GranatumQueueProducer {
  constructor(
    @InjectQueue('GranatumQueue') private readonly granatumQueue: Queue,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async startSyncImobziGranatum(groupedItems: GroupItems[]) {
    groupedItems.forEach((group) => {
      this.granatumQueue.add('setGranatumIds', group, {
        attempts: 3,
        backoff: { delay: 10000, type: 'exponential' },
      });
    });
  }
  async addNewJob(jobName: string, data: any) {
    this.granatumQueue.add(jobName, data, {
      attempts: 3,
      backoff: { delay: 10000, type: 'exponential' },
    });
  }
}

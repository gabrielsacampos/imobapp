import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class GranatumQueueProducer {
  constructor(@InjectQueue('GranatumQueue') private readonly granatumQueue: Queue) {}

  queueDefaultOpts = {
    attempts: 3,
    backoff: { delay: 10000, type: 'exponential' },
  };

  async produce(data: any) {
    try {
      const { groupedItems, groupedOnlendings, groupedRevenues } = data;

      groupedItems.forEach((group) => {
        this.granatumQueue.add('sync', group, this.queueDefaultOpts);
      });

      groupedOnlendings.forEach((group) => {
        this.granatumQueue.add('sync', group, this.queueDefaultOpts);
      });

      groupedRevenues.forEach((group) => {
        this.granatumQueue.add('sync', group, this.queueDefaultOpts);
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

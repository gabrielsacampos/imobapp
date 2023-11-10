import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class QueueGranatumProducer {
  constructor(@InjectQueue('GranatumQueue') private readonly granatumQueue: Queue) {}

  queueDefaultOpts = {
    attempts: 3,
    backoff: { delay: 10000, type: 'exponential' },
  };

  async produce(data: any) {
    try {
      const { items, onlendings, revenues } = data;

      if (items) {
        items.forEach((group) => {
          this.granatumQueue.add('sync', group, this.queueDefaultOpts);
        });
      }

      if (onlendings) {
        onlendings.forEach((group) => {
          this.granatumQueue.add('sync', group, this.queueDefaultOpts);
        });
      }

      if (revenues) {
        revenues.forEach((group) => {
          this.granatumQueue.add('sync', group, this.queueDefaultOpts);
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

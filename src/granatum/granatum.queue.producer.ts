import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { GranatumService } from './granatum.service';

@Injectable()
export class GranatumQueueProducer {
  constructor(
    @InjectQueue('GranatumQueue') private readonly granatumQueue: Queue,
    private readonly granatumService: GranatumService,
  ) {}

  async updateGranatum(start_at: string, end_at: string) {
    try {
      const { groupedItems, groupedOnlendings, groupedRevenues } = await this.granatumService.getInvoicesComponents(
        start_at,
        end_at,
      );

      groupedItems.forEach((group) => {
        this.granatumQueue.add('sync', group, {
          attempts: 3,
          backoff: { delay: 10000, type: 'exponential' },
        });
      });

      groupedOnlendings.forEach((group) => {
        this.granatumQueue.add('sync', group, {
          attempts: 3,
          backoff: { delay: 10000, type: 'exponential' },
        });
      });

      groupedRevenues.forEach((group) => {
        this.granatumQueue.add('sync', group, {
          attempts: 3,
          backoff: { delay: 10000, type: 'exponential' },
        });
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

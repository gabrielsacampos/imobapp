import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { GranatumService } from './granatum.service';

@Injectable()
export class GranatumQueueProducer {
  constructor(
    @InjectQueue('GranatumQueue') private readonly granatumQueue: Queue,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly granatumService: GranatumService,
  ) {}

  async updateGranatum(start_at: string, end_at: string) {
    const { groupedItems, groupedOnlendings } = await this.granatumService.getInvoicesComponents(start_at, end_at);

    // console.log(groupedItems, groupedOnlendings);
    // groupedItems.forEach((group) => {
    //   this.granatumQueue.add('sync', group, {
    //     attempts: 3,
    //     backoff: { delay: 10000, type: 'exponential' },
    //   });
    // });

    groupedOnlendings.forEach((group) => {
      this.granatumQueue.add('sync', group, {
        attempts: 3,
        backoff: { delay: 10000, type: 'exponential' },
      });
    });
  }
}

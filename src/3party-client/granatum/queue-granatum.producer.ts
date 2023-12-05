import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { ModulesServices } from 'src/modules/entities/modules.service';
import { FetchDb } from './interfaces/granatum.queue.interface';

@Injectable()
export class QueueGranatumProducer {
  private logger = new Logger(QueueGranatumProducer.name);
  constructor(
    @InjectQueue('GranatumQueue') private readonly granatumQueue: Queue,
    private readonly modulesServices: ModulesServices,
  ) {}

  queueDefaultOpts = {
    attempts: 3,
    backoff: { delay: 10000, type: 'exponential' },
  };

  async syncDb(data: FetchDb): Promise<void> {
    try {
      const { payment_start_at, payment_end_at, invoice, onlending, revenue } = data;

      let items: any[];
      let onlendings: any[];
      let revenues: any[];

      if (onlending) {
        onlendings = await this.modulesServices.invoices.predictedOnlendings(payment_start_at, payment_end_at);
        onlendings.forEach((group) => {
          this.granatumQueue.add('sync', group, this.queueDefaultOpts);
        });
      }

      if (invoice) {
        items = await this.modulesServices.invoices.paidInvoices(payment_start_at, payment_end_at);
        items.forEach((group) => {
          this.granatumQueue.add('sync', group, this.queueDefaultOpts);
        });
      }

      if (revenue) {
        revenues = await this.modulesServices.invoices.predictedRevenues(payment_start_at, payment_end_at);
        revenues.forEach((group) => {
          this.granatumQueue.add('sync', group, this.queueDefaultOpts);
        });
      }
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new Error(error);
    }
  }
}

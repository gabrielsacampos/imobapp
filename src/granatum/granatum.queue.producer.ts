import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class GranatumQueueProducer {
  constructor(
    @InjectQueue('GranatumQueue') private readonly granatumQueue: Queue,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async addNewJob(jobName: string, data) {
    this.granatumQueue.add(jobName, data, {
      attempts: 3,
      backoff: { delay: 10000, type: 'exponential' },
    });
  }

  syncImobziGranatumTransactions(invoicesWithItems) {
    const invoicesGrouped = invoicesWithItems.reduce((acc, curr) => {
      const key = curr.credit_at + ' | ' + curr.account_credit + ' | ' + curr.paid_manual;
      if (!acc[key]) {
        acc[key] = {
          count_invoices: 1,
          paid_at: curr.paid_at,
          credit_at: curr.credit_at,
          account_credit: curr.account_credit,
          bank_fee_value: 0 - curr.bank_fee_value,
          description: curr.paid_manual ? `Transaferência recebida em conta` : `Cobranças Imobzi`,
          items: [...curr.items],
        };
      } else {
        acc[key].items.push(...curr.items);
        acc[key].count_invoices++;
        acc[key].bank_fee_value -= curr.bank_fee_value;
      }

      return acc;
    }, []);

    const groupedAsArray = Object.values(invoicesGrouped);

    groupedAsArray.forEach((group) => this.addNewJob('setGranatumIds', group));
  }
}

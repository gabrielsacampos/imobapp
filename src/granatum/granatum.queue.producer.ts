import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Job, Queue } from 'bull';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { GranatumTransactionsService } from './granatum-transactions/granatumTransactions.service';
import { GranatumService } from './granatum.service';

@Injectable()
export class GranatumQueueProducer {
  invoicesOnQueue: number = 0;
  waitingJobs = this.granatumQueue.getWaiting();
  waitingJobsCount = this.granatumQueue.getWaitingCount();
  completedJobs = this.granatumQueue.getCompleted();
  completedJobsCount = this.granatumQueue.getCompletedCount();

  constructor(
    @InjectQueue('GranatumQueue') private readonly granatumQueue: Queue,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly granatumService: GranatumService,
    private readonly granatumTransactionsService: GranatumTransactionsService,
  ) {
    // this.handleFailed();
    // this.syncImobziGranatumTransactions();
  }

  async syncImobziGranatumTransactions(start_at: string, end_at: string) {
    const invoicesOnPeriod = await this.granatumService.getPaidInvoicesFromDb(start_at, end_at);
    const invoicesGroupedByDate = invoicesOnPeriod.reduce((acc, curr) => {
      const key = curr.credit_at.toString();
      if (!acc[key]) {
        acc[key] = [curr];
      } else {
        acc[key].push(curr);
      }
      return acc;
    }, {});
    const groupedInvoices = Object.values(invoicesGroupedByDate);
    groupedInvoices.forEach((group) => {
      this.granatumQueue.add('setGranatumIds', group);
    });
  }

  async addNewJob(newJobName: string, job: any) {
    this.granatumQueue.add(newJobName, job);
  }

  async handleFailed() {
    const invoicesfailed = await this.granatumQueue.getFailed();
    // const invoices = invoicesfailed[0].data;
  }
}

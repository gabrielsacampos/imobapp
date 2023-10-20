import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { GranatumAccountsService } from './granatum-accounts/granatum-accounts.service';
import { GranatumCategoriesService } from './granatum-categories/granatumCategories.service';
import { GranatumCostCenterService } from './granatum-cost-center/granatum-cost-center.service';
import { GranatumTransactionsService } from './granatum-transactions/granatumTransactions.service';
import { GranatumQueueJobs } from './granatum.queue.jobs';
import { GranatumQueueProducer } from './granatum.queue.producer';
import { GroupItems } from './interfaces/granatum.service.interface';

@Processor('GranatumQueue')
export class GranatumQueueConsumer {
  constructor(
    private readonly prisma: PrismaService,
    private readonly granatumQueueProducer: GranatumQueueProducer,
    private readonly granatumQueueJobs: GranatumQueueJobs,
  ) {}

  @Process('setGranatumIds')
  async setGanatumIds(job: Job) {
    const creditGroup: GroupItems = job.data;

    const itemsWithGranatumIds = await this.granatumQueueJobs.setGanatumIds(creditGroup.items);

    await this.granatumQueueProducer.addNewJob('formatToPost', itemsWithGranatumIds);
  }

  @Process('formatToPost')
  async formatDataToPost(job: Job) {
    try {
      const items = job.data;
      const formatedData = this.granatumQueueJobs.formatDataToPost(items);
      await this.granatumQueueProducer.addNewJob('postData', { ...formatedData });
    } catch (error) {
      throw new Error(error);
    }
  }

  @Process('postData')
  async postDataIntoGranatum(job: Job) {
    try {
      const dataReadyToPost = await job.data[0];
      await this.granatumQueueJobs.postTransaction(dataReadyToPost);
    } catch (error) {
      await this.handlQueueError(error, job);
    }
  }

  async handlQueueError(error: { message: string }, job: Job) {
    const errorMessage = error.message;
    const jobJson = job.toJSON();
    const redisKey = jobJson.id.toString();
    await this.prisma.failedQueueJob.create({
      data: { job: jobJson.data, queue: 'granatum_queue', redis_key: redisKey, error_message: errorMessage },
    });
    throw new Error(`${errorMessage}`);
  }
}

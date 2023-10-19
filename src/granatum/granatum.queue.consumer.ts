import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { GranatumAccountsService } from './granatum-accounts/granatum-accounts.service';
import { GranatumCategoriesService } from './granatum-categories/granatumCategories.service';
import { GranatumCostCenterService } from './granatum-cost-center/granatum-cost-center.service';
import { GranatumTransactionsService } from './granatum-transactions/granatumTransactions.service';
import { GranatumQueueProducer } from './granatum.queue.producer';

@Processor('GranatumQueue')
export class GranatumQueueConsumer {
  constructor(
    private readonly prisma: PrismaService,
    private readonly granatumQueueProducer: GranatumQueueProducer,
    private readonly granatumTransactionsService: GranatumTransactionsService,
    private readonly granatumAccountsService: GranatumAccountsService,
    private readonly granatumCostCenterService: GranatumCostCenterService,
    private readonly granatumCategoriesService: GranatumCategoriesService,
  ) {}

  @Process('setGranatumIds')
  async setGanatumIds(job) {
    const creditGroup = job.data;

    creditGroup.id_account_granatum = await this.granatumAccountsService.findIdByDescription(
      creditGroup.account_credit,
    );

    const items = creditGroup.items;

    for (const item of items) {
      item.id_category_granatum = await this.granatumCategoriesService.findIdByDescription(item.description);
      item.id_cost_center_granatum = await this.granatumCostCenterService.findIdByDescription(
        item.building,
        item.block,
      );
    }
    creditGroup.items = items;
    await this.granatumQueueProducer.addNewJob('formatToPost', creditGroup);
  }

  @Process('formatToPost')
  async formatDataToPost(job: Job) {
    try {
      const invoices = job.data;
      const formatedData = this.granatumTransactionsService.templateTransactions(invoices);
      await this.granatumQueueProducer.addNewJob('postData', formatedData);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Process('postData')
  async postDataIntoGranatum(job: Job) {
    try {
      const dataReadyToPost = await job.data;
      await this.granatumTransactionsService.postTransactions(dataReadyToPost);
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

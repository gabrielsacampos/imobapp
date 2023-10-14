import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { GranatumAccountsService } from './granatum-accounts/granatum-accounts.service';
import { GranatumCategoriesService } from './granatum-categories/granatumCategories.service';
import { GranatumCostCenterService } from './granatum-cost-center/granatum-cost-center.service';
import { GranatumTransactionPostDTO } from './granatum-transactions/granatumTransacationsPost.dtos';
import { GranatumTransactionsService } from './granatum-transactions/granatumTransactions.service';
import { GranatumQueueProducer } from './granatum.queue.producer';
import { GranatumService } from './granatum.service';

@Processor('GranatumQueue')
export class GrganatumQueueConsumer {
  constructor(
    private readonly prisma: PrismaService,
    private readonly granatumQueueProducer: GranatumQueueProducer,
    private readonly granatumService: GranatumService,
    private readonly granatumTransactionsService: GranatumTransactionsService,
    private readonly granatumAccountsService: GranatumAccountsService,
    private readonly granatumCostCenterService: GranatumCostCenterService,
    private readonly granatumCategoriesService: GranatumCategoriesService,
  ) {}

  @Process('setGranatumIds')
  async postIntoGranatum(job: Job) {
    const invoices = job.data;
    const invoicesWithGranatumIds = [];

    for (const invoice of invoices) {
      const { property } = invoice.lease;
      const { credit_at, paid_at, bank_fee_value, account_credit, id_imobzi: id_invoice } = invoice;

      const items = await this.setItemsGranatumCategoriesId(invoice.invoiceItems);
      const id_cost_center_granatum = await this.granatumCostCenterService.findIdByDescription(property);
      const id_account_granatum = await this.granatumAccountsService.findIdByDescription(account_credit);

      const mapedItems = items.map((element) => {
        return { ...element, id_cost_center_granatum };
      });

      invoicesWithGranatumIds.push({
        id_invoice,
        id_account_granatum,
        property,
        bank_fee_value,
        credit_at,
        paid_at,
        items: mapedItems,
      });
    }
    this.granatumQueueProducer.addNewJob('formatDataToPost', invoicesWithGranatumIds);
  }

  async setItemsGranatumCategoriesId(invoiceItems) {
    const itemsWithGranatumCategoriesIds = [];
    for (const item of invoiceItems) {
      const id = await this.granatumCategoriesService.findIdByDescription(item.description);
      itemsWithGranatumCategoriesIds.push({ ...item, id_category_granatum: id });
    }
    return itemsWithGranatumCategoriesIds;
  }

  @Process('formatDataToPost')
  async formatDataToPost(job: Job) {
    try {
      const invoicesWithGranatumIds = job.data;
      const formatedData = this.granatumTransactionsService.formatDataToPostTransaction(invoicesWithGranatumIds);
      await this.granatumQueueProducer.addNewJob('post', formatedData);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Process('post')
  async postDataIntoGranatum(job: Job) {
    try {
      const dataReadyToPost = await job.data;
      for (const data of dataReadyToPost) {
        await this.granatumTransactionsService.postTransactions(data);
      }
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

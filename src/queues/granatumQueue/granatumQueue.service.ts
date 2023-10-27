import { Injectable } from '@nestjs/common';
import { GranatumService } from 'src/granatum/granatum.service';
import { InvoicesService } from 'src/repository/invoices/invoices.service';
import { GranatumQueueConsumer } from './granatumQueue.consumer';
import { GranatumQueueProducer } from './granatumQueue.producer';

@Injectable()
export class GranatumQueueService {
  constructor(
    private readonly granatumQueueConsumer: GranatumQueueConsumer,
    private readonly granatumQueueProducer: GranatumQueueProducer,
    private readonly granatumService: GranatumService,
    private readonly invoicesService: InvoicesService,
  ) {}

  async fetchDb(start_at: string, end_at: string): Promise<void> {
    try {
      const items = await this.invoicesService.getPaidInvoices(start_at, end_at);
      const onlendings = await this.invoicesService.getOnlendings(start_at, end_at);
      const revenues = await this.invoicesService.getRevenue(start_at, end_at);

      const groupedItems = this.granatumService.groupInvoices(items);
      const groupedOnlendings = this.granatumService.groupOnlendings(onlendings);
      const groupedRevenues = this.granatumService.groupRevenues(revenues);
      await this.granatumQueueProducer.produce({ groupedItems, groupedOnlendings, groupedRevenues });
    } catch (error) {
      throw new Error(error);
    }
  }
}

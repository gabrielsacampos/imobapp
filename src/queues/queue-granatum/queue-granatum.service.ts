import { Injectable } from '@nestjs/common';
import { GranatumService } from 'src/3party-client/granatum/granatum.service';
import { InvoicesService } from 'src/repository/invoices/invoices.service';
import { FetchDb } from './interfaces/imobziQueue.interface';
import { QueueGranatumProducer } from './queue-granatum.producer';

@Injectable()
export class QueueGranatumService {
  constructor(
    private readonly queueGranatumProducer: QueueGranatumProducer,
    private readonly granatumService: GranatumService,
    private readonly invoicesService: InvoicesService,
  ) {}

  async fetchDb(data: FetchDb): Promise<void> {
    try {
      const { payment_start_at, payment_end_at } = data;
      const items = await this.invoicesService.getPaidInvoices(payment_start_at, payment_end_at);
      const onlendings = await this.invoicesService.getOnlendings(payment_start_at, payment_end_at);
      const revenues = await this.invoicesService.getRevenue(payment_start_at, payment_end_at);

      const groupedItems = this.granatumService.groupInvoices(items);
      const groupedOnlendings = this.granatumService.groupOnlendings(onlendings);
      const groupedRevenues = this.granatumService.groupRevenues(revenues);
      await this.queueGranatumProducer.produce({ groupedItems, groupedOnlendings, groupedRevenues });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}

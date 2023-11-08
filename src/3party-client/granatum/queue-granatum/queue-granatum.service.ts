import { Injectable } from '@nestjs/common';
import { GranatumService } from 'src/3party-client/granatum/granatum.service';
import { RepositoryService } from 'src/repository/repository.service';
import { FetchDb } from './interfaces/imobziQueue.interface';
import { QueueGranatumProducer } from './queue-granatum.producer';

@Injectable()
export class QueueGranatumService {
  constructor(
    private readonly queueGranatumProducer: QueueGranatumProducer,
    private readonly granatumService: GranatumService,
    private readonly repositoryService: RepositoryService,
  ) {}

  async fetchDb(data: FetchDb): Promise<void> {
    try {
      const { payment_start_at, payment_end_at } = data;
      const items = await this.repositoryService.invoices.paidInvoices(payment_start_at, payment_end_at);
      const onlendings = await this.repositoryService.invoices.predictedOnlendings(payment_start_at, payment_end_at);
      const revenues = await this.repositoryService.invoices.predictedRevenues(payment_start_at, payment_end_at);

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

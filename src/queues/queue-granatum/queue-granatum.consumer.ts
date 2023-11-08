import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { GranatumService } from 'src/3party-client/granatum/granatum.service';
import { GroupedInvoiceComponents } from '../../3party-client/granatum/dtos/granatum-service.dtos';

@Processor('GranatumQueue')
export class QueueGranatumConsumer {
  constructor(private readonly granatumServices: GranatumService) {}

  @Process('sync')
  async syncInvoices(job: Job<GroupedInvoiceComponents>): Promise<any> {
    try {
      const components = job.data;
      const componentsWithGranatumIds = await this.setGranatumIds(components);
      const componentsFormated = this.granatumServices.transactions.templateTransaction(componentsWithGranatumIds);
      await this.granatumServices.transactions.postTransactions(componentsFormated);
    } catch (error) {
      throw new Error(error);
    }
  }

  async setGranatumIds(data: GroupedInvoiceComponents): Promise<GroupedInvoiceComponents> {
    try {
      let client_suplier_document: string;
      let id_suplier_client: number;

      const id_account_granatum = this.granatumServices.accounts.findIdByDescription(data.account_credit);

      const itemsWithIds = [];
      for (const item of data.items) {
        const id_category_granatum = await this.granatumServices.categories.findIdByDescription(item.description);

        const id_cost_center_granatum = await this.granatumServices.costCenters.findIdByDescription(
          item.building,
          item.block,
        );

        if (data.type === 'onlending' || data.type === 'revenue') {
          client_suplier_document = item.cnpj === null ? item.cpf : item.cnpj;
          id_suplier_client = await this.granatumServices.supliers.findIdByDocument(client_suplier_document);
        }

        itemsWithIds.push({
          ...item,
          id_account_granatum,
          id_category_granatum,
          id_cost_center_granatum,
          id_suplier_client,
        });
      }

      data.items = itemsWithIds;
      data.id_account_granatum = data.id_account_granatum;
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

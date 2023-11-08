import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { GroupedInvoiceComponents } from '../../3party-client/granatum/dtos/granatum-service.dtos';
import { GranatumAccountsService } from '../../3party-client/granatum/granatum-accounts/granatum-accounts.service';
import { GranatumCategoriesService } from '../../3party-client/granatum/granatum-categories/granatum-categories.service';
import { GranatumCostCenterService } from '../../3party-client/granatum/granatum-cost-center/granatum-cost-center.service';
import { GranatumSupliersService } from '../../3party-client/granatum/granatum-supliers/granatum-supliers.service';
import { GranatumTransactionsService } from '../../3party-client/granatum/granatum-transactions/granatumTransactions.service';

@Processor('GranatumQueue')
export class QueueGranatumConsumer {
  constructor(
    private readonly granatumTransactionsService: GranatumTransactionsService,
    private readonly granatumAccountsService: GranatumAccountsService,
    private readonly granatumCostCenterService: GranatumCostCenterService,
    private readonly granatumCategoriesService: GranatumCategoriesService,
    private readonly granatumSupliersService: GranatumSupliersService,
  ) {}

  @Process('sync')
  async syncInvoices(job: Job<GroupedInvoiceComponents>): Promise<any> {
    try {
      const components = job.data;
      const componentsWithGranatumIds = await this.setGranatumIds(components);
      const componentsFormated = this.granatumTransactionsService.templateTransaction(componentsWithGranatumIds);
      await this.granatumTransactionsService.postTransactions(componentsFormated);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getGranatumRequiredEntities() {
    try {
      const granatumAccounts = await this.granatumAccountsService.getAllAccounts();
      const granatumCategories = await this.granatumCategoriesService.getSlipCategories();
      const granatumCostCenters = await this.granatumCostCenterService.getAllCostCenters();
      const granatumSupliers = await this.granatumSupliersService.getAllSupliers();
      return { granatumAccounts, granatumCategories, granatumCostCenters, granatumSupliers };
    } catch (error) {
      throw new Error(error);
    }
  }

  async setGranatumIds(data: GroupedInvoiceComponents): Promise<GroupedInvoiceComponents> {
    try {
      const { granatumAccounts, granatumCategories, granatumCostCenters, granatumSupliers } =
        await this.getGranatumRequiredEntities();

      let client_suplier_document: string;
      let id_suplier_client: number;

      const id_account_granatum = this.granatumAccountsService.findIdByDescription(
        data.account_credit,
        granatumAccounts,
      );

      const itemsWithIds = [];
      for (const item of data.items) {
        const id_category_granatum = this.granatumCategoriesService.findIdByDescription(
          item.description,
          granatumCategories,
        );

        const id_cost_center_granatum = this.granatumCostCenterService.findIdByDescription(
          item.building,
          item.block,
          granatumCostCenters,
        );

        if (data.type === 'onlending' || data.type === 'revenue') {
          client_suplier_document = item.cnpj === null ? item.cpf : item.cnpj;
          id_suplier_client = this.granatumSupliersService.findIdByDocument(client_suplier_document, granatumSupliers);
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

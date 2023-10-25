import { Injectable } from '@nestjs/common';
import { GroupedItemsDTO, GroupedOnlendingsDTO } from './dtos/granatum-service.dtos';
import { GranatumAccountsService } from './granatum-accounts/granatum-accounts.service';
import { GranatumCategoriesService } from './granatum-categories/granatumCategories.service';
import { GranatumCostCenterService } from './granatum-cost-center/granatum-cost-center.service';
import { GranatumSupliersService } from './granatum-supliers/granatum-supliers.service';
import { GranatumTransactionPostDTO } from './granatum-transactions/dtos/granatum-transactions.dtos';
import { GranatumTransactionsService } from './granatum-transactions/granatumTransactions.service';

@Injectable()
export class GranatumQueueJobs {
  constructor(
    private readonly granatumTransactionsService: GranatumTransactionsService,
    private readonly granatumAccountsService: GranatumAccountsService,
    private readonly granatumCostCenterService: GranatumCostCenterService,
    private readonly granatumCategoriesService: GranatumCategoriesService,
    private readonly granatumSupliersService: GranatumSupliersService,
  ) {}
  async setGranatumIds(data: GroupedOnlendingsDTO | GroupedItemsDTO): Promise<GroupedOnlendingsDTO | GroupedItemsDTO> {
    try {
      const granatumAccounts = await this.granatumAccountsService.getAllAccounts();
      const granatumCategories = await this.granatumCategoriesService.getSlipCategories();
      const granatumCostCenters = await this.granatumCostCenterService.getAllCostCenters();
      const granatumSupliers = await this.granatumSupliersService.getAllSupliers();

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
        let client_suplier_document: string;
        let id_suplier_client: number;
        if ('beneficiary_cnpj' in item || 'beneficiary_cnpj' in item) {
          client_suplier_document = item.beneficiary_cnpj === null ? item.beneficiary_cpf : item.beneficiary_cnpj;
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
      const newData = { ...data, id_account_granatum };
      return newData;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  formatInvoiceItemsToPost(data: GroupedItemsDTO | GroupedOnlendingsDTO): GranatumTransactionPostDTO {
    try {
      return this.granatumTransactionsService.templateTransaction(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async postTransaction(transaction: GranatumTransactionPostDTO): Promise<void> {
    try {
      await this.granatumTransactionsService.postTransactions(transaction);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

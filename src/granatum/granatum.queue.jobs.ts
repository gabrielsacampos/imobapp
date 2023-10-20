import { GetPaidItemDTO } from 'src/repository/modules/invoices/dtos/invoice.queries.dtos';
import { GranatumCostCenterService } from './granatum-cost-center/granatum-cost-center.service';
import { GranatumCategoriesService } from './granatum-categories/granatumCategories.service';
import { GranatumAccountsService } from './granatum-accounts/granatum-accounts.service';
import { GranatumTransactionsService } from './granatum-transactions/granatumTransactions.service';
import { Injectable } from '@nestjs/common';
import { JobSetGranatumIdsDTO } from './dtos/jobs.dtos';
import { GranatumTransactionPostDTO } from './granatum-transactions/dtos/granatum-transactions.dtos';

@Injectable()
export class GranatumQueueJobs {
  constructor(
    private readonly granatumTransactionsService: GranatumTransactionsService,
    private readonly granatumAccountsService: GranatumAccountsService,
    private readonly granatumCostCenterService: GranatumCostCenterService,
    private readonly granatumCategoriesService: GranatumCategoriesService,
  ) {}
  async setGanatumIds(items: GetPaidItemDTO[]) {
    try {
      const granatumAccounts = await this.granatumAccountsService.getAllAccounts();
      const granatumCategories = await this.granatumCategoriesService.getSlipCategories();
      const granatumCostCenters = await this.granatumCostCenterService.getAllCostCenters();

      const itemsWithIds: Partial<JobSetGranatumIdsDTO>[] = [];
      for (const item of items) {
        const id_account_granatum = this.granatumAccountsService.findIdByDescription(
          item.account_credit,
          granatumAccounts,
        );
        const id_category_granatum = this.granatumCategoriesService.findIdByDescription(
          item.description,
          granatumCategories,
        );
        const id_cost_center_granatum = this.granatumCostCenterService.findIdByDescription(
          item.building,
          item.block,
          granatumCostCenters,
        );
        itemsWithIds.push({ ...item, id_account_granatum, id_category_granatum, id_cost_center_granatum });
      }
      return itemsWithIds;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  formatDataToPost(items: JobSetGranatumIdsDTO[]): any[] {
    try {
      return this.granatumTransactionsService.templateTransactions(items);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async postTransaction(items: GranatumTransactionPostDTO): Promise<void> {
    try {
      await this.granatumTransactionsService.postTransactions(items);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

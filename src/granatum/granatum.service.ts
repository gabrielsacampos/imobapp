import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { GranatumAccountsService } from './granatum-accounts/granatum-accounts.service';
import { GranatumCategoriesService } from './granatum-categories/granatumCategories.service';
import { GranatumCostCenterService } from './granatum-cost-center/granatum-cost-center.service';
import { GranatumTransactionsService } from './granatum-transactions/granatumTransactions.service';
import { GetCreditInvoicesByPeriodDTO } from './interfaces/granatum.service.interface';

@Injectable()
export class GranatumService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly granatumTransactionsService: GranatumTransactionsService,
    private readonly granatumCostCentersService: GranatumCostCenterService,
    private readonly granatumCategoriesService: GranatumCategoriesService,
    private readonly granatumAccountsService: GranatumAccountsService,
  ) {}

  // @Cron('* * * * * *')
  // handleCron() {
  //   console.log('oiii');
  // }

  async setGranatumIdsIntoInvoices(start_at: string, end_at: string): Promise<any[]> {
    const paidInvoices = await this.getCreditInvoicesByPeriod(start_at, end_at);
    const invoicesWithGranatumIds = [];

    for (const invoice of paidInvoices) {
      const { property } = invoice.lease;
      const { credit_at, paid_at, bank_fee_value, account_credit, id_imobzi: id_invoice, interest_value } = invoice;

      const items = await this.setItemsGranatumCategoriesId(invoice.invoiceItems);
      const id_cost_center_granatum = await this.setCostCenterGranatumId(property);
      const id_account_granatum = await this.setAccountGranatumId(account_credit);

      const mapedItems = items.map((element) => {
        return { ...element, id_cost_center_granatum, property };
      });

      invoicesWithGranatumIds.push({
        id_invoice,
        interest_value,
        id_account_granatum,
        property,
        bank_fee_value,
        credit_at,
        paid_at,
        items: mapedItems,
      });
    }
    return invoicesWithGranatumIds;
  }

  async setItemsGranatumCategoriesId(invoiceItems) {
    const itemsWithGranatumCategoriesIds = [];
    for (const item of invoiceItems) {
      const id = await this.granatumCategoriesService.findIdByDescription(item.description);
      itemsWithGranatumCategoriesIds.push({ ...item, id_category_granatum: id });
    }
    return itemsWithGranatumCategoriesIds;
  }

  async setAccountGranatumId(accountName) {
    return await this.granatumAccountsService.findIdByDescription(accountName);
  }

  async setCostCenterGranatumId(property) {
    return await this.granatumCostCentersService.findIdByDescription(property);
  }

  async getCreditInvoicesByPeriod(start_at: string, end_at: string): Promise<GetCreditInvoicesByPeriodDTO[]> {
    try {
      return await this.prisma.invoice.findMany({
        select: {
          credit_at: true,
          account_credit: true,
          paid_at: true,
          paid_manual: true,
          id_imobzi: true,
          bank_fee_value: true,
          interest_value: true,
          invoiceItems: { select: { description: true, value: true } },
          lease: {
            select: {
              tenant_person: { select: { fullname: true, cpf: true } },
              tenant_org: { select: { name: true, cnpj: true } },
              id: true,
              property: {
                select: {
                  unit: true,
                  property_block: true,
                  buildings: {
                    select: {
                      name: true,
                      address: true,
                    },
                  },
                },
              },
            },
          },
        },
        where: {
          credit_at: {
            gte: new Date(start_at),
            lte: new Date(end_at),
          },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { GranatumCategoriesService } from './granatum-categories/granatumCategories.service';
import { GranatumTransactionsService } from './granatum-transactions/granatumTransactions.service';

@Injectable()
export class GranatumService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly granatumTransactionsService: GranatumTransactionsService, // private readonly granatumCostCentersService: GanatumCostCentersServices,
    private readonly granatumCategoriesService: GranatumCategoriesService, // private readonly granatumAccountsService: GanatumAccountsServices,
  ) {}

  async setItemsGranatumCategoriesId(invoiceItems) {
    const itemsWithGranatumCategoriesIds = [];
    for (const item of invoiceItems) {
      const id = await this.granatumCategoriesService.findIdByDescription(item.description);
      itemsWithGranatumCategoriesIds.push({ ...item, id_category_granatum: id });
    }

    return itemsWithGranatumCategoriesIds;
  }

  //   async setAccountGranatumId(invoiceItems) {
  //     const result = await this.granatumAccountsService.findIdByDescription();
  //   }

  //   async setCostCenterGranatumId(invoiceItems) {
  //     const result = await this.granatumCostCenterService.findIdByDescription();
  //   }

  async getCreditInvoicesByPeriod(start_at: string, end_at: string) {
    const result = await this.prisma.invoice.findMany({
      select: {
        created_at: true,
        account_credit: true,
        paid_manual: true,
        id_imobzi: true,
        bank_fee_value: true,
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
  }
}
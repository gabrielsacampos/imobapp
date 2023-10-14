import { Injectable } from '@nestjs/common';
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

  async getPaidInvoicesFromDb(start_at: string, end_at: string): Promise<GetCreditInvoicesByPeriodDTO[]> {
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
          onlending_value: true,
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
                  building: {
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

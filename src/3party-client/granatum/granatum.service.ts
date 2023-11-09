import { Injectable } from '@nestjs/common';
import { GroupedInvoiceComponents, InvoiceComponents } from './dtos/granatum-service.dtos';
import { GranatumAccountsService } from './granatum-accounts/granatum-accounts.service';
import { GranatumCategoriesService } from './granatum-categories/granatum-categories.service';
import { GranatumCostCenterService } from './granatum-cost-center/granatum-cost-center.service';
import { GranatumSupliersService } from './granatum-supliers/granatum-supliers.service';
import { GranatumTransactionsService } from './granatum-transactions/granatumTransactions.service';

@Injectable()
export class GranatumService {
  constructor(
    private readonly granatumTransactionsService: GranatumTransactionsService,
    private readonly granatumAccountsService: GranatumAccountsService,
    private readonly granatumCostCenterService: GranatumCostCenterService,
    private readonly granatumCategoriesService: GranatumCategoriesService,
    private readonly granatumSupliersService: GranatumSupliersService,
  ) {}

  transactions = this.granatumTransactionsService;
  accounts = this.granatumAccountsService;
  costCenters = this.granatumCostCenterService;
  categories = this.granatumCategoriesService;
  supliers = this.granatumSupliersService;
  constumers = this.granatumCostCenterService;

  groupInvoices(items: InvoiceComponents[]): GroupedInvoiceComponents[] {
    const groupedItems = items.reduce((acc, curr) => {
      const key = curr.credit_at + ' | ' + curr.account_credit + ' | ' + curr.paid_manual;
      if (!acc[key]) {
        acc[key] = {
          type: curr.type,
          account_credit: curr.account_credit,
          paid_at: curr.paid_at,
          credit_at: curr.credit_at,
          description: curr.paid_manual ? `Transaferência recebida em conta` : `Cobranças Imobzi`,
          items: [curr],
        };
      } else {
        acc[key].items.push(curr);
      }

      return acc;
    }, []);

    return Object.values(groupedItems);
  }

  groupOnlendings(onlendings: InvoiceComponents[]): GroupedInvoiceComponents[] {
    const groupedOnlendings = onlendings.reduce((acc, curr) => {
      const key = curr.cnpj + ' | ' + curr.cpf + ' | ' + curr.account_credit;
      if (!acc[key]) {
        acc[key] = {
          type: curr.type,
          account_credit: curr.account_credit,
          description: 'Repasse de Aluguéis',
          items: [curr],
        };
      } else {
        acc[key].items.push(curr);
      }

      return acc;
    }, {});

    return Object.values(groupedOnlendings);
  }

  groupRevenues(revenues: InvoiceComponents[]): GroupedInvoiceComponents[] {
    const groupedOnlendings = revenues.reduce((acc, curr) => {
      const key = curr.cnpj + ' | ' + curr.cpf + ' | ' + curr.account_credit + ' | ' + curr.IRRF;
      if (!acc[key]) {
        acc[key] = {
          type: curr.type,
          account_credit: curr.account_credit,
          description: 'Transferência de Comissões entre Contas',
          items: [curr],
        };
      } else {
        acc[key].items.push(curr);
      }

      return acc;
    }, {});

    return Object.values(groupedOnlendings);
  }
}

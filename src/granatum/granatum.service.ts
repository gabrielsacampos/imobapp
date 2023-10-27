import { Injectable } from '@nestjs/common';
import { InvoicesService } from 'src/repository/invoices/invoices.service';
import { GroupedInvoiceComponents, InvoiceComponents, InvoicesComponentsGroups } from './dtos/granatum-service.dtos';

@Injectable()
export class GranatumService {
  constructor(private readonly invoicesService: InvoicesService) {}

  async getInvoicesComponents(start_at: string, end_at: string): Promise<InvoicesComponentsGroups> {
    try {
      const items = await this.invoicesService.getPaidInvoices(start_at, end_at);
      const onlendings = await this.invoicesService.getOnlendings(start_at, end_at);
      const revenues = await this.invoicesService.getRevenue(start_at, end_at);

      const groupedItems = this.groupItemsFromDb(items);
      const groupedOnlendings = this.groupOnlendingsFromDb(onlendings);
      const groupedRevenues = this.groupRevenuesFromDb(revenues);
      return { groupedItems, groupedOnlendings, groupedRevenues };
    } catch (error) {
      throw new Error(error);
    }
  }

  groupItemsFromDb(items: InvoiceComponents[]): GroupedInvoiceComponents[] {
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

  groupOnlendingsFromDb(onlendings: InvoiceComponents[]): GroupedInvoiceComponents[] {
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

  groupRevenuesFromDb(revenues: InvoiceComponents[]): GroupedInvoiceComponents[] {
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

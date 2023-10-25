import { Injectable } from '@nestjs/common';
import { GetOnlendingsDTO, GetPaidItemDTO } from 'src/repository/invoices/dtos/return-invoice.queries.dtos';
import { InvoicesService } from 'src/repository/invoices/invoices.service';
import { GetInvoicesComponentsDTO, GroupedItemsDTO, GroupedOnlendingsDTO } from './dtos/granatum-service.dtos';

@Injectable()
export class GranatumService {
  constructor(private readonly invoicesService: InvoicesService) {}

  async getInvoicesComponents(start_at: string, end_at: string): Promise<GetInvoicesComponentsDTO> {
    const items = await this.invoicesService.getPaidItems(start_at, end_at);
    const onlendings = await this.invoicesService.getOnlendings(start_at, end_at);

    const groupedItems = this.groupItemsFromDb(items);
    const groupedOnlendings = this.groupOnlendingsFromDb(onlendings);
    return { groupedItems, groupedOnlendings };
  }

  groupItemsFromDb(items: GetPaidItemDTO[]): GroupedItemsDTO[] {
    const groupedItems = items.reduce((acc, curr) => {
      const key = curr.credit_at + ' | ' + curr.account_credit + ' | ' + curr.paid_manual;
      if (!acc[key]) {
        acc[key] = {
          type: 'invoice',
          count_invoices: 1,
          paid_at: curr.paid_at,
          credit_at: curr.credit_at,
          account_credit: curr.account_credit,
          description: curr.paid_manual ? `Transaferência recebida em conta` : `Cobranças Imobzi`,
          items: [curr],
        };
      } else {
        acc[key].items.push(curr);
        acc[key].count_invoices++;
      }

      return acc;
    }, []);

    return Object.values(groupedItems);
  }

  groupOnlendingsFromDb(onlendings: GetOnlendingsDTO[]): GroupedOnlendingsDTO[] {
    const groupedOnlendings = onlendings.reduce((acc, curr) => {
      const key = curr.beneficiary_cnpj + ' | ' + curr.beneficiary_cpf + ' | ' + curr.account_credit;
      if (!acc[key]) {
        acc[key] = {
          type: 'onlending',
          count_invoices: 1,
          account_credit: curr.account_credit,
          description: 'Repasse de Aluguéis',
          items: [curr],
        };
      } else {
        acc[key].items.push(curr);
        acc[key].count_invoices++;
      }

      return acc;
    }, {});

    return Object.values(groupedOnlendings);
  }
}

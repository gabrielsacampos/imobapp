import { Injectable } from '@nestjs/common';
import { CreateInvoiceDTO } from './dtos/create-invoice.dtos';
import { Invoice } from './entities/invoice.entity';
import { InvoicesRepository } from './invoices.repository';
import { dateFunctions } from './utilities/date.functions';

@Injectable()
export class InvoicesService {
  constructor(private readonly invoicesRepository: InvoicesRepository) {}

  async upsert(data: CreateInvoiceDTO): Promise<Invoice> {
    return this.invoicesRepository
      .findById(data.id_imobzi)
      .then(() => {
        return this.invoicesRepository.update(data.id_imobzi, data);
      })
      .catch((error) => {
        if (error.status === 404) {
          return this.invoicesRepository.create(data);
        } else {
          throw new Error(error);
        }
      });
  }

  async inmutableInvoicesIds() {
    const inmutableInvoices = await this.invoicesRepository.getImmutableInvoices();
    return inmutableInvoices.map((item) => item.invoice_id);
  }

  async paidInvoices(start_at: string, end_at: string): Promise<any[]> {
    const items = await this.invoicesRepository.getPaidInvoices(start_at, end_at);
    const grouped = items.reduce((acc, curr) => {
      const key = curr.paid_at + '-' + curr.paid_manual + '-' + curr.account_credit;
      const { description, behavior, block, building, invoice_id, value, unity } = curr;
      const requiredItemsInfo = { description, behavior, block, building, invoice_id, value, unity };
      if (!acc[key]) {
        acc[key] = {
          type: curr.type,
          account_credit: curr.account_credit,
          paid_manual: curr.paid_manual,
          paid_at: curr.paid_at,
          credit_at: curr.credit_at,
          total_paid: curr.value,
          items: [requiredItemsInfo],
        };
      } else {
        acc[key].total_paid += curr.value;
        acc[key].items.push(requiredItemsInfo);
      }
      return acc;
    }, {});

    return Object.values(grouped);
  }

  async predictedOnlendings(start_at: string, end_at: string): Promise<any[]> {
    const onlendings = await this.invoicesRepository.getOnlendings(start_at, end_at);
    const grouped = onlendings.reduce((acc, curr) => {
      const key = curr.cnpj + ' | ' + curr.cpf + ' | ' + curr.account_credit;
      const { invoice_id, description, value, unity, building, block } = curr;
      const requiredItemsInfo = { invoice_id, description, value, unity, building, block };
      if (!acc[key]) {
        acc[key] = {
          beneficiary_cpf: curr.cpf,
          beneficiary_cnpj: curr.cnpj,
          type: curr.type,
          total_onlending: curr.value,
          account_credit: curr.account_credit,
          description: 'Repasse de Aluguéis',
          items: [requiredItemsInfo],
        };
      } else {
        acc[key].total_onlending += curr.value;
        acc[key].items.push(requiredItemsInfo);
      }
      return acc;
    }, {});

    return Object.values(grouped);
  }

  async predictedRevenues(start_at: string, end_at: string): Promise<any[]> {
    const revenues = await this.invoicesRepository.getRevenue(start_at, end_at);
    const grouped = revenues.reduce((acc, curr) => {
      const key = curr.cnpj + ' | ' + curr.cpf + ' | ' + curr.account_credit + ' | ' + curr.IRRF;
      const { invoice_id, description, value, unity, building, block, paid_at, credit_at } = curr;
      const requiredItemsInfo = { invoice_id, description, value, unity, building, block, paid_at, credit_at };
      const reference = dateFunctions.monthStringFormatBR(curr.paid_at);

      if (!acc[key]) {
        acc[key] = {
          reference,
          owner_cpf: curr.cpf,
          owner_cnpj: curr.cnpj,
          type: curr.type,
          total_revenue: curr.value,
          account_credit: curr.account_credit,
          description: 'Repasse de Aluguéis',
          items: [requiredItemsInfo],
        };
      } else {
        acc[key].total_revenue += curr.value;
        acc[key].items.push(requiredItemsInfo);
      }
      return acc;
    }, {});

    return Object.values(grouped);
  }
}

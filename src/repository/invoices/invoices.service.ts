import { Injectable } from '@nestjs/common';
import { CreateInvoiceDTO } from './dtos/create-invoice.dtos';
import { Invoice } from './entities/invoice.entity';
import { InvoicesRepository } from './invoices.repository';

@Injectable()
export class InvoicesService {
  constructor(private readonly invoicesRepository: InvoicesRepository) {}

  async upsert(data: CreateInvoiceDTO): Promise<Invoice> {
    try {
      const found = this.invoicesRepository.findById(data.id_imobzi);
      if (found) {
        return this.invoicesRepository.update(data.id_imobzi, data);
      } else {
        return this.invoicesRepository.create(data);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  paidInvoices = this.invoicesRepository.getPaidInvoices;
  async inmutableInvoicesIds() {
    const inmutableInvoices = await this.invoicesRepository.getImmutableInvoices();
    return inmutableInvoices.map((item) => item.invoice_id);
  }
  predictedOnlendings = this.invoicesRepository.getOnlendings;
  predictedRevenues = this.invoicesRepository.getRevenue;
}

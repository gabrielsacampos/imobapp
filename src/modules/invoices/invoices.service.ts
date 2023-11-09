import { Injectable } from '@nestjs/common';
import { CreateInvoiceDTO } from './dtos/create-invoice.dtos';
import { Invoice } from './entities/invoice.entity';
import { InvoicesRepository } from './invoices.repository';

@Injectable()
export class InvoicesService {
  constructor(private readonly invoicesRepository: InvoicesRepository) {}

  async upsert(data: CreateInvoiceDTO): Promise<Invoice> {
    return this.invoicesRepository
      .findById(data.id_imobzi)
      .then(() => {
        console.log('oi');
        return this.invoicesRepository.update(data.id_imobzi, data);
      })
      .catch((error) => {
        console.log(error);
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

  paidInvoices = this.invoicesRepository.getPaidInvoices;
  predictedOnlendings = this.invoicesRepository.getOnlendings;
  predictedRevenues = this.invoicesRepository.getRevenue;
}

import { Injectable } from '@nestjs/common';
import { dateFunctions } from 'src/my-usefull-functions/date.functions';
import { CreateInvoiceDTO } from 'src/repository/invoices/dtos/create-invoice.dtos';
import { CreateInvoiceItemDto } from 'src/repository/invoice_items/dto/create-invoice_item.dto';
import { AnImobziInvoiceDTO, ImobziInvoiceItem } from './dto/an-imobzi-invoice.dtos';
import { ImobziInvoicesRepository } from './imobziInvoices.repository';

@Injectable()
export class ImobziInvoicesService {
  constructor(private readonly imobziInvoicesRepository: ImobziInvoicesRepository) {}

  getRequiredInvoiceItemsDataToDb(
    invoiceItems: ImobziInvoiceItem[],
    id_invoice_imobzi: string,
  ): CreateInvoiceItemDto[] {
    return invoiceItems.map((item) => {
      const {
        until_due_date,
        item_type,
        invoice_item_id: id_imobzi,
        description,
        behavior,
        include_in_dimob,
        charge_management_fee,
        value,
      } = item;

      return {
        until_due_date,
        item_type,
        id_imobzi,
        description,
        behavior,
        include_in_dimob,
        charge_management_fee,
        value,
        id_invoice_imobzi,
      };
    });
  }

  async getRequiredInvoicesDataToDb(invoiceDetails: AnImobziInvoiceDTO): Promise<CreateInvoiceDTO> {
    try {
    } catch (error) {
      throw new Error(error);
    }
  }
}

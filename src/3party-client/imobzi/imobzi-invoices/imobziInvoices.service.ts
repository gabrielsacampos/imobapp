import { Injectable } from '@nestjs/common';
import { dateFunctions } from 'src/my-usefull-functions/date.functions';
import { CreateInvoiceDTO } from 'src/repository/invoices/dtos/create-invoice.dtos';
import { CreateInvoiceItemDto } from 'src/repository/invoice_items/dto/create-invoice_item.dto';
import { AnImobziInvoiceDTO, ImobziInvoiceItem } from './dto/an-imobzi-invoice.dtos';

@Injectable()
export class ImobziInvoicesService {
  getRequiredInvoiceItemsDataToDb(invoiceItems: ImobziInvoiceItem[], idImobzi: string): CreateInvoiceItemDto[] {
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

      const id_invoice_imobzi = idImobzi;

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

  getAnInvoiceRequiredData(invoiceFullData: AnImobziInvoiceDTO): CreateInvoiceDTO {
    const idImobzi = invoiceFullData.invoice_id;
    const id_lease_imobzi = invoiceFullData.lease?.db_id.toString();
    const management_fee = invoiceFullData.onlendings_and_fees?.management_fee_value;
    const account_credit = invoiceFullData.account?.name;
    const onlending_value = invoiceFullData.onlendings_and_fees?.predicted_onlending_value;
    const paidAtString = invoiceFullData.paid_at;
    const creditAtString = paidAtString ? dateFunctions.defineCreditDate(paidAtString) : null; //function handle and returns date as string

    // Requireds as Date ISO
    const due_date = new Date(invoiceFullData.due_date);
    const paid_at = paidAtString ? new Date(paidAtString) : null; // db requires as Date format
    const credit_at = creditAtString ? new Date(creditAtString) : null;
    const itemsWithInvoicesIds = invoiceFullData.items.map((item) => {
      return { ...item, id_invoice_imobzi: idImobzi };
    });

    const invoiceItems: CreateInvoiceItemDto[] = this.getRequiredInvoiceItemsDataToDb(itemsWithInvoicesIds, idImobzi);

    const {
      invoice_id: id_imobzi,
      status,
      reference_start_at,
      reference_end_at,
      invoice_url,
      barcode,
      bank_slip_id,
      bank_slip_url,
      total_value,
      interest_value,
      invoice_paid_manual: paid_manual,
      charge_fee_value: bank_fee_value,
    } = invoiceFullData;

    return {
      id_imobzi,
      status,
      reference_start_at,
      reference_end_at,
      due_date,
      invoice_url,
      barcode,
      bank_slip_id,
      bank_slip_url,
      total_value,
      interest_value,
      paid_at,
      credit_at,
      paid_manual,
      bank_fee_value,
      account_credit,
      onlending_value,
      management_fee,
      id_lease_imobzi,
      invoiceItems,
    };
  }
}

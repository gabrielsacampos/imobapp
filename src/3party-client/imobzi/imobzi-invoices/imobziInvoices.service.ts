import { Injectable } from '@nestjs/common';
import { dateFunctions } from 'src/my-usefull-functions/date.functions';
import { CreateInvoiceDTO } from 'src/modules/invoices/dtos/create-invoice.dtos';
import { CreateInvoiceItemDto } from 'src/modules/invoice_items/dto/create-invoice_item.dto';
import { AnImobziInvoiceDTO, ImobziInvoiceItem } from './dto/an-imobzi-invoice.dtos';
import { ImobziInvoicesRepository } from './imobziInvoices.repository';

@Injectable()
export class ImobziInvoicesService {
  constructor(private readonly imobziInvoicesRepository: ImobziInvoicesRepository) {}
  getRequiredInvoiceItemsDataToDb(invoiceItems: ImobziInvoiceItem[]): CreateInvoiceItemDto[] {
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
      };
    });
  }

  async getRequiredData(idInvoice: string): Promise<CreateInvoiceDTO> {
    const invoiceMainData: any = {};

    const invoiceFullData: AnImobziInvoiceDTO = await this.imobziInvoicesRepository.getFullData(idInvoice);
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

    const interestItem: CreateInvoiceItemDto = {
      id_invoice_imobzi: invoiceFullData.invoice_id,
      until_due_date: false,
      item_type: null,
      id_imobzi: idInvoice,
      description: 'Juros',
      behavior: 'charge_tenant_and_onlend',
      include_in_dimob: true,
      charge_management_fee: true,
      value: invoiceFullData.interest_value,
    };

    const bankFeeItem: CreateInvoiceItemDto = {
      id_invoice_imobzi: invoiceFullData.invoice_id,
      until_due_date: false,
      item_type: null,
      id_imobzi: `${idImobzi}-bank-fee`,
      description: 'Taxa de Boleto',
      behavior: 'bank_withheld',
      include_in_dimob: false,
      charge_management_fee: false,
      value: 0 - invoiceFullData.charge_fee_value,
    };

    delete invoiceFullData.interest_value;
    delete invoiceFullData.charge_fee_value;

    invoiceMainData.invoiceItems = this.getRequiredInvoiceItemsDataToDb(itemsWithInvoicesIds);
    if (interestItem.value !== 0) {
      invoiceMainData.invoiceItems.push(interestItem);
    }

    if (bankFeeItem.value !== 0) {
      invoiceMainData.invoiceItems.push(bankFeeItem);
    }

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
      invoice_paid_manual: paid_manual,
    } = invoiceFullData;

    return {
      ...invoiceMainData,
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
      paid_at,
      credit_at,
      paid_manual,
      account_credit,
      onlending_value,
      management_fee,
      id_lease_imobzi,
    };
  }
}

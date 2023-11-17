import { AnImobziInvoiceDTO } from '../../imobzi-invoices/dto/an-imobzi-invoice.dtos';

export enum WhkInvoiceEvent {
  update = 'invoice_updated',
  create = 'invoice_created',
}
export class WhkInvoice {
  invoice: AnImobziInvoiceDTO;
  db_id?: string;
  event?: string;
  database?: string;
}

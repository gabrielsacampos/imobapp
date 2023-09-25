import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { InvoiceDTO } from 'src/modules/invoices/invoices.dtos';
import { MyFunctionsService } from 'src/my-usefull-functions/myFunctions.service';
import { Invoice } from './imobziInvoices.dtos';
import { ImobziInvoicesProvider } from './imobziInvoices.provider';

@Injectable()
export class ImobziInvoicesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imobziInvoicesProvider: ImobziInvoicesProvider,
    private readonly myFunctionsService: MyFunctionsService,
  ) {}

  async getInvoicesMissingIdsFromImobzi() {
    const invoicesOnDb: InvoiceDTO[] = await this.prisma.invoice.findMany();
    const invoicesFromAPi: Invoice[] = await this.imobziInvoicesProvider.getAllInvoicesFromImobzi();

    const invoicesOnDbIds = invoicesOnDb.map((invoiceOnDb) => {
      return invoiceOnDb.id_imobzi;
    });

    const invoicesFromApiIds = invoicesFromAPi.map((invoiceFromApi) => {
      return invoiceFromApi.invoice_id;
    });

    const missingIdsOnDb: string[] = invoicesFromApiIds.filter((leaseFromApiId) => {
      // if DB.invoice does not include the current id from API
      return !invoicesOnDbIds.includes(leaseFromApiId);
    });

    return missingIdsOnDb;
  }

  async getInvoiceFullDataFromImobzi(id_invoice_imobzi: string): Promise<any> {
    const invoiceFullData = await this.imobziInvoicesProvider.getInvoiceFullDataFromImobzi(id_invoice_imobzi);
    const id_lease_imobzi = invoiceFullData.lease.db_id.toString();
    const management_fee = invoiceFullData.onlendings_and_fees.management_fee_value;
    const account_credit = invoiceFullData.account.name;
    const onlending_value = invoiceFullData.onlendings_and_fees.predicted_onlending_value;
    const { paid_at } = invoiceFullData;
    const credit_at = this.myFunctionsService.defineCreditDate(paid_at);

    const {
      invoice_id: id_imobzi,
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
    };
  }
}

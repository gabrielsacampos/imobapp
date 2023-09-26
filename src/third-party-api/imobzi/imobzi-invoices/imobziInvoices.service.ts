import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { InvoiceCreateDTO, ItemsInvoiceDTO } from 'src/modules/invoices/invoicesCreate.dtos';
import { MyFunctionsService } from 'src/my-usefull-functions/myFunctions.service';
import { ImobziInvoiceDetailsDTO } from './imobziInvoiceDetails.dtos';
import { ImobziInvoicesProvider } from './imobziInvoices.provider';

@Injectable()
export class ImobziInvoicesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imobziInvoicesProvider: ImobziInvoicesProvider,
    private readonly myFunctionsService: MyFunctionsService,
  ) {}

  async getInvoicesMissingIdsFromImobzi() {
    const invoicesOnDb = await this.prisma.invoice.findMany();
    const invoicesFromAPi = await this.imobziInvoicesProvider.getAllInvoicesFromImobzi();

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

  async getInvoiceMainDataFromImobzi(id_invoice_imobzi: string): Promise<InvoiceCreateDTO> {
    const invoiceFullData = await this.imobziInvoicesProvider.getInvoiceFullDataFromImobzi(id_invoice_imobzi);
    const id_lease_imobzi = invoiceFullData.lease.db_id.toString();
    const management_fee = invoiceFullData.onlendings_and_fees.management_fee_value;
    const account_credit = invoiceFullData.account.name;
    const onlending_value = invoiceFullData.onlendings_and_fees.predicted_onlending_value;
    const { paid_at } = invoiceFullData;
    const credit_at = this.myFunctionsService.defineCreditDate(paid_at);

    const items: ItemsInvoiceDTO[] = invoiceFullData.items.map((item) => {
      const {
        until_due_date,
        item_type,
        invoice_item_id: id_imobzi,
        description,
        behavior,
        include_in_dimob,
        charge_management_fee: management_fee,
        value,
        due_date,
      } = item;

      return {
        until_due_date,
        item_type,
        id_imobzi,
        id_invoice_imobzi,
        description,
        behavior,
        include_in_dimob,
        management_fee,
        value,
        due_date,
      };
    });

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
      items,
    };
  }

  async getInvoicesToUpdateDb(): Promise<ImobziInvoiceDetailsDTO[]> {
    //note: Invoices can only have updates to pending and paid(paid_manual) status.
    const allInvoicesOnDb = await this.prisma.invoice.findMany({
      where: {
        NOT: {
          status: {
            in: ['deleted', 'expired', 'canceled'],
          },
          AND: {
            paid_manual: false,
          },
        },
      },
    });

    const invoiceIdToUpdate = [];
    for (const invoiceOnDb of allInvoicesOnDb) {
      const invoiceFromApi = await this.imobziInvoicesProvider.getInvoiceFullDataFromImobzi(invoiceOnDb.id_imobzi);
      if (invoiceFromApi.status !== invoiceOnDb.status) {
        invoiceIdToUpdate.push(invoiceOnDb);
      }
    }

    return invoiceIdToUpdate;
  }
}

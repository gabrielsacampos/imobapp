import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ItemsInvoiceCreateDTO } from 'src/repository/modules/invoices/invoice-items/invoice-items.dtos';
import { CreateInvoiceDTO } from 'src/repository/modules/invoices/dtos/create-invoice.dtos';
import { ImobziInvoiceDetailsDTO, ImobziInvoiceItem } from './imobziInvoiceDetails.dtos';
import { ImobziInvoiceDTO, InvoicesDTO } from './imobziInvoices.dtos';
import { imobziUrls, imobziParams } from '../imobzi-urls-params/imobzi.urls';
import { dateFunctions } from 'src/my-usefull-functions/date.functions';

@Injectable()
export class ImobziInvoicesService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly httpService: HttpService,
  ) {}

  async getAllInvoicesFromImobzi(): Promise<InvoicesDTO[]> {
    try {
      let page = 1;
      const allInvoices = [];

      while (page) {
        const { data } = await this.httpService.axiosRef.get<ImobziInvoiceDTO>(
          imobziUrls.urlAllInvoices(page),
          imobziParams,
        );
        allInvoices.push(...data.invoices);

        this.logger.verbose(`invoices catched  > ${allInvoices.length}`);
        page = data.next_page;
      }

      return allInvoices;
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  getRequiredInvoiceItemsDataToDb(invoiceItems: ImobziInvoiceItem[]): ItemsInvoiceCreateDTO[] {
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

  async getRequiredInvoicesDataToDb(id_invoice_imobzi: string): Promise<CreateInvoiceDTO> {
    try {
      const { data } = await this.httpService.axiosRef.get<ImobziInvoiceDetailsDTO>(
        imobziUrls.urlInvoiceDetail(id_invoice_imobzi),
        imobziParams,
      );

      const id_lease_imobzi = data.lease?.db_id.toString();
      const management_fee = data.onlendings_and_fees?.management_fee_value;
      const account_credit = data.account?.name;
      const onlending_value = data.onlendings_and_fees?.predicted_onlending_value;
      const paidAtString = data.paid_at;
      const creditAtString = paidAtString ? dateFunctions.defineCreditDate(paidAtString) : null; //function handle and returns date as string

      // Requireds as Date ISO
      const due_date = new Date(data.due_date);
      const paid_at = paidAtString ? new Date(paidAtString) : null; // db requires as Date format
      const credit_at = creditAtString ? new Date(creditAtString) : null;

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
      } = data;
      const items = this.getRequiredInvoiceItemsDataToDb(data.items);
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
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}

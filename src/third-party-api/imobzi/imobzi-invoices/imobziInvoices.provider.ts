import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { ImobziInvoiceDetailsDTO } from './imobziInvoiceDetails.dtos';
import { ImobziInvoiceDTO, ImobziInvoicesDTO } from './imobziInvoices.dtos';

@Injectable()
export class ImobziInvoicesProvider {
  constructor(
    private readonly httpService: HttpService,
    private readonly imobziUrlService: ImobziUrlService,
    private readonly imobziParamService: ImobziParamService,
  ) {}

  async getAllInvoicesFromImobzi(): Promise<ImobziInvoiceDTO[]> {
    let page = 1;
    const allInvoices = [];

    while (page) {
      const { data } = await this.httpService.axiosRef.get<ImobziInvoicesDTO>(
        this.imobziUrlService.urlAllInvoices(page),
        this.imobziParamService,
      );
      allInvoices.push(...data.invoices);
      page = data.next_page;
    }

    return allInvoices;
  }

  async getInvoiceFullDataFromImobzi(id_invoice_imobzi: string): Promise<ImobziInvoiceDetailsDTO> {
    const { data } = await this.httpService.axiosRef.get<ImobziInvoiceDetailsDTO>(
      this.imobziUrlService.urlInvoiceDetail(id_invoice_imobzi),
      this.imobziParamService,
    );

    return data;
  }
}

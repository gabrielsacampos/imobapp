import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { imobziParams, imobziUrls } from '../imobzi-urls-params/imobzi.urls';
import { AllImobziInvoiceDTO, ImobziInvoicesPageDTO } from './dto/all-imobzi-invoice.dtos';
import { AnImobziInvoiceDTO } from './dto/an-imobzi-invoice.dtos';

@Injectable()
export class ImobziInvoicesRepository {
  private logger = new Logger('ImobziInvoicesRepository');
  constructor(private readonly httpService: HttpService) {}

  async getAll(): Promise<AllImobziInvoiceDTO[]> {
    let page = 1;
    const allInvoices: AllImobziInvoiceDTO[] = [];

    while (page) {
      const { data } = await this.httpService.axiosRef.get<ImobziInvoicesPageDTO>(
        imobziUrls.urlAllInvoices(page),
        imobziParams,
      );
      allInvoices.push(...data.invoices);
      page = data.next_page;
      this.logger.verbose(`got ${allInvoices.length}/${data.count} INVOICES`);
    }

    return allInvoices;
  }

  async getFullData(idImobzi: string): Promise<AnImobziInvoiceDTO> {
    const { data } = await this.httpService.axiosRef.get<AnImobziInvoiceDTO>(
      imobziUrls.urlInvoiceDetail(idImobzi),
      imobziParams,
    );

    return data;
  }
}

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { imobziParams, imobziUrls } from '../imobzi-urls-params/imobzi.urls';
import { AllImobziInvoiceDTO, ImobziInvoicesPageDTO } from './dto/all-imobzi-invoice.dtos';
import { AnImobziInvoiceDTO } from './dto/an-imobzi-invoice.dtos';

@Injectable()
export class ImobziInvoicesRepository {
  constructor(private readonly httpService: HttpService) {}

  async getAll(): Promise<AllImobziInvoiceDTO[]> {
    try {
      let page = 1;
      const allInvoices: AllImobziInvoiceDTO[] = [];

      // while (page) {
      const { data } = await this.httpService.axiosRef.get<ImobziInvoicesPageDTO>(
        imobziUrls.urlAllInvoices(page),
        imobziParams,
      );
      allInvoices.push(...data.invoices);
      page = data.next_page;
      console.log(allInvoices.length, ' / ', data.count);
      // }

      return allInvoices;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getFullData(idImobzi: string): Promise<AnImobziInvoiceDTO> {
    try {
      const { data } = await this.httpService.axiosRef.get<AnImobziInvoiceDTO>(
        imobziUrls.urlInvoiceDetail(idImobzi),
        imobziParams,
      );

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

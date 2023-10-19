import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { granatumUrls } from '../granatum-urls-params/granatum.urls';
import { GranatumTransactionPostDTO } from './granatumTransacationsPost.dtos';
import { dateFunctions } from '../../my-usefull-functions/date.functions';

@Injectable()
export class GranatumTransactionsService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  templateTransactions(groupedInvoices) {
    const template = {
      tags: [{ id: 59943 }],
      observacao:
        groupedInvoices.count_invoices +
        ' Faturas pagas em: ' +
        dateFunctions.formatToBr(groupedInvoices.paid_at) +
        ' e creditadas em: ' +
        dateFunctions.formatToBr(groupedInvoices.credit_at),
      conta_id: groupedInvoices.id_account_granatum,
      valor: groupedInvoices.bank_fee_value,
      categoria_id: 1843956, // already defined id to this category at Granatum
      data_vencimento: dateFunctions.formatToUS(groupedInvoices.credit_at),
      data_pagamento: dateFunctions.formatToUS(groupedInvoices.credit_at),
      descricao: `${groupedInvoices.count_invoices} ${groupedInvoices.description}`,
      itens_adicionais: [],
    };

    groupedInvoices.items.forEach((item) => {
      template.itens_adicionais.push({
        tags: [{ id: 59943 }],
        centro_custo_lucro_id: item.id_cost_center_granatum,
        categoria_id: item.id_category_granatum,
        valor: item.value_item,
        descricao:
          item.description +
          ' > Fatura: ' +
          item.id_invoice +
          ' > Imóvel: ' +
          item.property_unity +
          ' - ' +
          item.building +
          (item.block || ''),
      });
    });
    return template;
  }

  formatRevenueTransactions() {}

  async postTransactions(invoiceReadyToPost: GranatumTransactionPostDTO) {
    try {
      const { status, data } = await this.httpService.axiosRef.post(
        granatumUrls.posTransaciontsUrl(),
        invoiceReadyToPost,
      );
      console.log(status, data.id);
    } catch (error) {
      const errorData = JSON.stringify(error.response.data);
      throw new Error(errorData);
    }
  }
}

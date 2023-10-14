import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { granatumUrls } from '../granatum-urls-params/granatum.urls';
import { GranatumTransactionPostDTO } from './granatumTransacationsPost.dtos';
import { format } from 'date-fns';

@Injectable()
export class GranatumTransactionsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,

    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  formatDataToPostTransaction(arrayOfInvoices) {
    const formated: GranatumTransactionPostDTO = arrayOfInvoices.reduce((acc, curr) => {
      const key = curr.id_account_granatum + ' | ' + curr.credit_at;
      if (acc[key]) {
        acc[key].valor -= curr.bank_fee_value;
        acc[key].itens_adicionais[0].valor += curr.interest_value || 0;
      } else {
        acc[key] = {
          tags: [{ id: 59943 }],
          observacao:
            'Faturas pagas em:' +
            format(new Date(curr.paid_at), 'dd-MM-yyyy') +
            ' e creditadas em: ' +
            format(new Date(curr.credit_at), 'dd-MM-yyyy'),
          conta_id: curr.id_account_granatum,
          categoria_id: 1843956, // already defined id to this category at Granatum
          data_vencimento: format(new Date(curr.credit_at), 'yyyy-MM-dd'),
          data_pagamento: format(new Date(curr.credit_at), 'yyyy-MM-dd'),
          valor: 0 - curr.bank_fee_value,
          descricao: curr.bank_fee_value > 0 ? ' Cobrança Imobzi' : ' Transferência recebida', // if payment method has bank_fee, its a 'slip invoice', else is a deposit.
          itens_adicionais: [
            //this item of array we gonna set to defined category so we can accumulate values while reduce loop the array
            {
              tags: [{ id: 59943 }],
              descricao: 'Juros e multa de faturas',
              categoria_id: 1848070,
              valor: curr.interest_value || 0,
            },
          ],
        };
      }
      acc[key].itens_adicionais.push(...this.extractInvoiceItems(curr));
      return acc;
    }, {});

    return Object.values(formated);
  }

  extractInvoiceItems(invoice) {
    const items = invoice.items;
    const formatedItems = [];
    for (const i of items) {
      formatedItems.push({
        tags: [{ id: 59943 }],
        descricao:
          i.description +
            ' > Fatura: ' +
            invoice.id_invoice +
            ' > imóvel: ' +
            invoice.property.unit +
            ' - ' +
            invoice.property.property_block || '' + invoice.property.building.name,
        valor: i.value,
        categoria_id: i.id_category_granatum,
        centro_custo_lucro_id: i.id_cost_center_granatum,
      });
    }
    return formatedItems;
  }

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

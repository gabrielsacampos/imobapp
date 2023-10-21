import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { granatumUrls } from '../granatum-urls-params/granatum.urls';
import { dateFunctions } from '../../my-usefull-functions/date.functions';
import { JobSetGranatumIdsDTO } from '../dtos/jobs.dtos';
import { GranatumTransactionItemsPostDTO, GranatumTransactionPostDTO } from './dtos/granatum-transactions.dtos';

@Injectable()
export class GranatumTransactionsService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  templateTransactions(items: JobSetGranatumIdsDTO[]) {
    const grouped = items.reduce((acc, curr) => {
      const key = curr.id_account_granatum;

      if (!acc[key]) {
        acc[key] = {
          tags: [{ id: 59943 }],
          observacao:
            items.length +
            ' Faturas pagas em: ' +
            dateFunctions.formatToBr(curr.paid_at) +
            ' e creditadas em: ' +
            dateFunctions.formatToBr(curr.credit_at),
          conta_id: curr.id_account_granatum,
          valor: 0,
          categoria_id: 1843956, // already defined id to this category at Granatum
          data_vencimento: dateFunctions.formatToUS(curr.credit_at),
          data_pagamento: dateFunctions.formatToUS(curr.credit_at),
          descricao: `${items.length} Faturas recebidas`,
          itens_adicionais: [],
        };
        acc[key].itens_adicionais.push(this.formatTemplateItems(curr));
      } else {
        acc[key].itens_adicionais.push(this.formatTemplateItems(curr));
      }
      return acc;
    }, {});

    return Object.values(grouped);
  }

  formatTemplateItems(item: JobSetGranatumIdsDTO): GranatumTransactionItemsPostDTO {
    const { id_category_granatum: categoria_id, id_cost_center_granatum: centro_custo_lucro_id } = item;

    const tags = [{ id: 59943 }];
    const descricao =
      item.description +
      ' > Fatura: ' +
      item.id_imobzi +
      ' > Imóvel: ' +
      item.unity +
      ' - ' +
      (item.block || '') +
      '  - ';
    item.building;

    const valor = item.value;

    return { categoria_id, centro_custo_lucro_id, descricao, tags, valor };
  }

  formatRevenueTransactions() {}

  async postTransactions(invoiceReadyToPost: GranatumTransactionPostDTO): Promise<any> {
    try {
      const { status, data } = await this.httpService.axiosRef.post(
        granatumUrls.posTransaciontsUrl(),
        invoiceReadyToPost,
      );
      return { status, transacation_id: data.id };
    } catch (error) {
      const errorData = JSON.stringify(error.response.data);
      throw new Error(errorData);
    }
  }
}

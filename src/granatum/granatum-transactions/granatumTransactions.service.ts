import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { dateFunctions } from '../../my-usefull-functions/date.functions';
import { GetOnlendingsDTO, GetPaidItemDTO } from '../dtos/granatum-service.dtos';
import { SetGranatumIdsDTO } from '../dtos/jobs.dtos';
import { granatumUrls } from '../granatum-urls-params/granatum.urls';
import { GranatumItemsPostDTO, GranatumTransactionPostDTO } from './dtos/granatum-transactions.dtos';

@Injectable()
export class GranatumTransactionsService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  templateTransaction(data: any): any {
    const today = new Date().toISOString();
    let templateMainDescription: string;
    let templateObservation: string;
    let templateDueDate: string;
    let templatePaymentDate: string;
    const items = this.formatTemplateItems(data.items, data.type);

    if (data.type === 'onlending') {
      templateMainDescription = `Repasse referente a ${data.count_invoices} faturas pagas`;
      templateObservation = '';
      templateDueDate = dateFunctions.formatToUS(today);
      templatePaymentDate = null;
    } else if (data.type === 'invoice') {
      templateMainDescription = `${data.count_invoices} faturas pagas`;
      templateObservation = '';
      templateDueDate = dateFunctions.formatToUS(data.credit_at);
      templatePaymentDate = dateFunctions.formatToUS(data.credit_at);
    }

    const template = {
      data_vencimento: templateDueDate,
      descricao: templateMainDescription,
      observacao: templateObservation,
      data_pagamento: templatePaymentDate,
      tags: [{ id: 59943 }],
      conta_id: data.id_account_granatum,
      valor: 0,
      categoria_id: 1838279,
      itens_adicionais: items,
    };

    return template;
  }

  formatTemplateItems(items: GetPaidItemDTO[] | GetOnlendingsDTO[], type: string = undefined): GranatumItemsPostDTO[] {
    return items.map((item) => {
      const templateSubDescription =
        ' > Fatura: ' +
        item.invoice_id +
        ' > Imóvel: ' +
        item.unity +
        ' - ' +
        (item.block || '') +
        ' - ' +
        item.building;

      let descricao: string;
      if (type === 'onlending') {
        descricao = 'Repasse ref: ' + templateSubDescription;
      } else {
        descricao = item.description + templateSubDescription;
      }
      const {
        id_category_granatum: categoria_id,
        id_cost_center_granatum: centro_custo_lucro_id,
        id_suplier_client: pessoa_id,
      } = item;

      const tags = [{ id: 59943 }];

      const valor = item.value || 0 - item.onlending_value;

      return { categoria_id, centro_custo_lucro_id, descricao, tags, valor, pessoa_id };
    });
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
      console.log(invoiceReadyToPost);
      throw new Error(errorData);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { dateFunctions } from '../../../modules/invoices/utilities/date.functions';
import { GroupedInvoiceComponents, InvoiceComponents } from '../dtos/granatum-service.dtos';
import { GranatumItemsPostDTO, GranatumTransactionPostDTO } from './dtos/granatum-transactions.dtos';
import { GranatumTransactionsRepository } from './granatum-transactions.repository';

@Injectable()
export class GranatumTransactionsService {
  constructor(private readonly granatumTransactionsRepository: GranatumTransactionsRepository) {}

  templateTransaction(data: GroupedInvoiceComponents): GranatumTransactionPostDTO {
    const today = new Date().toISOString();
    const dataType = data.type;
    let templateMainDescription: string;
    let templateObservation: string;
    let templateDueDate: string;
    let templatePaymentDate: string;
    const items = this.formatTemplateItems(data.items, dataType);

    if (dataType === 'onlending') {
      templateMainDescription = `Repasse referente a faturas pagas`;
      templateObservation = '';
      templateDueDate = dateFunctions.formatToUS(today);
      templatePaymentDate = null;
    } else if (dataType === 'items') {
      templateMainDescription = `Faturas creditadas`;
      templateObservation = '';
      templateDueDate = dateFunctions.formatToUS(data.credit_at);
      templatePaymentDate = dateFunctions.formatToUS(data.credit_at);
    } else if (dataType === 'revenue') {
      templateMainDescription = `Comissão de Aluguel (Transferência entre Contas)`;
      templateObservation = `SERVIÇO DE CORRETAGEM NO ALUGUEL DE IMÓVEIS NO MÊS DE ${data.reference}`;
      templateDueDate = dateFunctions.formatToUS(today);
      templatePaymentDate = null;
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

  private formatTemplateItems(items: InvoiceComponents[], dataType: string): GranatumItemsPostDTO[] {
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
      let valor: number;
      if (dataType === 'onlending') {
        descricao = 'Repasse ref: ' + templateSubDescription;
        valor = 0 - item.value;
      } else if (dataType === 'revenue') {
        descricao = 'Comissão ref: ' + templateSubDescription;
        valor = 0 - item.value;
      } else if (dataType === 'items') {
        descricao = item.description + templateSubDescription;
        valor = item.value;
      }

      const {
        id_category_granatum: categoria_id,
        id_cost_center_granatum: centro_custo_lucro_id,
        id_suplier_client: pessoa_id,
      } = item;

      const tags = [{ id: 59943 }];

      return { categoria_id, centro_custo_lucro_id, descricao, tags, valor, pessoa_id };
    });
  }

  async postTransactions(invoiceReadyToPost: GranatumTransactionPostDTO): Promise<any> {
    return await this.granatumTransactionsRepository.post(invoiceReadyToPost);
  }
}

import {
  GranatumItemsPostDTO,
  GranatumTransactionPostDTO,
} from 'src/3party-client/granatum/granatum-transactions/dtos/granatum-transactions.dtos';
import * as crypto from 'node:crypto';

export class GranatumTransactionsMock {
  allItems: GranatumTransactionPostDTO[] = [];

  async getAll() {
    return this.allItems;
  }

  async post(data: GranatumTransactionPostDTO): Promise<{ status: any; id: any }> {
    const id = crypto.randomInt(1, 1000);
    const newData = { id, ...data };
    this.allItems.push(newData);
    return { status: 201, id };
  }

  errorHunter(data: GranatumTransactionPostDTO) {
    const motherMessageError: any = {};
    let childMessageError: any = {};

    const childPost: GranatumItemsPostDTO[] = data.itens_adicionais;

    if (childPost.length > 0) {
      childMessageError = this.errorItemsHunter(childPost);
    }

    console.log(data);
    if (!data.conta_id || typeof data.conta_id !== 'number') {
      motherMessageError.conta_id = `conta_id is not a number or is not defined >> input: ${
        data.data_vencimento || 'undefined'
      }`;
    }
    if (!data.data_vencimento || typeof data.data_vencimento !== 'string') {
      motherMessageError.data_vencimento = `data_vencimento must be defined as string >> input: ${data.data_vencimento}`;
    }

    if (!data.categoria_id || typeof data.categoria_id !== 'number') {
      motherMessageError.categoria_id = `categoria_id is not a number or is not defined`;
    }

    if (data.descricao.length < 5 || data.descricao.length > 300) {
      motherMessageError.descricao = `description must have between 5 and 300 characters >> input: ${
        data.data_vencimento || 'undefined'
      }`;
    }

    if (!data.centro_custo_lucro_id || typeof data.centro_custo_lucro_id !== 'number') {
      console.warn(`Are you sure that transactions does not have a costCenter?`);
    }

    return JSON.stringify({ motherMessageError, childMessageError }, null, 2);
  }

  errorItemsHunter(data: GranatumItemsPostDTO[]) {
    const itemsError = data.map((item, index) => {
      let indexHasError: boolean = false;
      const messageError: any = {};
      messageError.itemIndex = index;

      if (!item.valor || typeof item.valor !== 'number' || item.valor === 0) {
        messageError.descricao = `value must not be 0, undefined or not int   >> input: ${item.valor || 'undefined'}`;
        indexHasError = true;
      }

      if (!item.categoria_id || typeof item.categoria_id !== 'number') {
        messageError.categoria_id = `categoria_id is not a number or is not defined`;
        indexHasError = true;
      }

      if (!item.centro_custo_lucro_id || typeof item.centro_custo_lucro_id !== 'number') {
        console.warn(`Are you sure that transactions does not have a costCenter?`);
      }

      messageError.indexHasError = indexHasError;
      return { ...messageError };
    });

    return itemsError;
  }
}

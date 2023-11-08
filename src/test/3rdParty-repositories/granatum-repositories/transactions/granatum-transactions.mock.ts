import * as crypto from 'node:crypto';
import {
  GranatumItemsPostDTO,
  GranatumTransactionPostDTO,
} from 'src/3party-client/granatum/granatum-transactions/dtos/granatum-transactions.dtos';
import { ChildMessageError, RootErrorMessage } from './dtos/message-error.dtos';

export class GranatumTransactionsMock {
  allItems: GranatumTransactionPostDTO[] = [];

  async getAll() {
    return this.allItems;
  }

  async post(data: GranatumTransactionPostDTO): Promise<{ status: any; id: any }> {
    const { formatHasError, motherMessageError, childMessageError } = this.errorHunter(data);
    if (formatHasError) {
      throw new Error(JSON.stringify({ motherMessageError, childMessageError }, null, 2));
    }
    const id = crypto.randomInt(1, 100);
    const newData = { id, ...data };
    this.allItems.push(newData);
    return { status: 201, id };
  }

  errorHunter(data: GranatumTransactionPostDTO): RootErrorMessage {
    let formatHasError: boolean = false;
    const motherMessageError: any = {};
    let childMessageError: any = {};

    const childPost: GranatumItemsPostDTO[] = data.itens_adicionais;

    if (childPost.length > 0) {
      childMessageError = this.errorItemsHunter(childPost);
      if (childMessageError.length > 0) {
        formatHasError = true;
      }
    }

    if (!data.conta_id || typeof data.conta_id !== 'number') {
      motherMessageError.conta_id = `conta_id is not a number or is not defined >> input: ${
        data.data_vencimento || 'undefined'
      }`;
      formatHasError = true;
    }
    if (!data.data_vencimento || typeof data.data_vencimento !== 'string') {
      motherMessageError.data_vencimento = `data_vencimento must be defined as string >> input: ${data.data_vencimento}`;
      formatHasError = true;
    }

    if (!data.categoria_id || typeof data.categoria_id !== 'number') {
      motherMessageError.categoria_id = `categoria_id is not a number or is not defined`;
      formatHasError = true;
    }

    if (data.descricao.length < 5 || data.descricao.length > 300) {
      motherMessageError.descricao = `description must have between 5 and 300 characters >> input: ${
        data.data_vencimento || 'undefined'
      }`;
      formatHasError = true;
    }

    if (!data.centro_custo_lucro_id || typeof data.centro_custo_lucro_id !== 'number') {
      console.warn(`Are you sure that transactions does not have a costCenter?`);
    }

    const messageError = { formatHasError, motherMessageError, childMessageError };
    return messageError;
  }

  errorItemsHunter(data: GranatumItemsPostDTO[]): ChildMessageError[] {
    const itemsError = data
      .map((item, index) => {
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
      })
      .filter((index) => index.indexHasError);

    return itemsError;
  }
}

export const granatumPostToFailMock: GranatumTransactionPostDTO = {
  descricao: 'oi',
  categoria_id: undefined,
  valor: 0,
  conta_id: undefined,
  data_vencimento: '',
  itens_adicionais: [
    {
      tags: [],
      descricao: '',
      categoria_id: undefined,
      valor: 0,
    },
  ],
};

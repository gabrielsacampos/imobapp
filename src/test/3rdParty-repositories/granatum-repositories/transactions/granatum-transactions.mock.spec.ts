import {
  GranatumItemsPostDTO,
  GranatumTransactionPostDTO,
} from 'src/3party-client/granatum/granatum-transactions/dtos/granatum-transactions.dtos';
import { GranatumTransactionsMock } from './granatum-transactions.mock';

describe('GranatumTransactionsMock', () => {
  const mock = new GranatumTransactionsMock();

  it('mock should be defined', () => {
    expect(mock).toBeDefined();
  });

  it('erroHunter should get erros from each proprety on post data', () => {
    const aditionalItems: GranatumItemsPostDTO[] = [
      {
        tags: [],
        descricao: '',
        categoria_id: undefined,
        valor: 0,
      },
    ];
    const dataInput: GranatumTransactionPostDTO = {
      descricao: 'oi',
      categoria_id: undefined,
      valor: 0,
      conta_id: undefined,
      data_vencimento: '',
      itens_adicionais: aditionalItems,
    };
    const expected = {
      motherMessageError: {
        conta_id: 'conta_id is not a number or is not defined >> input: undefined',
        data_vencimento: 'data_vencimento must be defined as string >> input: ',
        categoria_id: 'categoria_id is not a number or is not defined',
        descricao: 'description must have between 5 and 300 characters >> input: undefined',
      },
      childMessageError: [
        {
          itemIndex: 0,
          descricao: 'value must not be 0, undefined or not int   >> input: undefined',
          categoria_id: 'categoria_id is not a number or is not defined',
          indexHasError: true,
        },
      ],
    };
    const result = mock.errorHunter(dataInput);
    expect(result).toEqual(JSON.stringify(expected, null, 2));
  });

  it('erroItemsHunter should get erros from each aditional item from post data', () => {
    const aditionalItems: GranatumItemsPostDTO[] = [
      {
        tags: [],
        descricao: '',
        categoria_id: undefined,
        valor: 0,
      },
      {
        tags: [],
        descricao: 'dasdadsasd',
        categoria_id: 123,
        valor: 100,
      },
    ];

    const result = mock.errorItemsHunter(aditionalItems);
    expect(result).toEqual([
      {
        itemIndex: 0,
        descricao: 'value must not be 0, undefined or not int   >> input: undefined',
        categoria_id: 'categoria_id is not a number or is not defined',
        indexHasError: true,
      },
      {
        itemIndex: 1,
        indexHasError: false,
      },
    ]);
  });
});

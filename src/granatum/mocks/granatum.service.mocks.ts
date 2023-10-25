import { GroupedItemsDTO } from '../dtos/granatum-service.dtos';

export const getOnlendingsMock = [
  {
    beneficiary_cpf: null,
    beneficiary_cnpj: '11.000.000/0000-11',
    onlending_value: 754.28,
    unity: '1501',
    name: 'Eko Home Club',
    block: 'Ipê',
    account_credit: 'Inter',
  },
  {
    beneficiary_cpf: '002.002.002-02',
    beneficiary_cnpj: null,
    onlending_value: 884,
    unity: '1104',
    name: 'Residencial Maurício de Nassau',
    block: 'A',
    account_credit: 'Inter',
  },
];
export const groupItemsFromDbMock: GroupedItemsDTO[] = [
  {
    type: 'invoice',
    count_invoices: 2,
    paid_at: '2023-07-05T00:00:00.000Z',
    credit_at: '2023-07-07T00:00:00.000Z',
    account_credit: 'Inter',
    description: 'Cobranças Imobzi',
    items: [
      {
        account_credit: 'Inter',
        behavior: 'other',
        invoice_id: 'aad6228c1b2911eea347a7b9fa053b0f',
        description: 'Aluguel ref. 01/06/2023 a 30/06/2023',
        value: 1130,
        paid_at: '2023-07-05T00:00:00.000Z',
        credit_at: '2023-07-07T00:00:00.000Z',
        unity: '2202',
        block: 'Figueiras',
        building: 'Eko Home Club',
        paid_manual: null,
      },
      {
        account_credit: 'Inter',
        behavior: 'other',
        invoice_id: 'aad62280000911eea347a7b9fa053b0f',
        description: 'Aluguel ref. 01/06/2023 a 30/06/2023',
        value: 1130,
        paid_at: '2023-07-05T00:00:00.000Z',
        credit_at: '2023-07-07T00:00:00.000Z',
        unity: '1102',
        block: 'Jacarandá',
        building: 'Eko Home Club',
        paid_manual: null,
      },
    ],
  },
];

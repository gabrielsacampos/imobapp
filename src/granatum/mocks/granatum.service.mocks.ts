import { GroupItems } from '../interfaces/granatum.service.interface';

export const groupItemsFromDbMock: GroupItems[] = [
  {
    count_invoices: 2,
    paid_at: '2023-07-05T00:00:00.000Z',
    credit_at: '2023-07-07T00:00:00.000Z',
    account_credit: 'Inter',
    description: 'Cobranças Imobzi',
    items: [
      {
        account_credit: 'Inter',
        id_imobzi: 'aad6228c1b2911eea347a7b9fa053b0f',
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
        id_imobzi: 'aad62280000911eea347a7b9fa053b0f',
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

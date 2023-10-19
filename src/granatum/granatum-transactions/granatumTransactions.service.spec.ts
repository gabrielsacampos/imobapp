import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { GranatumTransactionsService } from './granatumTransactions.service';

const grouped = {
  count_invoices: 2,
  sum_interest_value: 12,
  paid_at: '2023-01-01',
  credit_at: '2023-01-01',
  account_credit: 'Inter',
  bank_fee_value: 6.4,
  description: 'Cobranças Imobzi',
  items: [
    {
      id_invoice: 'cde3456',
      description: 'Iptu',
      value: 200,
      block: 'Figueiras',
      building: 'Eko Home Club',
      id_category_granatum: 1843892,
      id_cost_center_granatum: 244546,
    },
    {
      id_invoice: 'fgt145',
      description: 'Aluguel',
      value: 800,
      property_unity: '123',
      block: 'Ipê',
      building: 'Eko Home Club',
      id_category_granatum: 1846027,
      id_cost_center_granatum: 244547,
    },
    {
      id_invoice: 'fgt145',
      description: 'Iptu',
      value: 200,
      property_unity: '123',
      block: 'Ipê',
      building: 'Eko Home Club',
      id_category_granatum: 1843892,
      id_cost_center_granatum: 244547,
    },
  ],
  id_account_granatum: 103796,
};

describe('GranatumTransactionsService', () => {
  let granatumTransactionsService: GranatumTransactionsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [GranatumTransactionsService],
    }).compile();
    granatumTransactionsService = moduleRef.get<GranatumTransactionsService>(GranatumTransactionsService);
  });

  test('formatDataToPostTransaction', async () => {
    const result = granatumTransactionsService.templateTransactions(grouped);
    console.log(JSON.stringify(result, null, 2));
  });
});

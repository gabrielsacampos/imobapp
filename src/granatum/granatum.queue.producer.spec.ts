import { BullModule } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from 'src/shared.module';
import { GranatumQueueProducer } from './granatum.queue.producer';

const invoicesWithItems = [
  {
    account_credit: 'Inter',
    paid_manual: true,
    id_imobzi: 'abc123',
    credit_at: '2023-01-01',
    paid_at: '2023-01-01',
    bank_fee_value: 3.2,
    fee: 150,
    total_value: 1000,
    lease_code: '23',
    unity: '123',
    block: 'Ipê',
    building_name: 'Eko Home Club',
    interest_value: 10,
    items: [],
  },
  {
    account_credit: 'Inter',
    paid_manual: false,
    interest_value: 11,
    id_imobzi: 'cde3456',
    credit_at: '2023-01-01',
    paid_at: '2023-01-01',
    bank_fee_value: 3.2,
    fee: 150,
    total_value: 1000,
    lease_code: '23',
    unity: '123',
    block: 'Figueiras',
    building_name: 'Eko Home Club',
    items: [
      {
        id_invoice: 'cde3456',
        description: 'Iptu',
        value: 200,
        block: 'Figueiras',
        building_name: 'Eko Home Club',
      },
    ],
  },
  {
    paid_manual: false,
    account_credit: 'Inter',
    interest_value: 1,
    id_imobzi: 'fgt145',
    credit_at: '2023-01-01',
    paid_at: '2023-01-01',
    bank_fee_value: 3.2,
    fee: 150,
    total_value: 1000,
    lease_code: '23',
    unity: '123',
    block: 'Ipê',
    building_name: 'Eko Home Club',
    items: [
      {
        id_invoice: 'fgt145',
        description: 'Aluguel',
        value: 800,
        property_unity: '123',
        block: 'Ipê',
        building: 'Eko Home Club',
      },
      {
        id_invoice: 'fgt145',
        description: 'Iptu',
        value: 200,
        property_unity: '123',
        block: 'Ipê',
        building: 'Eko Home Club',
      },
    ],
  },
];

describe('GranatumQueueProducer', () => {
  let granatumQueueProducer: GranatumQueueProducer;

  beforeEach(async () => {
    const granatumModule: TestingModule = await Test.createTestingModule({
      imports: [
        SharedModule,
        BullModule.forRoot({
          url: process.env.redis_url,
        }),
        BullModule.registerQueue({
          name: 'GranatumQueue',
        }),
      ],
      providers: [GranatumQueueProducer],
    }).compile();

    granatumQueueProducer = granatumModule.get<GranatumQueueProducer>(GranatumQueueProducer);
  });

  test('should be defined', () => {
    expect(granatumQueueProducer).toBeDefined();
  });

  test('should be defined', () => {
    const result = granatumQueueProducer.syncImobziGranatumTransactions(invoicesWithItems);
    console.log(JSON.stringify(result, null, 2));
  });
});

import { BullModule } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesModule } from 'src/repository/modules/invoices/invoices.module';
import { InvoicesService } from 'src/repository/modules/invoices/invoices.service';
import { SharedModule } from '../shared.module';
import { GranatumModule } from './granatum.module';
import { GranatumQueueProducer } from './granatum.queue.producer';
import { GranatumService } from './granatum.service';
import { getItemsPaidMock } from '../repository/modules/invoices/mocks/invoices.queries.mocks';

describe('GranatumTransactionsService', () => {
  let granatumService: GranatumService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        BullModule.forRoot({
          url: process.env.redis_url,
        }),
        BullModule.registerQueue({
          name: 'GranatumQueue',
        }),
        SharedModule,
        GranatumModule,
        InvoicesModule,
      ],
      providers: [GranatumService, GranatumQueueProducer, InvoicesService],
    }).compile();

    granatumService = moduleRef.get<GranatumService>(GranatumService);
  });

  test('', async () => {
    const result = await granatumService.groupItemsFromDb(getItemsPaidMock);
    console.log(JSON.stringify(result, null, 2));
  });
});

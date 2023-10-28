import { BullModule } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesModule } from 'src/repository/invoices/invoices.module';
import { InvoicesService } from 'src/repository/invoices/invoices.service';
import { SharedModule } from '../shared.module';
import { GranatumModule } from './granatum.module';
import { QueueGranatumProducer } from './granatum.queue.producer';
import { GranatumService } from './granatum.service';
import { getRevenuesMock } from './granatum.service.mocks';
import { getOnlendingsMock } from './mocks/granatum.service.mocks';

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
      providers: [GranatumService, QueueGranatumProducer, InvoicesService],
    }).compile();

    granatumService = moduleRef.get<GranatumService>(GranatumService);
  });

  test('', async () => {
    const result = granatumService.groupRevenuesFromDb(getRevenuesMock);
    console.log(JSON.stringify(result));
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { GranatumService } from 'src/3party-client/granatum/granatum.service';
import { ModulesServices } from 'src/modules/modules.service';
import { FetchDb } from './interfaces/imobziQueue.interface';

import { QueueGranatumProducer } from './queue-granatum.producer';
import { QueueGranatumService } from './queue-granatum.service';

describe('QueueGranatumService', () => {
  let queueGranatumService: QueueGranatumService;
  let queueGranatumProducerMock: { produce: jest.Mock };
  let granatumServiceMock: {
    invoices: { paidInvoices: jest.Mock; predictedOnlendings: jest.Mock; predictedRevenues: jest.Mock };
  };
  let repositoryServiceMock: {
    invoices: {
      paidInvoices: jest.Mock;
      predictedOnlendings: jest.Mock;
      predictedRevenues: jest.Mock;
    };
  };

  beforeEach(async () => {
    queueGranatumProducerMock = { produce: jest.fn() };
    granatumServiceMock = {
      invoices: {
        paidInvoices: jest.fn(),
        predictedOnlendings: jest.fn(),
        predictedRevenues: jest.fn(),
      },
    };
    repositoryServiceMock = {
      invoices: {
        paidInvoices: jest.fn(),
        predictedOnlendings: jest.fn(),
        predictedRevenues: jest.fn(),
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueueGranatumService,
        { provide: QueueGranatumProducer, useValue: queueGranatumProducerMock },
        { provide: GranatumService, useValue: granatumServiceMock },
        { provide: ModulesServices, useValue: repositoryServiceMock },
      ],
    }).compile();

    queueGranatumService = module.get<QueueGranatumService>(QueueGranatumService);
  });

  it('queueProducer should be defined', () => {
    expect(queueGranatumService).toBeDefined();
  });

  it('all methods inside are called', async () => {
    const dataInput: FetchDb = {
      payment_start_at: '2023-01-01',
      payment_end_at: '2023-01-31',
      invoice: true,
      onlending: true,
      revenue: true,
    };
    await queueGranatumService.fetchDb(dataInput);
    expect(repositoryServiceMock.invoices.paidInvoices).toHaveBeenCalled();
    expect(repositoryServiceMock.invoices.predictedOnlendings).toHaveBeenCalled();
    expect(repositoryServiceMock.invoices.predictedRevenues).toHaveBeenCalled();
    expect(queueGranatumProducerMock.produce).toHaveBeenCalled();
  });
});

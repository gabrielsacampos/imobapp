import { Test, TestingModule } from '@nestjs/testing';
import { GranatumService } from 'src/3party-client/granatum/granatum.service';
import { RepositoryService } from 'src/repository/repository.service';
import { QueueGranatumProducer } from './queue-granatum.producer';
import { QueueGranatumService } from './queue-granatum.service';

describe('QueueGranatumService', () => {
  let queueGranatumService: QueueGranatumService;
  let queueGranatumProducerMock: { produce: jest.Mock };
  let granatumServiceMock: {
    groupInvoices: jest.Mock;
    groupOnlendings: jest.Mock;
    groupRevenues: jest.Mock;
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
      groupInvoices: jest.fn(),
      groupOnlendings: jest.fn(),
      groupRevenues: jest.fn(),
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
        { provide: RepositoryService, useValue: repositoryServiceMock },
      ],
    }).compile();

    queueGranatumService = module.get<QueueGranatumService>(QueueGranatumService);
  });

  it('queueProducer should be defined', () => {
    expect(queueGranatumService).toBeDefined();
  });

  it('all methods inside are called', async () => {
    const dataInput = { payment_start_at: '2023-01-01', payment_end_at: '2023-01-31' };
    await queueGranatumService.fetchDb(dataInput);
    expect(granatumServiceMock.groupInvoices).toHaveBeenCalled();
    expect(granatumServiceMock.groupOnlendings).toHaveBeenCalled();
    expect(granatumServiceMock.groupRevenues).toHaveBeenCalled();
    expect(queueGranatumProducerMock.produce).toHaveBeenCalled();
    expect(repositoryServiceMock.invoices.paidInvoices).toHaveBeenCalled();
    expect(repositoryServiceMock.invoices.predictedOnlendings).toHaveBeenCalled();
    expect(repositoryServiceMock.invoices.predictedRevenues).toHaveBeenCalled();
  });
});

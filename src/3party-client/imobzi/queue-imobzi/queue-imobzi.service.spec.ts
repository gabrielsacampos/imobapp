import { BullModule, getQueueToken } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { ModulesModule } from 'src/modules/modules.module';
import { ImobziModule } from '../imobzi.module';
import { QueueImobziProducer } from './queue-imobzi.producer';
import { QueueImobziService } from './queue-imobzi.service';

describe('QueueImobziService', () => {
  let service: QueueImobziService;
  let queueMock: { get: jest.Mock };

  beforeEach(async () => {
    queueMock = { get: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ModulesModule,
        ImobziModule,
        BullModule.registerQueue({
          name: 'ImobziQueue',
        }),
      ],
      providers: [QueueImobziService, QueueImobziProducer],
    })
      .overrideProvider(getQueueToken('ImobziQueue'))
      .useValue(queueMock)
      .compile();

    service = module.get<QueueImobziService>(QueueImobziService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

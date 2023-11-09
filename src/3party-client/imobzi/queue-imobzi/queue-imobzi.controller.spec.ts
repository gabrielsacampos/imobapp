import { BullModule, getQueueToken } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { ModulesModule } from 'src/modules/modules.module';
import { ImobziModule } from '../imobzi.module';
import { QueueImobziController } from './queue-imobzi.controller';
import { QueueImobziProducer } from './queue-imobzi.producer';
import { QueueImobziService } from './queue-imobzi.service';

describe('QueueImobziController', () => {
  let controller: QueueImobziController;
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
      controllers: [QueueImobziController],
      providers: [QueueImobziService, QueueImobziProducer],
    })
      .overrideProvider(getQueueToken('ImobziQueue'))
      .useValue(queueMock)
      .compile();

    controller = module.get<QueueImobziController>(QueueImobziController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

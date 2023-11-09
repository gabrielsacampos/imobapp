import { BullModule, getQueueToken } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { ModulesModule } from 'src/modules/modules.module';
import { GranatumModule } from '../granatum.module';
import { GranatumService } from '../granatum.service';
import { QueueGranatumController } from './queue-granatum.controller';
import { QueueGranatumProducer } from './queue-granatum.producer';
import { QueueGranatumService } from './queue-granatum.service';

describe('QueueGranatumController', () => {
  let controller: QueueGranatumController;
  let queueMock: { get: jest.Mock };

  beforeEach(async () => {
    queueMock = { get: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        GranatumModule,
        ModulesModule,
        BullModule.registerQueue({
          name: 'GranatumQueue',
        }),
      ],
      controllers: [QueueGranatumController],
      providers: [QueueGranatumService, QueueGranatumProducer, GranatumService],
    })
      .overrideProvider(getQueueToken('GranatumQueue'))
      .useValue(queueMock)
      .compile();

    controller = module.get<QueueGranatumController>(QueueGranatumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

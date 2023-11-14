import { BullModule, getQueueToken } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { ModulesModule } from 'src/modules/modules.module';
import { ImobziController } from './imobzi.controllers';
import { ImobziModule } from './imobzi.module';
import { QueueImobziProducer } from './queue-imobzi.producer';

describe('ImobziController', () => {
  let controller: ImobziController;
  let queueMock: { add: jest.Mock };
  beforeEach(async () => {
    queueMock = { add: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ModulesModule,
        ImobziModule,
        BullModule.registerQueue({
          name: 'ImobziQueue',
        }),
      ],
      controllers: [ImobziController],
      providers: [QueueImobziProducer],
    })
      .overrideProvider(getQueueToken('ImobziQueue'))
      .useValue(queueMock)
      .compile();

    controller = module.get<ImobziController>(ImobziController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

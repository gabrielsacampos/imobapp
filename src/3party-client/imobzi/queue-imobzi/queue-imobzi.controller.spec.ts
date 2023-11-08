import { Test, TestingModule } from '@nestjs/testing';
import { QueueImobziController } from './queue-imobzi.controller';
import { QueueImobziService } from './queue-imobzi.service';

describe('QueueImobziController', () => {
  let controller: QueueImobziController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueueImobziController],
      providers: [QueueImobziService],
    }).compile();

    controller = module.get<QueueImobziController>(QueueImobziController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

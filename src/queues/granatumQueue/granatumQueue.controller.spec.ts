import { Test, TestingModule } from '@nestjs/testing';
import { GranatumQueueController } from './granatumQueue.controller';
import { GranatumQueueService } from './granatumQueue.service';

describe('GranatumQueueController', () => {
  let controller: GranatumQueueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GranatumQueueController],
      providers: [GranatumQueueService],
    }).compile();

    controller = module.get<GranatumQueueController>(GranatumQueueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

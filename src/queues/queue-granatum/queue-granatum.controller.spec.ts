import { Test, TestingModule } from '@nestjs/testing';
import { QueueGranatumController } from './queue-granatum.controller';
import { QueueGranatumService } from './queue-granatum.service';

describe('QueueGranatumController', () => {
  let controller: QueueGranatumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueueGranatumController],
      providers: [QueueGranatumService],
    }).compile();

    controller = module.get<QueueGranatumController>(QueueGranatumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

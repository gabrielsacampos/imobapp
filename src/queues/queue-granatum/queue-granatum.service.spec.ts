import { Test, TestingModule } from '@nestjs/testing';
import { QueueGranatumService } from './queue-granatum.service';

describe('QueueGranatumService', () => {
  let service: QueueGranatumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueueGranatumService],
    }).compile();

    service = module.get<QueueGranatumService>(QueueGranatumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

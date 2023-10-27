import { Test, TestingModule } from '@nestjs/testing';
import { GranatumQueueService } from './granatumQueue.service';

describe('GranatumQueueService', () => {
  let service: GranatumQueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GranatumQueueService],
    }).compile();

    service = module.get<GranatumQueueService>(GranatumQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

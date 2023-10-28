import { Test, TestingModule } from '@nestjs/testing';
import { QueueImobziService } from './queue-imobzi.service';

describe('QueueImobziService', () => {
  let service: QueueImobziService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueueImobziService],
    }).compile();

    service = module.get<QueueImobziService>(QueueImobziService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { FailedQueueJobsService } from './failed-queue-jobs.service';

describe('FailedQueueJobsService', () => {
  let service: FailedQueueJobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FailedQueueJobsService],
    }).compile();

    service = module.get<FailedQueueJobsService>(FailedQueueJobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

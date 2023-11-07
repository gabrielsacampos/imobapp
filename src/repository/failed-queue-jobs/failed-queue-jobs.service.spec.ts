import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { FailedQueueJobsService } from './failed-queue-jobs.service';

describe('FailedQueueJobsService', () => {
  let service: FailedQueueJobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FailedQueueJobsService, PrismaService],
    }).compile();

    service = module.get<FailedQueueJobsService>(FailedQueueJobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

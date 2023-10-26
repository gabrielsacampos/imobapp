import { Test, TestingModule } from '@nestjs/testing';
import { FailedQueueJobsController } from './failed-queue-jobs.controller';
import { FailedQueueJobsService } from './failed-queue-jobs.service';

describe('FailedQueueJobsController', () => {
  let controller: FailedQueueJobsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FailedQueueJobsController],
      providers: [FailedQueueJobsService],
    }).compile();

    controller = module.get<FailedQueueJobsController>(FailedQueueJobsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

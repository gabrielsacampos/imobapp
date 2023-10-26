import { Controller } from '@nestjs/common';
import { FailedQueueJobsService } from './failed-queue-jobs.service';

@Controller('failed-queue-jobs')
export class FailedQueueJobsController {
  constructor(private readonly failedQueueJobsService: FailedQueueJobsService) {}
}

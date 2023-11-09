import { PartialType } from '@nestjs/mapped-types';
import { CreateFailedQueueJobs } from './create-failed-queue-jobs.dtos';

export class UpdateFailedQueueJobs extends PartialType(CreateFailedQueueJobs) {}

import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { LoggerQueueRepository } from './logger-queue.repository';

@Injectable()
export class LoggerQueueService {
  constructor(private readonly LoggerQueueRepository: LoggerQueueRepository) { }

  async handle(error: Error, job: Job<any>) {
    await this.LoggerQueueRepository.storeQueueError({
      data: job.data,
      id: job.id.toString(),
      name: job.name,
      queue: job.queue.name,
      error: error.toString(),
    });
  }
}

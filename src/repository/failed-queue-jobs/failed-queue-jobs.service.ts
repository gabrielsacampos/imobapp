import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { PrismaService } from 'src/prisma-client/prisma.service';

@Injectable()
export class FailedQueueJobsService {
  constructor(private readonly prisma: PrismaService) {}

  async handleError(error: Error, job?: Job) {
    try {
      const errorMessage = error.message;
      const errorStack = error.stack;

      const jobJson = JSON.stringify(job.data);
      const redisKey = job.id?.toString();
      const queue = job.queue?.name;
      const jobName = job.name || null;
      const status = await job.getState();

      await this.prisma.failedQueueJob.create({
        data: {
          job: jobJson,
          redis_key: redisKey,
          error_message: errorMessage,
          error_stack: errorStack,
          job_name: jobName,
          status,
          queue,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

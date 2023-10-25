import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { GroupedItemsDTO, GroupedOnlendingsDTO } from './dtos/granatum-service.dtos';
import { GranatumQueueJobs } from './granatum.queue.jobs';

@Processor('GranatumQueue')
export class GranatumQueueConsumer {
  constructor(
    private readonly prisma: PrismaService,
    private readonly granatumQueueJobs: GranatumQueueJobs,
  ) {}

  @Process('sync')
  async syncInvoices(job: Job<GroupedItemsDTO | GroupedOnlendingsDTO>): Promise<any> {
    const data = job.data;
    const dataWithGranatumIds = await this.granatumQueueJobs.setGranatumIds(data);
    const dataFormated = this.granatumQueueJobs.formatInvoiceItemsToPost(dataWithGranatumIds);

    await this.granatumQueueJobs.postTransaction(dataFormated);
  }

  async handlQueueError(error: { message: string }, job: Job) {
    const errorMessage = error.message;
    const jobJson = job.toJSON();
    const redisKey = jobJson.id.toString();
    await this.prisma.failedQueueJob.create({
      data: { job: jobJson.data, queue: 'granatum_queue', redis_key: redisKey, error_message: errorMessage },
    });
    throw new Error(`${errorMessage}`);
  }
}

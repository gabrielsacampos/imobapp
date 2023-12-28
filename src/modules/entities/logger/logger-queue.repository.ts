import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';

import { Logger } from './entities.ts/logger-queue.entity';

@Injectable()
export class LoggerQueueRepository {
  constructor(private readonly prisma: PrismaService) { }

  async storeQueueError(error: Logger) {
    return;
  }
}

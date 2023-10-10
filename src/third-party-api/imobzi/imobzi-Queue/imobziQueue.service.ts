import { Injectable } from '@nestjs/common';
import { ImobziQueueProducer } from './imobziQueue.producer';

@Injectable()
export class ImobziQueueService {
  constructor(private readonly imobziQueue: ImobziQueueProducer) {}

  async updateEntities() {
    await this.imobziQueue.verifyEntitiesToUpdate();
  }

  async runQueue() {
    await this.updateEntities();
  }
}

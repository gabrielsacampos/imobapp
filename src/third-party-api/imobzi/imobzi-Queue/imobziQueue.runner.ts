import { NestFactory } from '@nestjs/core';
import { ImobziQueueModule } from './imobziQueue.module';
import { ImobziQueueService } from './imobziQueue.service';

async function bootstrap() {
  const app = await NestFactory.create(ImobziQueueModule);
  await app.listen(9999);

  async function queueRunner() {
    let imobziQueue: ImobziQueueService;
    await imobziQueue.updateEntities();
  }

//   queueRunner();
}
bootstrap();

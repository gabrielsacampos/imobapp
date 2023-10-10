import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImobziQueueModule } from './third-party-api/imobzi/imobzi-Queue/imobziQueue.module';
import { ImobziModule } from './third-party-api/imobzi/imobzi.module';
import { SharedModule } from './third-party-api/shared.module';

@Module({
  imports: [ImobziModule, ImobziQueueModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

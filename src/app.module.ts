import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImobziQueueModule } from './third-party-api/imobzi/imobzi-Queue/imobziQueue.module';
import { ImobziModule } from './third-party-api/imobzi/imobzi.module';
import { SharedModule } from './third-party-api/shared.module';
import { GranatumModule } from './third-party-api/granatum/granatum.module';

@Module({
  imports: [ImobziModule, ImobziQueueModule, SharedModule, GranatumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

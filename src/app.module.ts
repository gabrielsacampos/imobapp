import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImobziController } from './third-party-api/imobzi/imobzi.controllers';
import { ImobziModule } from './third-party-api/imobzi/imobzi.module';
import { SharedModule } from './third-party-api/shared.module';

@Module({
  imports: [ImobziModule, SharedModule],
  controllers: [AppController, ImobziController],
  providers: [AppService],
})
export class AppModule {}

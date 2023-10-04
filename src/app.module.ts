import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImobziController } from './third-party-api/imobzi/imobzi.controllers';
import { ImobziModule } from './third-party-api/imobzi/imobzi.module';

@Module({
  imports: [ImobziModule],
  controllers: [AppController, ImobziController],
  providers: [AppService],
})
export class AppModule {}

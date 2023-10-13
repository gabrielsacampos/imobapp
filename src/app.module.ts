import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImobziModule } from './imobzi/imobzi.module';
import { SharedModule } from './shared.module';
import { GranatumModule } from './granatum/granatum.module';

@Module({
  imports: [ImobziModule, SharedModule, GranatumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

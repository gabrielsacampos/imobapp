import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@nestjs/platform-express';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from 'src/config/winston.config';
import { MyFunctionsModule } from 'src/my-usefull-functions/MyFunctions.module';
import { ImobziUrlParamModule } from './imobzi/imobzi-urls-params/imobziUrls.module';
import { ImobziParamService, ImobziUrlService } from './imobzi/imobzi-urls-params/imobziUrls.service';
import { MyFunctionsService } from 'src/my-usefull-functions/myFunctions.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [
    ImobziUrlParamModule,
    MyFunctionsModule,
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
    WinstonModule.forRoot(winstonConfig),
    BullModule.registerQueue({
      name: 'ImobziQueue',
    }),

    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    // BullBoardModule.forRoot({
    //   route: '/queues',
    //   adapter: ExpressAdapter,
    // }),
    // BullBoardModule.forFeature({
    //   name: 'ImobziQueue',
    //   adapter: BullApater,
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [ImobziUrlService, ImobziParamService, MyFunctionsService, PrismaService],
  exports: [HttpModule, BullModule, ImobziUrlService, ImobziParamService, MyFunctionsService, PrismaService],
})
export class SharedModule {}

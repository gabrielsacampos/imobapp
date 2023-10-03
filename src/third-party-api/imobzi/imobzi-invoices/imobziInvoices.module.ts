import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma.service';
import { MyFunctionsService } from 'src/my-usefull-functions/myFunctions.service';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';

import { ImobziInvoicesService } from './imobziInvoices.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
  ],
  providers: [MyFunctionsService, ImobziInvoicesService, PrismaService, ImobziUrlService, ImobziParamService],
  exports: [ImobziInvoicesService],
})
export class ImobziInvoicesModule {}

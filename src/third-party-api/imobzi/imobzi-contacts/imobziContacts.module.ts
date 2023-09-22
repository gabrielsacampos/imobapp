import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma.service';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { ImobziContactsProvider } from './imobziContacts.provider';
import { ImobziContactsService } from './ImobziContacts.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
  ],
  providers: [ImobziContactsProvider, ImobziContactsService, PrismaService, ImobziParamService, ImobziUrlService],
  exports: [ImobziContactsService],
})
export class ImobziContactsModule {}

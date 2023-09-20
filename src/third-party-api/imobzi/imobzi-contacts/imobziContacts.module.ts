import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma.service';
import { ImobziParam, ImobziUrl } from '../imobzi.urls';
import { ImobziContactsService } from './ImobziContacts.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
  ],
  providers: [ImobziContactsService, PrismaService, ImobziParam, ImobziUrl],
  exports: [ImobziContactsService],
})
export class ImobziContactsModule {}

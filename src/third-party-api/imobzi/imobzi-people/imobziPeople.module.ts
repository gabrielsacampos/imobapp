import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma.service';
import { ImobziParam, ImobziUrl } from '../imobzi.urls';
import { ImobziPeopleService } from './imobziPeople.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
  ],
  providers: [ImobziPeopleService, PrismaService, ImobziParam, ImobziUrl],
  exports: [ImobziPeopleService],
})
export class ImobziPeopleModule {}

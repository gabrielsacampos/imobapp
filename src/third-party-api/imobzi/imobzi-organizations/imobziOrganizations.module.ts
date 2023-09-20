import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma.service';
import { ImobziParam, ImobziUrl } from '../imobzi.urls';
import { ImobziOrganizationsService } from './imobziOrganizations.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
  ],
  providers: [ImobziOrganizationsService, PrismaService, ImobziParam, ImobziUrl],
  exports: [ImobziOrganizationsService],
})
export class ImobziOrganizationsModule {}

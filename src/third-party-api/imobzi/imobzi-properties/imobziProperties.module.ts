import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaModule } from 'src/database/prisma.module';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { ImobziUrlParamModule } from '../imobzi-urls-params/imobziUrls.module';
import { ImobziPropertiesService } from './imobziProperties.service';

@Module({
  imports: [
    PrismaModule,
    ImobziUrlParamModule,
    ConfigModule.forRoot(),
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
  ],
  providers: [ImobziPropertiesService, PrismaService, ImobziParamService, ImobziUrlService],
  exports: [ImobziPropertiesService],
})
export class ImobziPropertiesModule {}

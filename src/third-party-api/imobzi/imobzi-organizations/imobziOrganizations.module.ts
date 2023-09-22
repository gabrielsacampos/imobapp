import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { ImobziOrganizationsProvider } from './imobziOrganizations.provider';
import { ImobziOrganizationsService } from './imobziOrganizations.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
  ],
  providers: [ImobziOrganizationsProvider, ImobziOrganizationsService, ImobziParamService, ImobziUrlService],
  exports: [ImobziOrganizationsService],
})
export class ImobziOrganizationsModule {}

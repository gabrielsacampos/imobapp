import { Module } from '@nestjs/common';
import { SharedModule } from 'src/third-party-api/shared.module';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { ImobziOrganizationsService } from './imobziOrganizations.service';

@Module({
  imports: [SharedModule],
  providers: [ImobziOrganizationsService, ImobziUrlService, ImobziParamService],
  exports: [ImobziOrganizationsService],
})
export class ImobziOrganizationsModule {}

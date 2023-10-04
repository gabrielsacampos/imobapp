import { Module } from '@nestjs/common';
import { SharedModule } from 'src/third-party-api/shared.module';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { ImobziLeasesService } from './imobziLeases.service';

@Module({
  imports: [SharedModule],
  providers: [ImobziLeasesService, ImobziUrlService, ImobziParamService],
  exports: [ImobziLeasesService],
})
export class ImobziLeasesModule {}

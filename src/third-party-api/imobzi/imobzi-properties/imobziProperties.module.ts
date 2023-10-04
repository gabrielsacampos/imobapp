import { Module } from '@nestjs/common';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { ImobziPropertiesService } from './imobziProperties.service';
import { SharedModule } from 'src/third-party-api/shared.module';

@Module({
  imports: [SharedModule],
  providers: [ImobziPropertiesService, ImobziUrlService, ImobziParamService],
  exports: [ImobziPropertiesService],
})
export class ImobziPropertiesModule {}

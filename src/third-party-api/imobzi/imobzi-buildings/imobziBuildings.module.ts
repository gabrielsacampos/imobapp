import { Module } from '@nestjs/common';
import { SharedModule } from 'src/third-party-api/shared.module';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { ImobziBuildingsService } from './imobziBuildings.service';

@Module({
  imports: [SharedModule],
  providers: [ImobziBuildingsService, ImobziUrlService, ImobziParamService],
  exports: [ImobziBuildingsService],
})
export class ImobziBuildingsModule {}

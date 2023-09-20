import { Module } from '@nestjs/common';
import { ImobziUrlService, ImobziParamService } from './imobziUrls.service';

@Module({
  providers: [ImobziUrlService, ImobziParamService],
  exports: [ImobziParamService, ImobziUrlService],
})
export class ImobziUrlParamModule {}

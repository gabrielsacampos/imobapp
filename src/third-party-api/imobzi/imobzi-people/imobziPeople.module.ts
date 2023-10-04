import { Module } from '@nestjs/common';
import { SharedModule } from 'src/third-party-api/shared.module';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { ImobziPeopleService } from './imobziPeople.service';

@Module({
  imports: [SharedModule],
  providers: [ImobziPeopleService, ImobziUrlService, ImobziParamService],
  exports: [ImobziPeopleService],
})
export class ImobziPeopleModule {}

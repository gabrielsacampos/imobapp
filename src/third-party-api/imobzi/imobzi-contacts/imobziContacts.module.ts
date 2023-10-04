import { Module } from '@nestjs/common';
import { SharedModule } from 'src/third-party-api/shared.module';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { ImobziContactsService } from './ImobziContacts.service';

@Module({
  imports: [SharedModule],
  providers: [ImobziContactsService, ImobziUrlService, ImobziParamService],
  exports: [ImobziContactsService],
})
export class ImobziContactsModule {}

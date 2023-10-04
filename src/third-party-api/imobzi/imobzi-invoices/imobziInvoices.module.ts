import { Module } from '@nestjs/common';
import { MyFunctionsService } from 'src/my-usefull-functions/myFunctions.service';
import { SharedModule } from 'src/third-party-api/shared.module';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { ImobziInvoicesService } from './imobziInvoices.service';

@Module({
  imports: [SharedModule],
  providers: [MyFunctionsService, ImobziInvoicesService, ImobziUrlService, ImobziParamService],
  exports: [ImobziInvoicesService],
})
export class ImobziInvoicesModule {}

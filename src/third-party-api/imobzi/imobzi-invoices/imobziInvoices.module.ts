import { Module } from '@nestjs/common';
import { SharedModule } from 'src/third-party-api/shared.module';
import { ImobziInvoicesService } from './imobziInvoices.service';

@Module({
  imports: [SharedModule],
  providers: [ImobziInvoicesService],
  exports: [ImobziInvoicesService],
})
export class ImobziInvoicesModule {}

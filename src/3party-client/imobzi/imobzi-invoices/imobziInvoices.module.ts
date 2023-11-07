import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared.module';
import { ImobziInvoicesRepository } from './imobziInvoices.repository';
import { ImobziInvoicesService } from './imobziInvoices.service';

@Module({
  imports: [SharedModule],
  providers: [ImobziInvoicesService, ImobziInvoicesRepository],
  exports: [ImobziInvoicesService, ImobziInvoicesRepository],
})
export class ImobziInvoicesModule {}

import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared.module';
import { ImobziContactsService } from './imobziContacts.repository';

@Module({
  imports: [SharedModule],
  providers: [ImobziContactsService],
  exports: [ImobziContactsService],
})
export class ImobziContactsModule {}

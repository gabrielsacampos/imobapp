import { Module } from '@nestjs/common';
import { SharedModule } from 'src/third-party-api/shared.module';
import { ImobziContactsService } from './imobziContacts.service';

@Module({
  imports: [SharedModule],
  providers: [ImobziContactsService],
  exports: [ImobziContactsService],
})
export class ImobziContactsModule {}

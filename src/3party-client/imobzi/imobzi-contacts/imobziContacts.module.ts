import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared.module';
import { ImobziContactsRepository } from './imobziContacts.repository';

@Module({
  imports: [SharedModule],
  providers: [ImobziContactsRepository],
  exports: [ImobziContactsRepository],
})
export class ImobziContactsModule {}

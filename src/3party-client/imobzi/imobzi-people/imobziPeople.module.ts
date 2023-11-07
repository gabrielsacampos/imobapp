import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared.module';
import { ImobziPeopleRepository } from './imobziPeople.repository';
import { ImobziPeopleService } from './imobziPeople.service';

@Module({
  imports: [SharedModule],
  providers: [ImobziPeopleService, ImobziPeopleRepository],
  exports: [ImobziPeopleService, ImobziPeopleRepository],
})
export class ImobziPeopleModule {}

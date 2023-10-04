import { Module } from '@nestjs/common';
import { SharedModule } from 'src/third-party-api/shared.module';
import { ImobziPeopleService } from './imobziPeople.service';

@Module({
  imports: [SharedModule],
  providers: [ImobziPeopleService],
  exports: [ImobziPeopleService],
})
export class ImobziPeopleModule {}

import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared.module';
import { ImobziPeopleService } from './imobziPeople.service';

@Module({
  imports: [SharedModule],
  providers: [ImobziPeopleService],
  exports: [ImobziPeopleService],
})
export class ImobziPeopleModule {}

import { Injectable } from '@nestjs/common';
import { ImobziContactsService } from 'src/third-party-api/imobzi/imobzi-contacts/ImobziContacts.service';
import { ImobziPeopleService } from './imobzi-people/imobziPeople.service';

@Injectable()
export class ImobziService {
  constructor(
    private readonly imobziContactsService: ImobziContactsService,
    private readonly imobziPeopleService: ImobziPeopleService,
  ) {}

  async getContactsToUpdate() {
    return await this.imobziContactsService.getContactsToUpdate();
  }
}

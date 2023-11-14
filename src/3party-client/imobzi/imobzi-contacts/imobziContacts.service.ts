import { Injectable } from '@nestjs/common';
import { ContactDTO } from './dtos/imobziContacts.dtos';
import { ImobziContactsRepository } from './imobziContacts.repository';

@Injectable()
export class ImobziContactsService {
  constructor(private readonly imobziContactsRepository: ImobziContactsRepository) {}

  async getContacts(): Promise<{ organizations: ContactDTO[]; people: ContactDTO[] }> {
    const contacts = await this.imobziContactsRepository.getAll();
    const organizations = contacts.filter((contact) => contact.contact_type === 'organization');
    const people = contacts.filter((contact) => contact.contact_type === 'person');

    return { organizations, people };
  }
}

import { Injectable } from '@nestjs/common';
import { ImobziBuildingsRepository } from './imobzi-buildings/imobziBuildings.repository';
import { ImobziContactsRepository } from './imobzi-contacts/imobziContacts.repository';
import { ImobziInvoicesRepository } from './imobzi-invoices/imobziInvoices.repository';
import { ImobziLeasesRepository } from './imobzi-leases/imobziLeases.repository';
import { ImobziOrganizationsRepository } from './imobzi-organizations/imobziOrganizations.reposiotry';
import { ImobziPeopleRepository } from './imobzi-people/imobziPeople.repository';
import { ImobziPropertiesRepository } from './imobzi-properties/imobziProperties.repository';

@Injectable()
export class ImobziRepository {
  constructor(
    private readonly imobziContactsRepository: ImobziContactsRepository,
    private readonly imobziPeopleRepository: ImobziPeopleRepository,
    private readonly imobziOrganizationsRepository: ImobziOrganizationsRepository,
    private readonly imobziBuildingsRepository: ImobziBuildingsRepository,
    private readonly imobziPropertiesRepository: ImobziPropertiesRepository,
    private readonly imobziLeasesRepository: ImobziLeasesRepository,
    private readonly imobziInvoicesRepository: ImobziInvoicesRepository,
  ) {}

  contact = this.imobziContactsRepository;
  person = this.imobziPeopleRepository;
  organization = this.imobziOrganizationsRepository;
  building = this.imobziBuildingsRepository;
  property = this.imobziPropertiesRepository;
  lease = this.imobziLeasesRepository;
  invoice = this.imobziInvoicesRepository;
}

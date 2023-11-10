import { Injectable } from '@nestjs/common';
import { ImobziBuildingsService } from './imobzi-buildings/imobzi-buildings.service';
import { ImobziInvoicesService } from './imobzi-invoices/imobziInvoices.service';
import { ImobziLeasesService } from './imobzi-leases/imobziLeases.service';
import { ImobziOrganizationsService } from './imobzi-organizations/imobziOrganizations.service';
import { ImobziPeopleService } from './imobzi-people/imobziPeople.service';
import { ImobziPropertiesService } from './imobzi-properties/imobziProperties.service';

@Injectable()
export class ImobziService {
  constructor(
    private readonly imobziPeopleService: ImobziPeopleService,
    private readonly imobziOrganizationsService: ImobziOrganizationsService,
    private readonly imobziBuildingsService: ImobziBuildingsService,
    private readonly imobziPropertiesService: ImobziPropertiesService,
    private readonly imobziLeasesService: ImobziLeasesService,
    private readonly imobziInvoicesService: ImobziInvoicesService,
  ) {}

  person = this.imobziPeopleService;
  organization = this.imobziOrganizationsService;
  building = this.imobziBuildingsService;
  property = this.imobziPropertiesService;
  lease = this.imobziLeasesService;
  invoice = this.imobziInvoicesService;
}

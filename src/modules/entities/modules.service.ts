import { Injectable } from '@nestjs/common';
import { BuildingsService } from './buildings/buildings.service';
import { InvoicesService } from './invoices/invoices.service';
import { LeasesService } from './leases/leases.service';
import { OrganizationsService } from './organizations/organizations.service';
import { PeopleService } from './people/people.service';
import { PropertiesService } from './properties/properties.service';
import { UpdatesService } from './updates/updates.service';

@Injectable()
export class ModulesServices {
  constructor(
    private readonly updatesService: UpdatesService,
    private readonly peopleService: PeopleService,
    private readonly organizationsService: OrganizationsService,
    private readonly buildingsService: BuildingsService,
    private readonly leasesService: LeasesService,
    private readonly propertiesService: PropertiesService,
    private readonly invoicesService: InvoicesService,
  ) {}

  updates = this.updatesService;
  people = this.peopleService;
  organizations = this.organizationsService;
  buildings = this.buildingsService;
  leases = this.leasesService;
  invoices = this.invoicesService;
  properties = this.propertiesService;
}

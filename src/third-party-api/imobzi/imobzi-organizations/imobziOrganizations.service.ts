import { Injectable } from '@nestjs/common';
import { ImobziOrganizationsProvider } from './imobziOrganizations.provider';

@Injectable()
export class ImobziOrganizationsService {
  constructor(private readonly imobziOrganizationsProvider: ImobziOrganizationsProvider) {}

  getOrgDataToDb(id_org_imobzi: number | string): Promise<any> {
    return this.imobziOrganizationsProvider.getOrgMainDataFromImobzi(id_org_imobzi);
  }
}

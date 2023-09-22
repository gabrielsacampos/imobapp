import { Injectable } from '@nestjs/common';
import { ImobziOrganizationsProvider } from './imobziOrganizations.provider';

@Injectable()
export class ImobziOrganizationsService {
  constructor(private readonly imobziOrganizationsProvider: ImobziOrganizationsProvider) {}

  getOrgDataToDb(orgId: number): Promise<any> {
    return this.imobziOrganizationsProvider.getOrgMainDataFromImobzi(orgId);
  }
}

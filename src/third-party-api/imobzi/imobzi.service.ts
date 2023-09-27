import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ImobziProvider } from './imobzi.provider';

@Injectable()
export class ImobziService {
  constructor(
    private imobziProvider: ImobziProvider,
    private readonly httpService: HttpService,
  ) {}

  async updatePeople() {
    const peopleToUpdate = await this.imobziProvider.getContactsToUpdate();
  }

  async updateOrganizations() {}

  async updateProperties() {}

  async updateLeases() {}

  async updateInvoices() {}
}

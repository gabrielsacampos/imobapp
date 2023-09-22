import { Injectable } from '@nestjs/common';
import { ImobziPeopleProvider } from './imobziPeople.providers';

@Injectable()
export class ImobziPeopleService {
  constructor(private readonly imobziPeopleProvider: ImobziPeopleProvider) {}

  async getPersonDataToDb(personId: number): Promise<any> {
    return await this.imobziPeopleProvider.getPersonMainDataFromImobzi(personId);
  }
}

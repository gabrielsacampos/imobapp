import { Injectable } from '@nestjs/common';
import { ImobziPeopleProvider } from './imobziPeople.providers';

@Injectable()
export class ImobziPeopleService {
  constructor(private readonly imobziPeopleProvider: ImobziPeopleProvider) {}

  async getPersonDataToDb(id_person_imobzi: number | string): Promise<any> {
    return await this.imobziPeopleProvider.getPersonMainDataFromImobzi(id_person_imobzi);
  }
}

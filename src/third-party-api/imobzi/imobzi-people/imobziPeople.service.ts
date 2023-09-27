import { Injectable } from '@nestjs/common';
import { GroupPersonal } from './imobziPeople.dtos';
import { ImobziPeopleProvider } from './imobziPeople.providers';

@Injectable()
export class ImobziPeopleService {
  constructor(private readonly imobziPeopleProvider: ImobziPeopleProvider) {}

  async formatPersonDataToDb(id_person_imobzi: number | string): Promise<any> {
    const personFullData = await this.imobziPeopleProvider.getPersonFullDataFromImobzi(id_person_imobzi);
    const id_imobzi = personFullData.db_id.toString();
    const { fullname, email, code: code_imobzi } = personFullData;

    let maritalStatus: any;
    let gender: any;
    let profession: any;

    for (const item of personFullData.fields.group_personal) {
      maritalStatus = item.find((item: GroupPersonal) => {
        return item.field_id === 'marital_status';
      });
      if (maritalStatus) {
        maritalStatus = maritalStatus.value;
        break;
      }
    }

    for (const item of personFullData.fields.group_personal) {
      gender = item.find((item: GroupPersonal) => {
        return item.field_id === 'gender';
      });
      if (gender) {
        gender = gender.value;
        break;
      }
    }

    for (const item of personFullData.fields.group_personal) {
      profession = item.find((item: GroupPersonal) => {
        return item.field_id === 'profession';
      });
      if (profession) {
        profession = profession.value;
        break;
      }
    }

    return { id_imobzi, fullname, email, code_imobzi, maritalStatus, gender, profession };
  }
}

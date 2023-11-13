import { Injectable, Logger } from '@nestjs/common';
import { CreatePersonDTO } from 'src/modules/people/dtos/create-person.dtos';
import { GroupPersonal } from './dtos/imobziPeople.dtos';
import { ImobziPeopleRepository } from './imobziPeople.repository';

@Injectable()
export class ImobziPeopleService {
  private logger = new Logger('ImobziPeopleService');
  constructor(private readonly imobziPeopleRepository: ImobziPeopleRepository) {}

  async getRequiredData(idPerson: string): Promise<CreatePersonDTO> {
    const personFullData = await this.imobziPeopleRepository.getFullData(idPerson);
    const id_imobzi = personFullData.db_id.toString();
    const phone = personFullData.phone?.number;
    const { fullname, email, code: code_imobzi } = personFullData;

    let marital_status: string;
    let gender: any;
    let profession: any;
    let cpf: string;

    for (const item of personFullData.fields.group_personal) {
      const foundItem = item.find((item: GroupPersonal) => {
        return item.field_id === 'cpf';
      });
      if (foundItem) {
        cpf = foundItem.value;
        break;
      }
    }

    for (const item of personFullData.fields.group_personal) {
      const foundItem = item.find((item: GroupPersonal) => {
        return item.field_id === 'marital_status';
      });
      if (foundItem) {
        marital_status = foundItem.value;
        break;
      }
    }

    for (const item of personFullData.fields.group_personal) {
      const foundItem = item.find((item: GroupPersonal) => {
        return item.field_id === 'gender';
      });
      if (foundItem) {
        gender = foundItem.value;
        break;
      }
    }

    for (const item of personFullData.fields.group_personal) {
      const foundItem = item.find((item: GroupPersonal) => {
        return item.field_id === 'profession';
      });
      if (foundItem) {
        profession = foundItem.value;
        break;
      }
    }

    return { id_imobzi, cpf, phone, fullname, email, code_imobzi, marital_status, gender, profession };
  }
}

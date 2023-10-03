import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PeopleCreateDTO } from 'src/modules/people/peopleCreate.dtos';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { GroupPersonal } from './imobziPeople.dtos';

@Injectable()
export class ImobziPeopleService {
  constructor(
    private readonly httpService: HttpService,
    private readonly imobziUrl: ImobziUrlService,
    private readonly imobziParam: ImobziParamService,
  ) {}

  async getRequiredPersonDataToDb(id_imobzi: string): Promise<PeopleCreateDTO> {
    try {
      const { data } = await this.httpService.axiosRef.get(
        this.imobziUrl.urlPersonDetails(id_imobzi),
        this.imobziParam,
      );

      const phone = data.phone?.number;
      const { fullname, email, code: code_imobzi } = data;

      let marital_status: string;
      let gender: any;
      let profession: any;
      let cpf: string;

      for (const item of data.fields.group_personal) {
        const foundItem = item.find((item: GroupPersonal) => {
          return item.field_id === 'cpf';
        });
        if (foundItem) {
          cpf = foundItem.value;
          break;
        }
      }

      for (const item of data.fields.group_personal) {
        const foundItem = item.find((item: GroupPersonal) => {
          return item.field_id === 'marital_status';
        });
        if (foundItem) {
          marital_status = foundItem.value;
          break;
        }
      }

      for (const item of data.fields.group_personal) {
        const foundItem = item.find((item: GroupPersonal) => {
          return item.field_id === 'gender';
        });
        if (foundItem) {
          gender = foundItem.value;
          break;
        }
      }

      for (const item of data.fields.group_personal) {
        const foundItem = item.find((item: GroupPersonal) => {
          return item.field_id === 'profession';
        });
        if (foundItem) {
          profession = foundItem.value;
          break;
        }
      }

      return { id_imobzi, cpf, phone, fullname, email, code_imobzi, marital_status, gender, profession };
    } catch (error) {
      console.error('error on getPersonDataToDb function');
      console.error('request with id', id_imobzi);
      console.error(error.message);
    }
  }
}

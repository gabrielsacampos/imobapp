import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { GroupPersonal, PersonDTO } from './imobziPeople.dtos';

@Injectable()
export class ImobziPeopleProvider {
  constructor(
    private readonly httpService: HttpService,
    private readonly imobziUrl: ImobziUrlService,
    private readonly imobziParam: ImobziParamService,
  ) {}

  async getPersonMainDataFromImobzi(id_person_imobzi: number | string): Promise<any> {
    try {
      const { data } = await this.httpService.axiosRef.get<PersonDTO>(
        this.imobziUrl.urlPersonDetails(id_person_imobzi),
        this.imobziParam,
      );

      const id_imobzi = data.db_id.toString();
      const { fullname, email, code: code_imobzi } = data;

      let maritalStatus: any;
      let gender: any;
      let profession: any;

      for (const item of data.fields.group_personal) {
        maritalStatus = item.find((item: GroupPersonal) => {
          return item.field_id === 'marital_status';
        });
        if (maritalStatus) {
          maritalStatus = maritalStatus.value;
          break;
        }
      }

      for (const item of data.fields.group_personal) {
        gender = item.find((item: GroupPersonal) => {
          return item.field_id === 'gender';
        });
        if (gender) {
          gender = gender.value;
          break;
        }
      }

      for (const item of data.fields.group_personal) {
        profession = item.find((item: GroupPersonal) => {
          return item.field_id === 'profession';
        });
        if (profession) {
          profession = profession.value;
          break;
        }
      }

      return { id_imobzi, fullname, email, code_imobzi, maritalStatus, gender, profession };
    } catch (error) {
      console.error('error on getPersonDataToDb function');
      console.error('request with id', id_person_imobzi);
      console.error(error.message);
    }
  }
}

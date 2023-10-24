import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { GroupPersonal } from './imobziPeople.dtos';
import { imobziUrls, imobziParams } from '../imobzi-urls-params/imobzi.urls';
import { CreatePersonDTO } from 'src/repository/people/dtos/create-person.dtos';

@Injectable()
export class ImobziPeopleService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly httpService: HttpService,
  ) {}

  async getRequiredPersonDataToDb(id_imobzi: string): Promise<CreatePersonDTO> {
    try {
      const { data } = await this.httpService.axiosRef.get(imobziUrls.urlPersonDetails(id_imobzi), imobziParams);

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
      this.logger.error(error);
      throw new Error(error);
    }
  }
}

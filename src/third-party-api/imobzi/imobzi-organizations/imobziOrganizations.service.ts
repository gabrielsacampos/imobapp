import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';

@Injectable()
export class ImobziOrganizationsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
    private readonly imobziUrl: ImobziUrlService,
    private readonly imobziParam: ImobziParamService,
  ) {}

  async getOrgDataToDb(orgId: bigint): Promise<any> {
    try {
      const { data } = await this.httpService.axiosRef.get(
        this.imobziUrl.urlOrganizationDetails(orgId),
        this.imobziParam,
      );
      const address = data.fields.group_address[0][0]?.value;
      const cnpj = data.fields.group_company_data[0][4]?.value;
      const person_id_representative = data.persons[0].person_id; // third-party-api uses 'persons' instead of 'people'
      const representative_type = data.persons[0].associate_type;
      const phone = data.phone.number;
      const { db_id: id, email, name } = data;

      return {
        address,
        cnpj,
        person_id_representative,
        representative_type,
        phone,
        id,
        email,
        name,
      };
    } catch (error) {
      console.error('error on getOrgDataToDb function');
      console.error('request with id', orgId);
      console.error(error.message);
    }
  }
}

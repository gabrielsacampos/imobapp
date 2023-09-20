import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';

@Injectable()
export class ImobziPeopleService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
    private readonly imobziUrl: ImobziUrlService,
    private readonly imobziParam: ImobziParamService,
  ) {}

  async getPersonDataToDb(personId: bigint): Promise<any> {
    try {
      const { data } = await this.httpService.axiosRef.get(this.imobziUrl.urlPersonDetails(personId), this.imobziParam);
      const { db_id: id, fullname, email } = data;
      return { id, fullname, email };
    } catch (error) {
      console.error('error on getPersonDataToDb function');
      console.error('request with id', personId);
      console.error(error.message);
    }
  }
}

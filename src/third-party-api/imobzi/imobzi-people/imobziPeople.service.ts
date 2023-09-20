import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ImobziParam, ImobziUrl } from '../imobzi.urls';

@Injectable()
export class ImobziPeopleService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
    private readonly imobziUrl: ImobziUrl,
    private readonly imobziParam: ImobziParam,
  ) {}

  async getPersonDataToDb(personId: bigint): Promise<any> {
    const { data } = await this.httpService.axiosRef.get(this.imobziUrl.urlPersonDetails(personId), this.imobziParam);
    const { db_id: id, fullname, email } = data;
    return { id, fullname, email };
  }
}

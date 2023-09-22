import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';

@Injectable()
export class ImobziContactsProvider {
  constructor(
    private readonly httpService: HttpService,
    private readonly imobziUrlService: ImobziUrlService,
    private readonly imobziParamService: ImobziParamService,
  ) {}

  async getAllContacts(): Promise<any[]> {
    const allContacts = [];

    let cursor = '';
    do {
      const { data } = await this.httpService.axiosRef.get(
        this.imobziUrlService.urlContacts(cursor),
        this.imobziParamService,
      );
      allContacts.push(...data.contacts);
      cursor = data.cursor;
    } while (cursor);

    return allContacts;
  }
}

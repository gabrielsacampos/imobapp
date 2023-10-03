import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { ContactDTO, ImobziContactsDTO } from './imobziContacts.dtos';

@Injectable()
export class ImobziContactsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly imobziUrlService: ImobziUrlService,
    private readonly imobziParamService: ImobziParamService,
  ) {}

  async getAllContacts(): Promise<ContactDTO[]> {
    let newCursor = '';
    const allContacts = [];
    do {
      const { data } = await this.httpService.axiosRef.get<ImobziContactsDTO>(
        this.imobziUrlService.urlContacts(newCursor),
        this.imobziParamService,
      );
      newCursor = data.cursor;
      allContacts.push(...data.contacts);
    } while (newCursor);

    return allContacts;
  }
}

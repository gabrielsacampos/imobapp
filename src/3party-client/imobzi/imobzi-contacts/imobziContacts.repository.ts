import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ContactDTO, ImobziContactsDTO } from './dtos/imobziContacts.dtos';
import { imobziUrls, imobziParams } from '../imobzi-urls-params/imobzi.urls';

@Injectable()
export class ImobziContactsRepository {
  constructor(private readonly httpService: HttpService) {}

  async getAllContacts(): Promise<ContactDTO[]> {
    try {
      let newCursor = '';
      const allContacts = [];
      do {
        const { data } = await this.httpService.axiosRef.get<ImobziContactsDTO>(
          imobziUrls.urlContacts(newCursor),
          imobziParams,
        );
        newCursor = data.cursor;
        allContacts.push(...data.contacts);
      } while (newCursor);

      return allContacts;
    } catch (error) {
      throw new Error(error);
    }
  }
}

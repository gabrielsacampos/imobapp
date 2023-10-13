import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ContactDTO, ImobziContactsDTO } from './imobziContacts.dtos';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { imobziUrls, imobziParams } from '../imobzi-urls-params/imobzi.urls';

@Injectable()
export class ImobziContactsService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly httpService: HttpService,
  ) {}

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
        this.logger.verbose(`contacts catched > ${allContacts.length}`);
      } while (newCursor);

      return allContacts;
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}

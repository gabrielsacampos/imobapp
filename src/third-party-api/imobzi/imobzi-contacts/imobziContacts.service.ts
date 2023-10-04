import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { ContactDTO, ImobziContactsDTO } from './imobziContacts.dtos';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class ImobziContactsService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly httpService: HttpService,
    private readonly imobziUrlService: ImobziUrlService,
    private readonly imobziParamService: ImobziParamService,
  ) {}

  async getAllContacts(): Promise<ContactDTO[]> {
    try {
      let newCursor = '';
      const allContacts = [];
      do {
        const { data } = await this.httpService.axiosRef.get<ImobziContactsDTO>(
          this.imobziUrlService.urlContacts(newCursor),
          this.imobziParamService,
        );
        newCursor = data.cursor;
        allContacts.push(...data.contacts);
        this.logger.verbose(`contacts catched > ${allContacts.length}`);
      } while (newCursor);

      return allContacts;
    } catch (error) {
      this.logger.error(` Error on ImobziContacts.service > getAllContacts: ${error}`);
    }
  }
}

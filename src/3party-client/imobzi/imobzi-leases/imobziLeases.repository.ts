import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { imobziParams, imobziUrls } from '../imobzi-urls-params/imobzi.urls';
import { ImobziLeasesDTO, LeaseDTO } from './dtos/imobziLeases.dtos';
import { ImobziLeaseDetailsDTO } from './dtos/imobziLeasesDetails.dtos';

@Injectable()
export class ImobziLeasesRepository {
  private logger = new Logger('ImobziLeasesRepository');
  constructor(private readonly httpService: HttpService) {}

  async getAll(): Promise<LeaseDTO[]> {
    try {
      const allLeases = [];
      let cursor = '';

      do {
        const { data } = await this.httpService.axiosRef.get<ImobziLeasesDTO>(
          imobziUrls.urlAllLeases(cursor),
          imobziParams,
        );
        allLeases.push(...data.leases);
        cursor = data.cursor;
        this.logger.verbose(`got ${allLeases.length}/${data.count} LEASES`);
      } while (cursor);

      return allLeases;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getFullData(id_imobzi: string): Promise<ImobziLeaseDetailsDTO> {
    try {
      const { data } = await this.httpService.axiosRef.get<ImobziLeaseDetailsDTO>(
        imobziUrls.urlLeaseDetails(id_imobzi),
        imobziParams,
      );
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

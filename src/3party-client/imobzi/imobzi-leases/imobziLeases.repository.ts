import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { imobziParams, imobziUrls } from '../imobzi-urls-params/imobzi.urls';
import { ImobziLeasesDTO, LeaseDTO } from './imobziLeases.dtos';
import { ImobziLeaseDetailsDTO } from './imobziLeasesDetails.dtos';

@Injectable()
export class ImobziLeasesRepository {
  constructor(private readonly httpService: HttpService) {}

  async getAllLeasesFromImobzi(): Promise<LeaseDTO[]> {
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
      } while (cursor);

      return allLeases;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getLeaseFullData(id_imobzi: string): Promise<ImobziLeaseDetailsDTO> {
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
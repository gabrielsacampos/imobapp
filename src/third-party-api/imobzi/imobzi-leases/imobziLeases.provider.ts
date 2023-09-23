import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { ImobziLease, ImobziLeasesDTO } from './imobziLeases.dtos';
import { ImobziLeaseDetailsDTO } from './imobziLeasesDetails.dtos';

@Injectable()
export class ImobziLeasesProvider {
  constructor(
    private readonly httpService: HttpService,
    private readonly imobziUrlService: ImobziUrlService,
    private readonly imobziParaService: ImobziParamService,
  ) {}

  async getAllLeasesFromImobzi(): Promise<ImobziLease[]> {
    try {
      const allLeases = [];
      let cursor = '';

      do {
        const { data } = await this.httpService.axiosRef.get<ImobziLeasesDTO>(
          this.imobziUrlService.urlAllLeases(cursor),
          this.imobziParaService,
        );
        allLeases.push(...data.leases);
        cursor = data.cursor;
      } while (cursor);

      return allLeases;
    } catch (error) {
      console.error(error.message);
    }
  }

  async getLeaseFullDataFromImobzi(leaseId: number | string): Promise<ImobziLeaseDetailsDTO> {
    const { data } = await this.httpService.axiosRef.get(
      this.imobziUrlService.urlLeaseDetails(leaseId),
      this.imobziParaService,
    );
    return data;
  }
}

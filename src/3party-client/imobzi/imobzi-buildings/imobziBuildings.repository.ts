import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { imobziParams, imobziUrls } from '../imobzi-urls-params/imobzi.urls';
import { BuildingDTO } from './imobziBuildings.dtos';

@Injectable()
export class ImobziBuildingsRepository {
  constructor(private readonly httpService: HttpService) {}

  async getAllBuildings(): Promise<BuildingDTO[]> {
    try {
      const allBuildings: BuildingDTO[] = [];

      let cursor = '';
      do {
        const { data } = await this.httpService.axiosRef.get(imobziUrls.urlAllBuildings(cursor), imobziParams);
        allBuildings.push(...data.properties);
        cursor = data.cursor;
      } while (cursor);

      return allBuildings;
    } catch (error) {
      throw new Error(error);
    }
  }
}

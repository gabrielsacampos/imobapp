import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { imobziParams, imobziUrls } from '../imobzi-urls-params/imobzi.urls';
import { BuildingDTO } from './dtos/imobziBuildings.dtos';

@Injectable()
export class ImobziBuildingsRepository {
  private logger = new Logger('ImobziBuildingsRepository');
  constructor(private readonly httpService: HttpService) {}

  async getAll(): Promise<BuildingDTO[]> {
    try {
      const allBuildings: BuildingDTO[] = [];

      let cursor = '';
      do {
        const { data } = await this.httpService.axiosRef.get(imobziUrls.urlAllBuildings(cursor), imobziParams);
        allBuildings.push(...data.properties);
        cursor = data.cursor;
        this.logger.verbose(`got ${allBuildings.length}/${data.count} BUILDINGS`);
      } while (cursor);

      return allBuildings;
    } catch (error) {
      throw new Error(error);
    }
  }
}

import { Logger } from 'winston';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { BuildingsCreateDTO } from 'src/modules/buildings/buildingsCreate.dtos';
import { ImobziParamService, ImobziUrlService } from '../imobzi-urls-params/imobziUrls.service';
import { BuildingDTO } from './imobziBuildings.dtos';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class ImobziBuildingsService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly httpService: HttpService,
    private readonly imobziUrl: ImobziUrlService,
    private readonly imobziParam: ImobziParamService,
  ) {}

  async getAllBuildings(): Promise<BuildingDTO[]> {
    try {
      const allBuildings: BuildingDTO[] = [];

      let cursor = '';
      do {
        const { data } = await this.httpService.axiosRef.get(this.imobziUrl.urlAllBuildings(cursor), this.imobziParam);
        allBuildings.push(...data.properties);
        cursor = data.cursor;

        this.logger.verbose(`buildings catched > ${allBuildings.length}`);
      } while (cursor);

      return allBuildings;
    } catch (error) {
      this.logger.error(` Error on ImobziBuildings.service > getAllBuildings: ${error}`);
    }
  }

  async getRequiredBuildingDataToDb(buildingData: BuildingDTO): Promise<BuildingsCreateDTO> {
    const { address, city, building_name: name, zipcode } = buildingData;
    const id_imobzi = buildingData.db_id.toString();
    return { id_imobzi, address, city, name, zipcode };
  }
}

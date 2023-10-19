import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { granatumUrls } from '../granatum-urls-params/granatum.urls';

@Injectable()
export class GranatumCostCenterService {
  constructor(private readonly httpService: HttpService) {}

  async getAllCostCenters() {
    const { data } = await this.httpService.axiosRef.get(granatumUrls.allCostCentersUrl());
    return data;
  }

  async findIdByDescription(building_name: string, block: string) {
    try {
      const cleanedBuilding = building_name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

      let cleanedBlock;
      if (block) {
        cleanedBlock = block
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase();
      }

      const costCenters = await this.getAllCostCenters();

      let costCenterFound = costCenters.find((element) => {
        const cleanedDescription = element.descricao
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase();
        return cleanedDescription.includes(cleanedBuilding);
      });

      if (costCenterFound && costCenterFound.centros_custo_lucro_filhos.length > 0) {
        //make a new filter to compare into child cost center, but using the block name as param.
        costCenterFound = costCenterFound.centros_custo_lucro_filhos.find((element) => {
          const cleanedDescription = element.descricao
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
          return cleanedDescription.includes(cleanedBlock);
        });
      } else if (!costCenterFound) {
        costCenterFound = { id: 254187 }; // if script do not find the costCenter, then return the id from undefined costCenter on granatum
      }
      return costCenterFound.id;
    } catch (error) {
      throw new Error(error.message + `on granatumCostCenterService.findIdByDescription`);
    }
  }
}

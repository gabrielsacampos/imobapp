import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { granatumUrls } from '../granatum-urls-params/granatum.urls';
import { CostCenterChildDTO, CostCenterDTO } from './dtos/costCenters.dto';

@Injectable()
export class GranatumCostCenterService {
  constructor(private readonly httpService: HttpService) {}

  async getAllCostCenters() {
    const { data } = await this.httpService.axiosRef.get(granatumUrls.allCostCentersUrl());
    return data;
  }

  findIdByDescription(building_name: string, block: string, costCerters: CostCenterDTO[]) {
    const unknowCostCenter = { id: 254187 };
    const motherCostCenterFound = this.findMotherCostCenter(building_name, costCerters);

    if (!motherCostCenterFound) {
      return unknowCostCenter.id;
    }
    const childCostCenterFound = this.findChildCostCenter(block, motherCostCenterFound);

    if (motherCostCenterFound && childCostCenterFound) {
      return childCostCenterFound.id;
    } else if (motherCostCenterFound && !childCostCenterFound) {
      return unknowCostCenter.id;
    } else if (!motherCostCenterFound && !childCostCenterFound) {
      return unknowCostCenter.id;
    }
  }

  findMotherCostCenter(building_name: string, arrayCostCenters: CostCenterDTO[]) {
    const cleanedBuilding = building_name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    return arrayCostCenters.find((element) => {
      const cleanedDescription = element.descricao
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
      return cleanedDescription.includes(cleanedBuilding);
    });
  }

  findChildCostCenter(block: string | undefined, arrayCostCenters: CostCenterDTO) {
    let cleanedBlock;
    if (block) {
      cleanedBlock = block
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
    }

    return arrayCostCenters.centros_custo_lucro_filhos.find((element) => {
      const cleanedDescription = element.descricao
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
      return cleanedDescription.includes(cleanedBlock);
    });
  }
}

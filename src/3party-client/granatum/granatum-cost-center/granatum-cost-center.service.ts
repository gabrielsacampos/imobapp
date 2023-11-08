import { Injectable } from '@nestjs/common';
import { CostCenterDTO } from './dtos/costCenters.dto';
import { GranatumCostCenterRepository } from './granatum-cost-center.repository';

@Injectable()
export class GranatumCostCenterService {
  constructor(private readonly granatumCostCentersRepository: GranatumCostCenterRepository) {}

  allCostCenters = this.granatumCostCentersRepository.getAll();

  async findIdByDescription(building_name: string, block: string): Promise<any> {
    const costCenters = await this.allCostCenters;
    const unknowCostCenter = { id: 254187 };
    const motherCostCenterFound = this.findMotherCostCenter(building_name, costCenters);

    if (!motherCostCenterFound) {
      return unknowCostCenter.id;
    } else if (motherCostCenterFound && block === '') {
      return motherCostCenterFound.id;
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

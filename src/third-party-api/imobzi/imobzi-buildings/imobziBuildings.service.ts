import { BuildingsCreateDTO } from 'src/modules/buildings/buildingsCreate.dtos';
import { ImobziPropertyDetailsDTO } from '../imobzi-properties/imobziPropertyDetails.dtos';

export class ImobziBuildingsService {
  constructor() {}
  getRequiredBuildingDataToDb(propertyFullData: Partial<ImobziPropertyDetailsDTO>): BuildingsCreateDTO {
    const id_imobzi = propertyFullData.building_id?.toString();
    const { address, city, building_name: name, zipcode } = propertyFullData;
    return { id_imobzi, address, city, name, zipcode };
  }
}

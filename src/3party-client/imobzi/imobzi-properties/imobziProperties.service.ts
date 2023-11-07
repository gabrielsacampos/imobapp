import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from 'src/repository/owners/dto/create-owner.dto';
import { CreatePropertyDTO } from 'src/repository/properties/dtos/create-property.dtos';
import { ImobziPropertyOwnerDTO } from './dtos/imobziPropertyDetails.dtos';
import { ImobziPropertiesRepository } from './imobziProperties.repository';

@Injectable()
export class ImobziPropertiesService {
  constructor(private readonly imobziPropertiesRepository: ImobziPropertiesRepository) {}
  getRequiredPropertyOwnersToDb(owners: Partial<ImobziPropertyOwnerDTO>[]): CreateOwnerDto[] {
    return owners.map((owner) => {
      let id_owner_person_imobzi: string;
      let id_owner_organization_imobzi: string;
      if (owner.type === 'person') {
        id_owner_organization_imobzi = null;
        id_owner_person_imobzi = owner.id.toString();
      } else {
        id_owner_organization_imobzi = owner.id.toString();
        id_owner_person_imobzi = null;
      }
      const share = owner.percentage;

      return { share, id_owner_organization_imobzi, id_owner_person_imobzi };
    });
  }

  async getRequiredData(idProperty: string): Promise<CreatePropertyDTO> {
    const propertyFullData = await this.imobziPropertiesRepository.getFullData(idProperty);
    const id_imobzi = propertyFullData.db_id.toString();
    const unity = propertyFullData.property_unity?.toString();
    const id_building_imobzi = propertyFullData.building_id ? propertyFullData.building_id.toString() : null;

    const {
      property_block: block,
      alternative_code,
      area,
      sale_value,
      rental_value,
      status,
      property_type: type,
      garage,
      suite,
      bedroom,
      active,
    } = propertyFullData;

    const owners = this.getRequiredPropertyOwnersToDb(propertyFullData.owners);

    return {
      block,
      unity,
      owners,
      id_imobzi,
      alternative_code,
      area,
      id_building_imobzi,
      sale_value,
      rental_value,
      status,
      type,
      garage,
      suite,
      bedroom,
      active,
    };
  }
}

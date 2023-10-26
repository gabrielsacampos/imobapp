import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreatePropertyDTO } from 'src/repository/properties/dtos/create-property.dtos';
import { OwnersCreateDTO } from 'src/repository/properties/owners/OwnerCreate.dtos';
import { imobziParams, imobziUrls } from '../imobzi-urls-params/imobzi.urls';
import { ImobziPropertiesDTO } from './imobziProperties.dtos';
import { ImobziPropertyOwnerDTO } from './imobziPropertyDetails.dtos';

@Injectable()
export class ImobziPropertiesService {
  constructor(private readonly httpService: HttpService) {}

  async getAllProperties(): Promise<any> {
    try {
      const allProperties = [];

      let cursor = '';
      do {
        const { data } = await this.httpService.axiosRef.get<ImobziPropertiesDTO>(
          imobziUrls.urlProperties('all', cursor),
          imobziParams,
        );
        allProperties.push(...data.properties);
        cursor = data.cursor;
      } while (cursor);

      cursor = '';
      do {
        const { data } = await this.httpService.axiosRef.get<ImobziPropertiesDTO>(
          imobziUrls.urlProperties('unavailable_properties', cursor),
          imobziParams,
        );
        allProperties.push(...data.properties);
        cursor = data.cursor;
      } while (cursor);

      return allProperties;
    } catch (error) {
      throw new Error(error);
    }
  }

  getRequiredPropertyOwnersToDb(owners: Partial<ImobziPropertyOwnerDTO>[]): OwnersCreateDTO[] {
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

  async getRequiredPropertyDataToDb(id_imobzi: string): Promise<CreatePropertyDTO> {
    try {
      const { data } = await this.httpService.axiosRef.get(imobziUrls.urlPropertyDetails(id_imobzi), imobziParams);
      const unity = data.property_unity?.toString();
      const id_building_imobzi = data.building_id ? data.building_id.toString() : null;

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
      } = data;

      const owners = this.getRequiredPropertyOwnersToDb(data.owners);

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
    } catch (error) {
      throw new Error(error);
    }
  }
}

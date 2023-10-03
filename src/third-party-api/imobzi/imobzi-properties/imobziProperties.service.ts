import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { OwnersCreateDTO } from 'src/modules/properties/owners/OwnerCreate.dtos';
import { PropertyCreateDTO } from 'src/modules/properties/propertiesCreate.dtos';
import { ImobziUrlService, ImobziParamService } from '../imobzi-urls-params/imobziUrls.service';
import { ImobziPropertiesDTO } from './imobziProperties.dtos';
import { ImobziPropertyDetailsDTO, ImobziPropertyOwnerDTO } from './imobziPropertyDetails.dtos';

@Injectable()
export class ImobziPropertiesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly imobziUrl: ImobziUrlService,
    private readonly imobziParam: ImobziParamService,
  ) {}

  async getAllProperties(): Promise<any> {
    try {
      const allProperties = [];

      let cursor = '';
      do {
        const { data } = await this.httpService.axiosRef.get<ImobziPropertiesDTO>(
          this.imobziUrl.urlProperties('all', cursor),
          this.imobziParam,
        );
        allProperties.push(...data.properties);
        cursor = data.cursor;
      } while (cursor);

      cursor = '';
      do {
        const { data } = await this.httpService.axiosRef.get<ImobziPropertiesDTO>(
          this.imobziUrl.urlProperties('unavailable_properties', cursor),
          this.imobziParam,
        );
        allProperties.push(...data.properties);
        cursor = data.cursor;
      } while (cursor);

      return allProperties;
    } catch (error) {
      console.error(error.message);
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

  async getRequiredPropertyDataToDb(id_imobzi: string): Promise<PropertyCreateDTO> {
    try {
      const { data } = await this.httpService.axiosRef.get<ImobziPropertyDetailsDTO>(
        this.imobziUrl.urlPropertyDetails(id_imobzi),
        this.imobziParam,
      );

      const unit = data.property_unity?.toString();
      const id_building_imobzi = data.building_id.toString();
      const {
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
        unit,
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
      console.error(error.message);
    }
  }
}

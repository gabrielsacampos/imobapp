import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { BeneficiariesCreateDTO } from 'src/repository/modules/leases/lease-beneficiaries/lease-beneficiaries.dtos';
import { LeaseItemsCreateDTO } from 'src/repository/modules/leases/lease-items/leaseItemsCreate.dtos';
import { LeasesCreateDTO } from 'src/repository/modules/leases/leasesCreate.dtos';
import { ImobziLeasesDTO, LeaseDTO } from './imobziLeases.dtos';
import { ImobziLeaseBeneficiaryDTO, ImobziLeaseDetailsDTO, ImobziLeaseItemDTO } from './imobziLeasesDetails.dtos';
import { imobziUrls, imobziParams } from '../imobzi-urls-params/imobzi.urls';

@Injectable()
export class ImobziLeasesService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly httpService: HttpService,
  ) {}

  async getAllLeasesFromImobzi(): Promise<LeaseDTO[]> {
    try {
      const allLeases = [];
      let cursor = '';
      do {
        const { data } = await this.httpService.axiosRef.get<ImobziLeasesDTO>(
          imobziUrls.urlAllLeases(cursor),
          imobziParams,
        );
        allLeases.push(...data.leases);
        cursor = data.cursor;
        this.logger.verbose(`Leases catched > ${allLeases.length}`);
      } while (cursor);

      return allLeases;
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  getRequiredLeaseBeneficiariesDataToDb(leaseBeneficiaries: ImobziLeaseBeneficiaryDTO[]): BeneficiariesCreateDTO[] {
    return leaseBeneficiaries.map((beneficiary) => {
      const id_beneficiary_organization_imobzi =
        beneficiary.type === 'organization' ? beneficiary.db_id.toString() : null;
      const id_beneficiary_person_imobzi = beneficiary.type === 'person' ? beneficiary.db_id.toString() : null;
      const share = beneficiary.percent;
      return { id_beneficiary_organization_imobzi, id_beneficiary_person_imobzi, share };
    });
  }

  getRequiredLeaseItemsDataToDb(leaseItems: ImobziLeaseItemDTO[]): LeaseItemsCreateDTO[] {
    return leaseItems.map((item) => {
      const validStartDate = item.start_date === '' ? null : new Date(item.start_date);
      const start_date = validStartDate;
      const due_date = new Date(item.due_date);
      const {
        repeat_total,
        repeat_index,
        description,
        charge_management_fee: management_fee,
        recurrent,
        value,
        until_due_date,
        behavior,
        include_in_dimob,
      } = item;

      return {
        due_date,
        repeat_total,
        repeat_index,
        description,
        management_fee,
        recurrent,
        value,
        until_due_date,
        behavior,
        include_in_dimob,
        start_date,
      };
    });
  }

  async getRequiredLeaseDataToDb(id_imobzi: string): Promise<LeasesCreateDTO> {
    try {
      const { data } = await this.httpService.axiosRef.get<ImobziLeaseDetailsDTO>(
        imobziUrls.urlLeaseDetails(id_imobzi),
        imobziParams,
      );

      const id_annual_readjustment_imobzi = data.annual_readjustment?.db_id.toString();
      const id_property_imobzi = data.property.db_id.toString();
      const guarantee_type = data.guarantee?.guarantee_type;
      const guarantee_value = data.guarantee?.details?.value;
      const id_main_guarantor_imobzi =
        data.guarantee?.guarantee_type === 'guarantor' ? data.guarantee.sponsor.db_id.toString() : null;
      const id_tenant_organization_imobzi =
        data.tenants[0].type === 'organization' ? data.tenants[0].db_id.toString() : null;
      const id_tenant_person_imobzi = data.tenants[0].type === 'person' ? data.tenants[0].db_id.toString() : null;
      const fee = data.management_fee.percent;
      const updated_at = new Date(data.updated_at);
      const {
        status,
        value: lease_value,
        duration,
        irrf,
        indeterminate,
        start_at,
        code: code_imobzi,
        include_in_dimob,
      } = data;

      const beneficiaries = this.getRequiredLeaseBeneficiariesDataToDb(data.beneficiaries);
      const lease_items = this.getRequiredLeaseItemsDataToDb(data.items);
      return {
        beneficiaries,
        updated_at,
        id_annual_readjustment_imobzi,
        code_imobzi,
        duration,
        fee,
        guarantee_type,
        guarantee_value,
        id_imobzi,
        id_tenant_organization_imobzi,
        id_main_guarantor_imobzi,
        id_tenant_person_imobzi,
        include_in_dimob,
        indeterminate,
        irrf,
        lease_value,
        id_property_imobzi,
        start_at,
        status,
        lease_items,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
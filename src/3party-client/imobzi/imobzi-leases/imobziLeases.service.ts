import { Injectable } from '@nestjs/common';
import { CreateLeaseDTO } from 'src/modules/leases/dtos/create-lease.dtos';
import { BeneficiariesCreateDTO } from 'src/modules/leases/lease-beneficiaries/lease-beneficiaries.dtos';
import { CreateLeaseItemsDTO } from 'src/modules/lease-items/dtos/create-leaseItems.dtos';
import { ImobziLeaseBeneficiaryDTO, ImobziLeaseDetailsDTO, ImobziLeaseItemDTO } from './dtos/imobziLeasesDetails.dtos';
import { ImobziLeasesRepository } from './imobziLeases.repository';

@Injectable()
export class ImobziLeasesService {
  constructor(private readonly imobziLeasesRepository: ImobziLeasesRepository) { }

  getRequiredLeaseBeneficiariesDataToDb(leaseBeneficiaries: ImobziLeaseBeneficiaryDTO[]): BeneficiariesCreateDTO[] {
    return leaseBeneficiaries.map((beneficiary) => {
      const id_beneficiary_organization_imobzi =
        beneficiary.type === 'organization' ? beneficiary.db_id.toString() : null;
      const id_beneficiary_person_imobzi = beneficiary.type === 'person' ? beneficiary.db_id.toString() : null;
      const share = beneficiary.percent;
      return { id_beneficiary_organization_imobzi, id_beneficiary_person_imobzi, share };
    });
  }

  getRequiredLeaseItemsDataToDb(leaseItems: ImobziLeaseItemDTO[]): CreateLeaseItemsDTO[] {
    try {
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
    } catch (error) {
      console.log(error.stack);
    }
  }

  async getRequiredData(idLease: string): Promise<CreateLeaseDTO> {
    const leaseFullData: ImobziLeaseDetailsDTO = await this.imobziLeasesRepository.getFullData(idLease);
    const id_imobzi = leaseFullData.db_id.toString();
    const id_annual_readjustment_imobzi = leaseFullData.annual_readjustment?.db_id.toString();
    const id_property_imobzi = leaseFullData.property.db_id.toString();
    const guarantee_type = leaseFullData.guarantee?.guarantee_type;
    const guarantee_value = leaseFullData.guarantee?.details?.value;
    const id_main_guarantor_imobzi =
      leaseFullData.guarantee?.guarantee_type === 'guarantor' ? leaseFullData.guarantee.sponsor.db_id.toString() : null;
    const id_tenant_organization_imobzi =
      leaseFullData.tenants[0].type === 'organization' ? leaseFullData.tenants[0].db_id.toString() : null;
    const id_tenant_person_imobzi =
      leaseFullData.tenants[0].type === 'person' ? leaseFullData.tenants[0].db_id.toString() : null;
    const fee = leaseFullData.management_fee.percent;
    const updated_at = new Date(leaseFullData.updated_at);
    const start_at = new Date(leaseFullData.start_at);
    const {
      status,
      value: lease_value,
      duration,
      irrf,
      indeterminate,
      code: code_imobzi,
      include_in_dimob,
    } = leaseFullData;

    const beneficiariesLease = this.getRequiredLeaseBeneficiariesDataToDb(leaseFullData.beneficiaries);
    const leaseItems = this.getRequiredLeaseItemsDataToDb(leaseFullData.items);

    return {
      beneficiariesLease,
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
      leaseItems,
    };
  }
}

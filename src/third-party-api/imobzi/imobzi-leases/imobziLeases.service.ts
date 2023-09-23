import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ImobziLeasesProvider } from './imobziLeases.provider';
import { ImobziLeaseBeneficiary } from './imobziLeasesDetails.dtos';

@Injectable()
export class ImobziLeasesService {
  constructor(
    private readonly imobziLeasesProvider: ImobziLeasesProvider,
    private readonly prisma: PrismaService,
  ) {}

  async getLeasesMissingIdsFromImobzi(): Promise<any> {
    const leasesOnDb = await this.prisma.lease.findMany();
    const leasesFromApi = await this.imobziLeasesProvider.getAllLeasesFromImobzi();

    const leasesOnDbIds = leasesOnDb.map((leaseOnDb) => leaseOnDb.id_imobzi);
    const leasesFromApiIds = leasesFromApi.map((leaseFromApi) => leaseFromApi.db_id.toString());

    const missingIdsOnDb: string[] = leasesFromApiIds.filter((leaseFromApiId: string) => {
      // if DB.leases does not include the current id from API
      return !leasesOnDbIds.includes(leaseFromApiId);
    });

    return missingIdsOnDb;
  }

  // Imobzi's API does not return property 'updated_at' at leases pagination. We need to check lease by lease to get main details from them, including 'updated_at'
  async getExistingLeasesIdsToUpdate(): Promise<string[]> {
    const leasesOnDb = await this.prisma.lease.findMany();
    const leasesIdsToUpdate = [];

    for (const leaseOnDb of leasesOnDb) {
      const leaseFromApi = await this.imobziLeasesProvider.getLeaseFullDataFromImobzi(leaseOnDb.id_imobzi);

      if (new Date(leaseOnDb.updated_at) <= new Date(leaseFromApi.updated_at)) {
        leasesIdsToUpdate.push(leaseFromApi.db_id.toString());
      }
    }
    return leasesIdsToUpdate;
  }

  async getLeaseToUpdateDb(leaseId: number | string): Promise<any> {
    const leaseFullDataFromImobzi = await this.imobziLeasesProvider.getLeaseFullDataFromImobzi(leaseId);

    const annual_readjustment = leaseFullDataFromImobzi.annual_readjustment.name;
    const id_property_imobzi = leaseFullDataFromImobzi.property.db_id.toString();
    const guarantee_type = leaseFullDataFromImobzi.guarantee.guarantee_type;
    const guarantee_value = leaseFullDataFromImobzi.guarantee.details.value;

    const id_main_guarantor_imobzi =
      leaseFullDataFromImobzi.guarantee?.guarantee_type === 'guarantor'
        ? leaseFullDataFromImobzi.guarantee.sponsor.db_id.toString()
        : null;

    const id_tenant_organization_imobzi =
      leaseFullDataFromImobzi.tenants[0].type === 'organization'
        ? leaseFullDataFromImobzi.tenants[0].db_id.toString()
        : null;
    const id_tenant_person_imobzi =
      leaseFullDataFromImobzi.tenants[0].type === 'person' ? leaseFullDataFromImobzi.tenants[0].db_id.toString() : null;

    const fee = leaseFullDataFromImobzi.management_fee.percent;
    const id_imobzi = leaseFullDataFromImobzi.db_id.toString();
    const updated_at = new Date(leaseFullDataFromImobzi.updated_at);
    const {
      status,
      value: lease_value,
      duration,
      irrf,
      indeterminate,
      start_at,
      code: code_imobzi,
      include_in_dimob,
    } = leaseFullDataFromImobzi;

    const beneficiaries = leaseFullDataFromImobzi.beneficiaries.map((beneficiary: ImobziLeaseBeneficiary) => {
      const id_lease_imobzi = leaseId.toString();
      const id_beneficiary_organization = beneficiary.type === 'organization' ? beneficiary.db_id.toString() : null;
      const id_beneficiary_person = beneficiary.type === 'person' ? beneficiary.db_id.toString() : null;
      const share = beneficiary.percent;
      return { id_lease_imobzi, id_beneficiary_organization, id_beneficiary_person, share };
    });

    return {
      beneficiaries,
      updated_at,
      annual_readjustment,
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
    };
  }
}

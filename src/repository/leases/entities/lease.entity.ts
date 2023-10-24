export class Lease {
  id_imobzi: string;
  status: string;
  code_imobzi?: string;
  start_at: Date;
  duration: number;
  id_property_imobzi: string;
  id_tenant_person_imobzi?: string;
  id_tenant_organization_imobzi?: string;
  id_main_guarantor_imobzi?: string;
  fee: number;
  guarantee_type?: string;
  guarantee_value: number;
  id_annual_readjustment_imobzi?: string;
  irrf: boolean;
  include_in_dimob: boolean;
  indeterminate: boolean;
  lease_value: number;
}

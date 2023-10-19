export interface InvoiceFromDbDTO {
  credit_at: Date;
  account_credit: string;
  paid_at: Date;
  paid_manual: any;
  id_imobzi: string;
  bank_fee_value: number;
  interest_value: number;
  onlending_value: number;
  invoiceItems: InvoiceItem[];
  lease: Lease;
}

export interface InvoiceItem {
  description: string;
  value: number;
}

export interface Lease {
  tenant_person: any;
  tenant_org: TenantOrg;
  beneficiariesLease: BeneficiariesLeaseDTO[];
  id: number;
  property: Property;
}

export interface TenantOrg {
  name: string;
  cnpj: string;
}

export interface BeneficiariesLeaseDTO {
  beneficiary_organization_imobzi: { id_imobzi: string; cnpj: string };
  beneficiary_person_imobzi: { id_imobzi: string; cpf: string };
  share: number;
}

export interface Property {
  unit: string;
  property_block: string;
  building: Building;
}

export interface Building {
  name: string;
  address: string;
}

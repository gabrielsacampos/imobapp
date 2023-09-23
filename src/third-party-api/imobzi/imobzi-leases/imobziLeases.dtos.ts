export interface ImobziLeasesDTO {
  count: number;
  management_fee_total: number;
  cursor: string;
  value_total: number;
  leases: ImobziLease[];
  count_lease_digital_real_estate: number;
}

export interface ImobziLease {
  status: string;
  code: string;
  start_at: string;
  insurances: Insurance[];
  db_id: number;
  items_management_fee: number;
  irrf: boolean;
  management_fee: ManagementFee;
  in_progress: boolean;
  value: number;
  source: string;
  lease_type: string;
  property: Property;
  tenants: Tenant[];
  invoice_items_value: number;
}

export interface Insurance {
  status: string;
  start_at: string;
  description: string;
  insurance_id: number;
  notes: string;
  company_type: any;
  value: number;
  end_at: string;
  source: string;
  installment_value: number;
  installments: number;
  assistance: string;
  base_value: number;
}

export interface ManagementFee {
  percent: number;
  management_type: string;
  first_rent_percent: number;
  first_rent_value: number;
  value: number;
}

export interface Property {
  city: string;
  owners: Owner[];
  code: string;
  neighborhood: string;
  address_complement: string;
  cover_photo: CoverPhoto;
  zipcode: string;
  state: string;
  db_id: number;
  address: string;
  property_type: string;
}

export interface Owner {
  code: string;
  neighborhood: string;
  landlord_account_id: string;
  pix: Pix[];
  crisp_people_id: any;
  city: string;
  state: string;
  company_name: any;
  person_id: any;
  percentage: number;
  type: string;
  email: string;
  cnpj?: string;
  db_id: number;
  profile_image_url: any;
  phone: Phone[];
  address: string;
  active: boolean;
  emails: string[];
  name: string;
  address_complement: string;
  '5671792128557056'?: string;
  trading_name?: string;
  user_db_id: any;
  rg: any;
  firstname?: string;
  lastname?: string;
  cpf?: string;
  fullname?: string;
}

export interface Pix {
  default: boolean;
  pix_key_type: string;
  pix_key: string;
}

export interface Phone {
  type: string;
  number: string;
  country_code?: string;
  alpha2Code: string;
}

export interface CoverPhoto {
  url: string;
  db_id: number;
}

export interface Tenant {
  code: string;
  neighborhood: string;
  user_db_id: any;
  pix: any[];
  crisp_people_id: any;
  city: string;
  state: string;
  rg?: string;
  type: string;
  email: string;
  db_id: number;
  firstname: string;
  lastname: string;
  profile_image_url: any;
  phone: Phone2[];
  address: string;
  active: boolean;
  emails: string[];
  address_complement?: string;
  payer: boolean;
  cpf: string;
  fullname: string;
}

export interface Phone2 {
  type: string;
  number: string;
  country_code?: string;
  alpha2Code: string;
}

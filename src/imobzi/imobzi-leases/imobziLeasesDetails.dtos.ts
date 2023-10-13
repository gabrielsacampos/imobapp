export interface ImobziLeaseDetailsDTO {
  files: any[];
  receipt_method: string;
  code: string;
  next_invoice_end_at: string;
  guaranteed: boolean;
  last_annual_readjustment_at: string;
  next_invoice_due_date: string;
  updated_at: string;
  beneficiaries: ImobziLeaseBeneficiaryDTO[];
  lease_type: string;
  value: number;
  duration: number;
  interest_percent_late_payment: number;
  daily_value: number;
  next_invoice_value: number;
  management_fee: ManagementFee;
  guarantee: Guarantee;
  has_invoice: boolean;
  billing_mode: string;
  notification: Notification;
  irrf_management_fee_discount: boolean;
  next_invoice_start_at: string;
  indeterminate: boolean;
  tenants: Tenant[];
  onlending: Onlending;
  source: string;
  nota_fiscal: boolean;
  create_onlending_item: boolean;
  agreements: any[];
  onlending_charge: boolean;
  deal_key: any;
  vacation_rental_receipt_option: VacationRentalReceiptOption;
  status: string;
  db_id: number;
  start_at: string;
  insurances: Insurance[];
  checklist: Checklist[];
  next_invoice_generate_days_before: number;
  first_rental_in_next_invoice: boolean;
  irrf: boolean;
  in_progress: boolean;
  duration_type: string;
  first_rental_installment: any[];
  fine_charge: boolean;
  next_invoice_generate_in: string;
  include_in_dimob: boolean;
  fine_percent_late_payment: number;
  items: ImobziLeaseItemDTO[];
  created_at: string;
  end_at: string;
  guarantee_amount_months: number;
  annual_readjustment: AnnualReadjustment;
  termination: any;
  interest_charge: boolean;
  property: Property;
  initial_value: number;
  due_day: string;
}

export interface ImobziLeaseBeneficiaryDTO {
  code?: string;
  neighborhood?: string;
  landlord_account_id?: string;
  review_pending?: boolean;
  media_source?: any;
  integrations?: any[];
  private?: boolean;
  pix?: Pix[];
  opening_date?: any;
  crisp_people_id?: any;
  onlending_value?: number;
  profile_image_key?: any;
  city?: string;
  bank_data_key?: any;
  network_group_member_shared?: boolean;
  percent?: number;
  zipcode?: string;
  state_registration?: any;
  state?: string;
  company_name?: any;
  latitude?: number;
  type?: string;
  email?: string;
  cnpj?: string;
  db_id?: number;
  tags?: string[];
  municipal_registration?: string;
  split_pix?: any;
  profile_image_url?: any;
  updated_at?: string;
  social_network?: any[];
  phone?: Phone[];
  address?: string;
  active?: boolean;
  onlending_date?: any;
  password?: any;
  has_deal?: boolean;
  address_complement?: string;
  emails?: string[];
  name?: string;
  country?: string;
  created_at?: string;
  favorite?: boolean;
  longitude?: number;
  '5671792128557056'?: string;
  site?: any;
  trading_name?: string;
}

export interface Pix {
  default: boolean;
  pix_key_type: string;
  pix_key: string;
}

export interface Phone {
  type: string;
  number: string;
  country_code: any;
  alpha2Code: string;
}

export interface ManagementFee {
  first_rent_percent?: number;
  management_type?: string;
  percent?: number;
  value?: number;
  first_rent_value?: number;
}

export interface Guarantee {
  start_at?: string;
  guarantee_type?: string;
  sponsors?: Sponsor[];
  end_at?: string;
  sponsor?: Sponsor2;
  sponsor_key?: any;
  details?: Details;
}

export interface Sponsor {
  code: string;
  neighborhood: string;
  review_pending: boolean;
  media_source: any;
  profession: any;
  integrations: any[];
  private: boolean;
  pix: any[];
  longitude: number;
  crisp_people_id: any;
  profile_image_key: any;
  city: string;
  network_group_member_shared: boolean;
  zipcode: string;
  emails: string[];
  user_db_id: any;
  state: string;
  rg: any;
  latitude: number;
  type: string;
  email: string;
  db_id: number;
  firstname: string;
  tags: string[];
  lastname: string;
  profile_image_url: any;
  updated_at: string;
  social_network: any[];
  phone: Phone2[];
  birthday: any;
  address: string;
  active: boolean;
  nationality: any;
  password: any;
  has_deal: boolean;
  address_complement: string;
  country: any;
  created_at: string;
  marital_status: any;
  favorite: boolean;
  cpf: string;
  gender: string;
  fullname: string;
}

export interface Phone2 {
  type: string;
  number: string;
  country_code: string;
  alpha2Code: string;
}

export interface Sponsor2 {
  code?: string;
  neighborhood?: string;
  review_pending?: boolean;
  media_source?: any;
  profession?: any;
  integrations?: any[];
  private?: boolean;
  pix?: any[];
  longitude?: number;
  crisp_people_id?: any;
  profile_image_key?: any;
  city?: string;
  network_group_member_shared?: boolean;
  zipcode?: string;
  emails?: string[];
  user_db_id?: any;
  state?: string;
  rg?: any;
  latitude?: number;
  type?: string;
  email?: string;
  db_id?: number;
  firstname?: string;
  tags?: string[];
  lastname?: string;
  profile_image_url?: any;
  updated_at?: string;
  social_network?: any[];
  phone?: Phone3[];
  birthday?: any;
  address?: string;
  active?: boolean;
  nationality?: any;
  password?: any;
  has_deal?: boolean;
  address_complement?: string;
  country?: any;
  created_at?: string;
  marital_status?: any;
  favorite?: boolean;
  cpf?: string;
  gender?: string;
  fullname?: string;
}

export interface Phone3 {
  type: string;
  number: string;
  country_code: string;
  alpha2Code: string;
}

export interface Details {
  bail_type?: string;
  value?: number;
  description?: string;
}

export interface Notification {
  send_guarantee_closeduedate_to_tenant: boolean;
  send_notification_readjustment: boolean;
  send_whatsapp_notification_readjustment: boolean;
  send_due_notification_to_sponsor: boolean;
  send_onlending_to_landlord: boolean;
  send_insurance_closeduedate_to_tenant: boolean;
  send_landlord_onlending_whatsapp: boolean;
  send_invoice_to_tenant: boolean;
  send_overdue_notification_to_tenant: boolean;
  send_invoice_to_tenant_whatsapp: boolean;
}

export interface Tenant {
  code?: string;
  neighborhood?: string;
  review_pending?: boolean;
  media_source?: any;
  profession?: any;
  integrations?: any[];
  private?: boolean;
  pix?: any[];
  cpf?: string;
  crisp_people_id?: any;
  profile_image_key?: any;
  city?: string;
  network_group_member_shared?: boolean;
  zipcode?: string;
  has_deal?: boolean;
  user_db_id?: any;
  state?: string;
  rg?: any;
  latitude?: number;
  type?: string;
  email?: string;
  db_id?: number;
  firstname?: string;
  tags?: string[];
  lastname?: string;
  profile_image_url?: any;
  updated_at?: string;
  social_network?: any[];
  phone?: Phone4[];
  birthday?: any;
  address?: string;
  active?: boolean;
  nationality?: any;
  password?: any;
  emails?: string[];
  address_complement?: string;
  payer?: boolean;
  country?: any;
  created_at?: string;
  marital_status?: any;
  favorite?: boolean;
  longitude?: number;
  gender?: string;
  fullname?: string;
}

export interface Phone4 {
  type: string;
  number: string;
  country_code: string;
  alpha2Code: string;
}

export interface Onlending {
  fixed_day: string;
  amount_days: number;
  onlending_mode: string;
  mode: string;
  onlending_type: string;
}

export interface VacationRentalReceiptOption {
  installments: any[];
  method: string;
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

export interface Checklist {
  details: any;
  checked: boolean;
  description: string;
  name: string;
  order: number;
}

export interface ImobziLeaseItemDTO {
  landlords: any[];
  due_date: Date;
  repeat_total: number;
  description: string;
  bar_code: string;
  charge_management_fee: boolean;
  recurrent: boolean;
  value: number;
  item_type: any;
  until_due_date: boolean;
  behavior: string;
  autopay_on_due_date: boolean;
  repeat_index: number;
  include_in_dimob: boolean;
  contact_key: any;
  start_date: string;
}

export interface AnnualReadjustment {
  db_id: string;
  name: string;
}

export interface Property {
  city?: string;
  owners?: Owner[];
  code?: string;
  neighborhood?: string;
  address_complement?: string;
  fields?: Fields;
  cover_photo?: CoverPhoto;
  zipcode?: string;
  state?: string;
  db_id?: number;
  address?: string;
  property_type?: string;
}

export interface Owner {
  code: string;
  neighborhood: string;
  landlord_account_id: string;
  review_pending: boolean;
  media_source: any;
  integrations: any[];
  private: boolean;
  pix: Pix2[];
  rate: any;
  opening_date: any;
  crisp_people_id: any;
  profile_image_key: any;
  city: string;
  network_group_member_shared: boolean;
  zipcode: string;
  state_registration: any;
  state: string;
  company_name: any;
  person_id: any;
  percentage: number;
  type: string;
  email: string;
  cnpj: string;
  db_id: number;
  tags: string[];
  municipal_registration: string;
  profile_image_url: any;
  updated_at: string;
  social_network: any[];
  latitude: number;
  address: string;
  active: boolean;
  password: any;
  has_deal: boolean;
  address_complement: string;
  emails: string[];
  name: string;
  phone: Phone5[];
  country: string;
  created_at: string;
  favorite: boolean;
  longitude: number;
  '5671792128557056': string;
  site: any;
  trading_name: string;
}

export interface Pix2 {
  default: boolean;
  pix_key_type: string;
  pix_key: string;
}

export interface Phone5 {
  type: string;
  number: string;
  country_code: any;
  alpha2Code: string;
}

export interface Fields {
  additional_values: AdditionalValue[][];
}

export interface AdditionalValue {
  default: boolean;
  group_position: number;
  required: boolean;
  name: string;
  active: boolean;
  position: string;
  configuration: Configuration;
  field_id: string;
  value?: number;
  group_name: string;
}

export interface Configuration {
  typecommercial: boolean;
  multiple: boolean;
  typeresidential: boolean;
  url: any;
  typebox: boolean;
  typevalue: string;
  typelandlot: boolean;
  mask: string;
  require_value: any;
  inactive: boolean;
  showingroup: boolean;
  values: string[];
  validate: string;
  type: string;
  typerural: boolean;
  description: string;
}

export interface CoverPhoto {
  url: string;
  db_id: number;
}

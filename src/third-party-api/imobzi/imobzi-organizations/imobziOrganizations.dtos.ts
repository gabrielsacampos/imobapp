export interface ImobziOrganizationDTO {
  code?: string;
  landlord_account_id?: any;
  review_pending?: boolean;
  media_source?: any;
  private?: boolean;
  pix?: any[];
  manager?: any;
  managers_shared?: any[];
  bank_data?: any[];
  network_group_member_shared?: boolean;
  properties?: any[];
  location?: string;
  email: string;
  db_id: number;
  tags?: string[];
  profile_image_url?: any;
  social_network?: any[];
  phone: Phone;
  db_key?: string;
  active?: boolean;
  emails?: string[];
  cellphone?: any;
  name: string;
  persons?: Person[];
  fields?: Fields;
  favorite?: boolean;
}

export interface Phone {
  type?: string;
  number: string;
  country_code?: string;
  alpha2Code?: string;
}

export interface Person {
  code?: string;
  name?: string;
  profile_image_url?: any;
  person_id: number;
  associate_type: string;
  action?: string;
  id?: number;
}

export interface Fields {
  group_contact?: GroupContact[][];
  social_network?: SocialNetwork[][];
  group_company_data?: GroupCompanyDaum[][];
  group_address?: GroupAddress[][];
}

export interface GroupContact {
  default: boolean;
  group_position: number;
  required: boolean;
  name: string;
  active: boolean;
  position: string;
  configuration: Configuration;
  field_id: any;
  value?: any[];
  group_name: string;
}

export interface Configuration {
  typevalue: string;
  mask: string;
  values: string[];
  showingroup: boolean;
  validate: string;
  type: string;
}

export interface SocialNetwork {
  default: boolean;
  group_position: number;
  required: boolean;
  name: string;
  active: boolean;
  position: string;
  configuration: Configuration2;
  field_id: string;
  value: any[];
  group_name: string;
}

export interface Configuration2 {
  typevalue: string;
  mask: string;
  values: any[];
  showingroup: boolean;
  validate: string;
  type: string;
}

export interface GroupCompanyDaum {
  default?: boolean;
  group_position?: number;
  required?: boolean;
  name?: string;
  active?: boolean;
  position?: string;
  configuration?: Configuration3;
  field_id?: string;
  value?: string;
  group_name?: string;
}

export interface Configuration3 {
  typevalue: string;
  mask: string;
  values: string[];
  showingroup: boolean;
  validate: string;
  type: string;
}

export interface GroupAddress {
  default?: boolean;
  group_position?: number;
  required?: boolean;
  name?: string;
  active?: boolean;
  position?: string;
  configuration?: Configuration4;
  field_id?: string;
  value?: string;
  group_name?: string;
}

export interface Configuration4 {
  typevalue: string;
  mask: string;
  values: string[];
  showingroup: boolean;
  validate: string;
  type: string;
}

export interface ImobziPersonDTO {
  code: string;
  landlord_account_id: any;
  review_pending: boolean;
  media_source: string;
  private: boolean;
  pix: any[];
  manager: Manager;
  crisp_people_id: any;
  managers_shared: any[];
  bank_data: any[];
  network_group_member_shared: boolean;
  associated_with: any[];
  properties: any[];
  location: string;
  email: string;
  db_id: number;
  firstname: string;
  tags: string[];
  lastname: string;
  organizations_associated: any[];
  profile_image_url: any;
  social_network: any[];
  phone: Phone;
  birthday: boolean;
  db_key: string;
  persons_associated: any[];
  active: boolean;
  emails: string[];
  cellphone: any;
  fields: Fields;
  favorite: boolean;
  media_sources: MediaSource[];
  fullname: string;
}

export interface Manager {
  db_id: number;
  type: string;
  id: string;
  user: User;
}

export interface User {
  fullname: string;
  db_id: string;
  email: string;
  profile_image_url: any;
}

export interface Phone {
  type: string;
  number: string;
  country_code: string;
  alpha2Code: string;
}

export interface Fields {
  group_contact?: GroupContact[][];
  social_network?: SocialNetwork[][];
  group_personal?: GroupPersonal[][];
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
  field_id: string;
  value?: any[];
  group_name: string;
}

export interface Configuration {
  multiple: boolean;
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
  multiple: boolean;
  typevalue: string;
  mask: string;
  values: any[];
  showingroup: boolean;
  validate: string;
  type: string;
}

export interface GroupPersonal {
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
  multiple: boolean;
  typevalue: string;
  mask: string;
  values: string[];
  showingroup: boolean;
  validate: string;
  type: string;
}

export interface GroupAddress {
  default: boolean;
  group_position: number;
  required: boolean;
  name: string;
  active: boolean;
  position: string;
  configuration: Configuration4;
  field_id: string;
  value: any;
  group_name: string;
}

export interface Configuration4 {
  multiple: boolean;
  typevalue: string;
  mask: string;
  values: string[];
  showingroup: boolean;
  validate: string;
  type: string;
}

export interface MediaSource {
  date: string;
  name: string;
}

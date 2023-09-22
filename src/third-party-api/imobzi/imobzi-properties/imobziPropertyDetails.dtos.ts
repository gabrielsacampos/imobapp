export interface PropertyDetailsDTO {
  code: string;
  neighborhood: string;
  features: Features;
  links: any[];
  multimidias: any[];
  elevators: number;
  sun_position: string;
  has_lease_linked: boolean;
  alternative_code: string;
  site_highlights_section: any;
  updated_at: string;
  zipcode: string;
  buildings: number;
  vacation_rental: boolean;
  bedroom: number;
  lot_measure_behind: number;
  property_type: string;
  stage: string;
  building_name: string;
  city: string;
  bathroom: number;
  photos_count: number;
  network: any;
  area: number;
  lot_area: number;
  property_dimension: string;
  visit_only_realtor: boolean;
  site_url: string;
  state: string;
  property_block: string;
  site_title: string;
  lot_measure_left: number;
  latitude: number;
  suite: number;
  proposal: any;
  lot_measure_radius: number;
  rental_value: number;
  member_register_code: any;
  unit_floor: number;
  status: string;
  lot_measure_front: number;
  url_share: string;
  db_id: number;
  useful_area: number;
  description: string;
  visit_time: string;
  cover_photo: CoverPhoto;
  property_calendar: any[];
  lot_measure_right: number;
  nearby: string[];
  photos: Photos;
  built: number;
  property_unity: number;
  finality: string;
  address: string;
  active: boolean;
  site_highlights_position: number;
  cover_photo_private: CoverPhotoPrivate;
  building: boolean;
  building_id: number;
  owners: Owner[];
  measure_type: string;
  address_complement: string;
  new_code: string;
  database: string;
  has_contract_linked: boolean;
  fields: Fields;
  created_at: string;
  lot_measure_type: string;
  property_situation: string;
  sale_value: number;
  longitude: number;
  units_per_floor: number;
  garage: number;
  site_description: string;
  floors: number;
  building_code: string;
  country: string;
  site_meta_description: string;
  key_id: string;
  available_digital_real_estate: boolean;
  site_publish: boolean;
  site_publish_price: boolean;
  send_owner_property_review: boolean;
}

export interface Features {}

export interface CoverPhoto {
  url: string;
  db_id: number;
}

export interface Photos {}

export interface CoverPhotoPrivate {
  url: string;
  db_id: number;
}

export interface Owner {
  bank_data: BankData;
  code: string;
  name: string;
  phones: Phone[];
  profile_image_url: any;
  id: number;
  rate: any;
  percentage: number;
  type: string;
  email: string[];
}

export interface BankData {
  bank_name: string;
  account: string;
  db_id: number;
  account_type: string;
  notes: string;
  agency: string;
  id: number;
}

export interface Phone {
  type: string;
  number: string;
  country_code: any;
  alpha2Code: string;
}

export interface Fields {
  guarantee: Guarantee[][];
  Exigências: Exigncum[][];
  additional_values: AdditionalValue[][];
  Outros: Outro[][];
}

export interface Guarantee {
  default: boolean;
  group_position: number;
  required: boolean;
  name: string;
  active: boolean;
  position: string;
  configuration: Configuration;
  field_id: string;
  value?: boolean;
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

export interface Exigncum {
  default: boolean;
  group_position: number;
  required: boolean;
  name: string;
  active: boolean;
  position: string;
  configuration: Configuration2;
  field_id: string;
  value: any;
  group_name: string;
}

export interface Configuration2 {
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

export interface AdditionalValue {
  default: boolean;
  group_position: number;
  required: boolean;
  name: string;
  active: boolean;
  position: string;
  configuration: Configuration3;
  field_id: string;
  value?: number;
  group_name: string;
}

export interface Configuration3 {
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

export interface Outro {
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

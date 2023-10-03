export interface ImobziPropertyDetailsDTO {
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
  owners: ImobziPropertyOwnerDTO[];
  measure_type: string;
  address_complement: string;
  new_code: string;
  database: string;
  has_contract_linked: boolean;
  created_at: string;
  lot_measure_type: string;
  property_situation: any;
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

export interface ImobziPropertyOwnerDTO {
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

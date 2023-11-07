export interface ImobziPropertiesDTO {
  count: number;
  count_review: number;
  count_pending: number;
  database: string;
  properties: PropertyDTO[];
  cursor: any;
  networks: any[];
}

export interface PropertyDTO {
  status?: string;
  code?: string;
  neighborhood?: string;
  deal_stage?: string;
  alternative_code?: string;
  updated_at?: string;
  bedroom?: number;
  site_publish?: boolean;
  property_type?: string;
  vacation_rental?: boolean;
  building_name?: string;
  city?: string;
  bathroom?: number;
  area?: number;
  lot_area?: number;
  zipcode?: string;
  latitude?: any;
  suite?: number;
  stage?: string;
  rental_value?: number;
  member_register_code?: any;
  building_parameters?: BuildingParameters;
  db_id?: string;
  description?: string;
  cover_photo?: CoverPhoto;
  finality?: string;
  address?: string;
  active?: boolean;
  cover_photo_private?: CoverPhotoPrivate;
  building?: boolean;
  address_complement?: string;
  country?: string;
  created_at?: string;
  property_situation?: string;
  sale_value?: number;
  longitude?: any;
  listing_brokers?: any[];
  garage?: number;
  useful_area?: number;
  key_id?: string;
  site_publish_price?: boolean;
  available_digital_real_estate?: boolean;
}

export interface BuildingParameters {}

export interface CoverPhoto {
  url: string;
  db_id: number;
}

export interface CoverPhotoPrivate {
  url: string;
  db_id: number;
}

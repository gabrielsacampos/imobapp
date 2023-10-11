export interface ImobziInvoiceDetailsDTO {
  lease: Lease;
  invoice_url: string;
  subcategory: string;
  payment_method: string;
  send_overdue_notification: boolean;
  paid_at: string;
  payment_authentication: any;
  category: string;
  interest_value: number;
  reference_start_at: string;
  bank_slip_url: string;
  payment_methods_available: string;
  bank_slip_id: string;
  difference_value: number;
  status: string;
  due_date: Date;
  total_value: number;
  barcode: string;
  onlendings_and_fees: OnlendingsAndFees;
  property: Property;
  invoice_paid_manual: any;
  account: Account;
  charge_fee_value: number;
  invoice_id: string;
  created_at: string;
  value: number;
  bank_type: any;
  contact: Contact2;
  items: ImobziInvoiceItem[];
  onlending_split: boolean;
  reference_end_at: string;
  created_manually: any;
  history: History[];
}

export interface Lease {
  status: string;
  db_id: number;
  code: string;
}

export interface OnlendingsAndFees {
  managed_expenses_value: number;
  first_management_fee_value: number;
  management_fee_value: number;
  predicted_onlendings: PredictedOnlending[];
  onlending_value: number;
  predicted_onlending_value: number;
  onlendings: any[];
}

export interface PredictedOnlending {
  custom_json: CustomJson;
  repeat_total: any;
  subcategory: any;
  landlord_transaction_id: string;
  paid_at: any;
  repeat_frequency: any;
  account_debit: any;
  transaction_paid: any;
  landlord_account_id: any;
  category: any;
  invoice_onlending_split: any;
  account_credit: AccountCredit;
  guaranteed_rental_is_paid: any;
  pix_key: any;
  nota_fiscal_key: any;
  transaction_operation_id: any;
  lease: Lease2;
  status: any;
  lease_item_description: any;
  description: any;
  guaranteed_rental: any;
  pix_key_type: any;
  repeat_type: any;
  invoice_id: any;
  created_at: any;
  value: number;
  transaction_type: string;
  financial_transaction_id: any;
  contact: Contact;
  group_id: any;
  lease_item_index: any;
}

export interface CustomJson {}

export interface AccountCredit {
  name: string;
}

export interface Lease2 {
  code: string;
  db_id: number;
}

export interface Contact {
  db_id: number;
  type: string;
  name: string;
  profile_image_url: any;
}

export interface Property {
  code: string;
  city: string;
  state: string;
  db_id: number;
  neighborhood: string;
  address_complement: string;
  address: string;
  owners: Owner[];
  cover_photo: CoverPhoto;
  zipcode: string;
}

export interface Owner {
  db_id: number;
  name: string;
}

export interface CoverPhoto {
  url: string;
  db_id: number;
}

export interface Account {
  db_id: number;
  name: string;
}

export interface Contact2 {
  cnpj: any;
  code: string;
  name: string;
  cpf: string;
  db_id: number;
  type: string;
  email: string[];
}

export interface ImobziInvoiceItem {
  until_due_date: boolean;
  item_type?: string;
  contact: any;
  invoice_item_id: string;
  description: string;
  behavior: string;
  landlords: any[];
  include_in_dimob: boolean;
  charge_management_fee: boolean;
  value: number;
  due_date?: string;
}

export interface History {
  created_at: string;
  history_type: string;
  description: string;
}

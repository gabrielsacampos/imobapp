export interface ImobziInvoiceDTO {
  count: number;
  next_page: number;
  total_pending: number;
  invoices: ImobziInvoiceDTO[];
  total_paid: number;
  total_overdue: number;
  total: number;
}

export interface InvoicesDTO {
  status: string;
  due_date: string;
  interest_value: number;
  charge_fee_value: number;
  invoice_url: string;
  subcategory: string;
  category: string;
  total_value: number;
  payment_method: string;
  invoice_id: string;
  account: Account;
  contract: Contract;
  bank_slip_url: string;
  contact: Contact;
  payment_methods_available: string;
  paid_at: string;
  onlending_split: boolean;
  property: Property;
  bank_slip_id: string;
  difference_value: number;
}

export interface Account {
  db_id: number;
  name: string;
}

export interface Contract {
  contract_type: string;
}

export interface Contact {
  cnpj?: string;
  code: string;
  name: string;
  cpf?: string;
  db_id: number;
  type: string;
  email: string[];
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

export interface GetPaidItemDTO {
  id_imobzi: string;
  account_credit: string;
  description: string;
  value: number;
  paid_at: string;
  credit_at: string;
  unity: string;
  block: string;
  building: string;
  paid_manual?: boolean;
}

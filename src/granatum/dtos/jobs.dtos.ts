export interface JobSetGranatumIdsDTO {
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
  id_account_granatum: number;
  id_cost_center_granatum?: number;
  id_category_granatum: number;
}

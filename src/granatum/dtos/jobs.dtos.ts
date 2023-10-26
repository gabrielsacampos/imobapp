import { PartialType } from '@nestjs/mapped-types';
import { GetPaidInvoicesDTO } from 'src/repository/invoices/dtos/return-invoice.queries.dtos';

export class SetGranatumIdsDTO extends PartialType(GetPaidInvoicesDTO) {
  onlending_value?: number;
  id_account_granatum?: number;
  id_cost_center_granatum?: number;
  id_category_granatum?: number;
  id_suplier_client?: number;
  beneficiary_cpf?: string;
  beneficiary_cnpj?: string;
  id_imobzi?: string;
  behavior?: string;
  value?: number;
  paid_at?: string;
  credit_at?: string;
}

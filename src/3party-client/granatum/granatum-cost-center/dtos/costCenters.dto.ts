export interface CostCenterDTO {
  id: number;
  descricao: string;
  ativo: boolean;
  centros_custo_lucro_filhos: CostCenterChildDTO[];
}

export interface CostCenterChildDTO {
  id: number;
  descricao: string;
  parent_id: number;
  ativo: boolean;
  centros_custo_lucro_filhos: CostCenterChildDTO[];
}

export interface GranatumTransactionPostDTO {
  descricao: string;
  categoria_id: number;
  valor: number;
  conta_id: number;
  data_vencimento: string;
  data_pagamento?: string;
  data_competencia?: string;
  centro_custo_lucro_id?: number;
  forma_pagamento_id?: number;
  pessoa_id?: number;
  tipo_custo_nivel_producao_id?: number;
  tipo_custo_apropriacao_produto_id?: number;
  tags?: [{ id: number }];
  itens_adicionais: [];
}

export interface GranatumTransactionItemsPostDTO {
  tags: Tag[];
  descricao: string;
  categoria_id: number;
  centro_custo_lucro_id?: number;
  valor: number;
}

export interface Tag {
  id: number;
}

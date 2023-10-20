export interface GranatumCategoryDTO {
  id: number;
  descricao: string;
  cor: string;
  wgi_usuario_id: number;
  ativo: boolean;
  tipo_categoria_id: number;
  categorias_filhas: ChildCategory[];
}

export interface ChildCategory {
  id: number;
  descricao: string;
  cor: string;
  parent_id: number;
  ativo: boolean;
  tipo_categoria_id: number;
  categorias_filhas: any[];
}

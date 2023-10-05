export interface GranatumCategoriesDTO {
  id: number;
  descricao: string;
  parent_id: string;
  ativo: boolean;
  tipo_categoria_id: number;
  categorias_filhas: any[];
}

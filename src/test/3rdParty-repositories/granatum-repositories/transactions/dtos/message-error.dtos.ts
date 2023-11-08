export interface RootErrorMessage {
  formatHasError: boolean;
  childMessageError: ChildMessageError[];
  motherMessageError: MotherMessageError;
}

export interface ChildMessageError {
  categoria_id: string;
  descricao: string;
  indexHasError: boolean;
  itemIndex: number;
}

export interface MotherMessageError {
  categoria_id: string;
  conta_id: string;
  data_vencimento: string;
  descricao: string;
}

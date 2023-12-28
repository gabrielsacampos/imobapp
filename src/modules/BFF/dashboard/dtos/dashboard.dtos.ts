export class TopCardsDTO {
  leases: TopCardsLeasesDTO;
  invoices: TopCardsInvoicesDTO;
}

export class TopCardsLeasesDTO {
  activeCount: number;
  totalValue: number;
  ticket: number;
  renewsCount: number;
  readjustmentCount: number;
}

export class TopCardsInvoicesDTO {
  totalPending: number;
  pendingCount: number;
}

export class ChartsData {
  buildingsRevenueData: BuildingsRevenueDataDTO;
}

export class BuildingsRevenueDataDTO {
  groupedToChart: unknown;
  buildings: string[];
}

export class TablesDataDTO {
  expiringLeases: any[];
  availableProperties: any[];
}

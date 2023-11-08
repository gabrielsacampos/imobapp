export class GranatumAccountsMock {
  allAcounts = accountMocks;
  async getAll() {
    return this.allAcounts;
  }
}

export const accountMocks = [
  {
    id: 106952,
    descricao: ' Cobrança Imobzi',
    permite_lancamento: true,
    ativo: true,
    saldo: '0.00',
  },
  {
    id: 106953,
    descricao: ' Cobrança Imobzi',
    permite_lancamento: true,
    ativo: true,
    saldo: '0.00',
  },
  {
    id: 106274,
    descricao: 'Banco da Amazônia S.A.',
    permite_lancamento: true,
    ativo: true,
    saldo: '0.00',
  },
  {
    id: 104331,
    descricao: 'Banco do Brasil S.A.',
    permite_lancamento: true,
    ativo: true,
    saldo: '52810.87',
  },
  {
    id: 103796,
    descricao: 'Banco Inter',
    permite_lancamento: true,
    ativo: true,
    saldo: '660216.86',
  },
  {
    id: 104236,
    descricao: 'Conta Proprietário',
    permite_lancamento: true,
    ativo: true,
    saldo: '99064.48',
  },
  {
    id: 104193,
    descricao: 'PJBank - Imobzi',
    permite_lancamento: true,
    ativo: true,
    saldo: '-202031.97',
  },
];

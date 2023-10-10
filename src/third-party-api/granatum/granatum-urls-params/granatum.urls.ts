import * as dotenv from 'dotenv';
dotenv.config();

export const granatumUrls = {
  posTransaciontsUrl(): string {
    return `https://api.granatum.com.br/v1/lancamentos?access_token=${process.env.GRANATUM_CORRETAGEM_KEY}`;
  },

  allCategoriesUrl(): string {
    return `https://api.granatum.com.br/v1/categorias?access_token=${process.env.GRANATUM_CORRETAGEM_KEY}`;
  },

  allCostCentersUrl(): string {
    return `https://api.granatum.com.br/v1/centros-custo-lucro?access_token=${process.env.GRANATUM_CORRETAGEM_KEY}`;
  },

  allAccountsUrl(): string {
    return `https://api.granatum.com.br/v1/contas?access_token=${process.env.GRANATUM_CORRETAGEM_KEY}`;
  },
};

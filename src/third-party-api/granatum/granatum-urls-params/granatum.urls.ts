export const granatumUrls = {
  posTransaciontsUrl(): string {
    return `https://api.granatum.com.br/v1/lancamentos?access_token=${process.env.GRANATUM_CORRETAGEM_KEY}`;
  },

  allCategoriesUrl(): string {
    return `https://api.granatum.com.br/v1/categorias?access_token=${process.env.GRANATUM_CORRETAGEM_KEY}`;
  },
  // accountsUrls(accountId: number | string, id?: number | string): string {
  //   if (id) {
  //     return `https://api.granatum.com.br/v1/lancamentos/${id}?access_token=${process.env.GRANATUM_CORRETAGEM_KEY}&conta_id=${accountId}`;
  //   } else {
  //     return `https://api.granatum.com.br/v1/lancamentos?access_token=${process.env.GRANATUM_CORRETAGEM_KEY}&conta_id=${accountId}`;
  //   }
  // },
};

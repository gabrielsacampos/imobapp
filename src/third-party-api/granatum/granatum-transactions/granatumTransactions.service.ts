import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { granatumUrls } from '../granatum-urls-params/granatum.urls';
import { GranatumTransactionPostDTO } from './granatumTransacationsPost.dtos';

@Injectable()
export class GranatumTransactionsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,

    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  // formatInvoicesToPost(invoicesFromDb): Promise<any> {
  //   invoicesFromDb.reduce((acc, curr) => {
  //     const key = acc.credit_at + '|' + acc.account_credit;

  //     if (acc[key]) {
  //       // the main item Refers to the payment method.
  //       acc[key].valor -= curr.bank_fee_value;
  //       acc[key].itens_adicionais[0].valor += curr.interest_value;
  //     } else {
  //       acc[key] = {
  //         tags: [{ id: 59943 }],
  //         observacao: 'faturas pagas em: ' + curr.paid_at + ' e creditadas em: ' + curr.credit_at,
  //         conta_id: curr.accountGranatumId,
  //         categoria_id: 1843956, // already defined id to this category at Granatum
  //         data_vencimento: curr.credit_at,
  //         data_pagamento: curr.credit_at,
  //         valor: 0 - curr.bank_fee_value,
  //         descricao: curr.paid_manual ? ' Transferência recebida' : ' Cobrança Imobzi',
  //         itens_adicionais: [
  //           //this item of array we gonna set to defined category so we can accumulate values while reduce loop the array
  //           {
  //             tags: [{ id: 59943 }],
  //             descricao: 'Juros e multa de faturas',
  //             categoria_id: 1848070,
  //             valor: curr.interest_value,
  //           },
  //         ],
  //       };
  //     }
  //     acc[key].itens_adicionais.push(...extractOnlyItems(curr));
  //     return acc;
  //   }, {});
  // }
}

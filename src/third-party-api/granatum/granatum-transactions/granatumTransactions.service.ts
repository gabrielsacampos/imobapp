import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/database/prisma.service';
import { granatumUrls } from '../granatum-urls-params/granatum.urls';
import { GranatumTransactionPostDTO } from './granatumTransacationsPost.DTO';

@Injectable()
export class GranatumTransactionsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  //   async postTransaction(): Promise<any> {
  //     const result = await this.prisma.invoice.findMany({
  //       where: {
  //         credit_at: {
  //           lte: new Date('2023-05-01'),
  //           get: new Date('2023-05-30'),
  //         },
  //       },
  //     });

  //     try {
  //       const { data, status } = await this.httpService.axiosRef.post(granatumUrls.posTransaciontsUrl(), transactionData);
  //       if (status === 201) {
  //         this.logger.verbose(`Transaction Posted on Granatum > id: ${data.id}`);
  //       }
  //     } catch (error) {
  //       this.logger.error(`Transaction error on Granatum > ${error.response.data}`);
  //       throw new Error(`${error.response.data}`);
  //     }
  //   }
}

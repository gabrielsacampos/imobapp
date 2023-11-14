import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { granatumUrls } from '../granatum-urls-params/granatum.urls';
import { GranatumTransactionPostDTO } from './dtos/granatum-transactions.dtos';

@Injectable()
export class GranatumTransactionsRepository {
  constructor(private readonly httpService: HttpService) {}

  async post(dataReadyToPost: GranatumTransactionPostDTO): Promise<any> {
    const { status, data } = await this.httpService.axiosRef.post(granatumUrls.posTransaciontsUrl(), dataReadyToPost);
    return { status, ...data.id };
  }
}

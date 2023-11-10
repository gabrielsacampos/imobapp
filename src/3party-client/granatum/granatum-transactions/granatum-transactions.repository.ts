import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { granatumUrls } from '../granatum-urls-params/granatum.urls';
import { GranatumTransactionPostDTO } from './dtos/granatum-transactions.dtos';

@Injectable()
export class GranatumTransactionsRepository {
  constructor(private readonly httpService: HttpService) {}

  async post(invoiceReadyToPost: GranatumTransactionPostDTO): Promise<any> {
    try {
      const { status, data } = await this.httpService.axiosRef.post(
        granatumUrls.posTransaciontsUrl(),
        invoiceReadyToPost,
      );
      return { status, ...data.id };
    } catch (error) {
      const errorResponse: any = {};
      errorResponse.code = error.code;
      errorResponse.status = error.status;
      errorResponse.errorFormat = error.response.data.errors;
      throw new Error(JSON.stringify(errorResponse, null, 1));
    }
  }
}

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { granatumUrls } from '../granatum-urls-params/granatum.urls';
import { GranatumAccountDTO } from './dtos/granatum-accounts.dtos';

@Injectable()
export class GranatumAccountsRepository {
  constructor(private readonly httpService: HttpService) {}

  async getAll(): Promise<GranatumAccountDTO[]> {
    const { data } = await this.httpService.axiosRef.get(granatumUrls.allAccountsUrl());
    return data;
  }
}

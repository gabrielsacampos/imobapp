import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { granatumUrls } from '../granatum-urls-params/granatum.urls';

@Injectable()
export class GranatumSupliersRepository {
  constructor(private readonly httpService: HttpService) {}

  async getAll() {
    const { data } = await this.httpService.axiosRef.get(granatumUrls.allSupliersUrl());
    return data;
  }
}

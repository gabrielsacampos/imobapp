import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { granatumUrls } from '../granatum-urls-params/granatum.urls';
import { GranatumCategoryDTO } from './dtos/granatum-categories.dtos';

@Injectable()
export class GranatumCategoriesRepository {
  constructor(private readonly httpService: HttpService) {}

  async getAll(): Promise<GranatumCategoryDTO[]> {
    const { data } = await this.httpService.axiosRef.get(granatumUrls.allCategoriesUrl());
    return data;
  }
}

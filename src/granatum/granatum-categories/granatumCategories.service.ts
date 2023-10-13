import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { granatumUrls } from '../granatum-urls-params/granatum.urls';

@Injectable()
export class GranatumCategoriesService {
  constructor(private readonly httpService: HttpService) {}

  async getSlipCategories() {
    const { data } = await this.httpService.axiosRef.get(granatumUrls.allCategoriesUrl());
    return data.find((element) => {
      return element.descricao === 'Recebimentos por Boleto';
    });
  }
  async findIdByDescription(description: string) {
    const slipCategoryMother = await this.getSlipCategories();

    const cleanedDescription = description
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove accents
      .toLowerCase()
      .split(' ')[0]
      .replace(/\./g, '');

    const foundCategory = slipCategoryMother.categorias_filhas.find((element) => {
      const cleanedElement = element.descricao
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\./g, '');
      return cleanedElement.includes(cleanedDescription);
    });

    if (foundCategory) {
      return foundCategory.id;
    } else {
      return 1838279; // if script do not find the category, return the no_category category id.
    }
  }
}

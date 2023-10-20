import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { granatumUrls } from '../granatum-urls-params/granatum.urls';
import { GranatumCategoryDTO } from './dtos/granatum-categories.dtos';

@Injectable()
export class GranatumCategoriesService {
  constructor(private readonly httpService: HttpService) {}

  async getSlipCategories(): Promise<GranatumCategoryDTO> {
    const { data } = await this.httpService.axiosRef.get(granatumUrls.allCategoriesUrl());
    return data.find((element) => {
      return element.descricao === 'Recebimentos por Boleto';
    });
  }
  findIdByDescription(description: string, slipCategories: GranatumCategoryDTO) {
    const cleanedDescription = description
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove accents
      .toLowerCase()
      .split(' ')[0]
      .replace(/\./g, '');

    const foundCategory = slipCategories.categorias_filhas.find((element) => {
      const cleanedElement = element.descricao
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\./g, '');
      return cleanedElement.includes(cleanedDescription);
    });

    if (description === 'Taxa de Boleto') {
      return 1843956;
    } else if (foundCategory) {
      return foundCategory.id;
    } else {
      return 1838279; // if script do not find the category, return the no_category category id.
    }
  }
}

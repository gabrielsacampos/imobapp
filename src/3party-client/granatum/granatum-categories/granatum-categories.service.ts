import { Injectable } from '@nestjs/common';
import { GranatumCategoryDTO } from './dtos/granatum-categories.dtos';
import { GranatumCategoriesRepository } from './granatum-categories.repository';

@Injectable()
export class GranatumCategoriesService {
  constructor(private readonly granatumCategoriesRepository: GranatumCategoriesRepository) {}

  private readonly allItems = this.granatumCategoriesRepository.getAll();

  async filterSlip(): Promise<GranatumCategoryDTO> {
    const categories: GranatumCategoryDTO[] = await this.allItems;
    return categories.find((element) => {
      return element.descricao === 'Recebimentos por Boleto';
    });
  }

  async findIdByDescription(description: string) {
    const slipCategories = await this.filterSlip();
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

    if (foundCategory) {
      return foundCategory.id;
    } else if (description === 'Taxa de Boleto') {
      return 1843956;
    } else if (description === 'Repasse') {
      return 1898344;
    } else if (description === 'Comissão de Aluguel') {
      return 1837221;
    } else {
      return 1838279; // if script do not find the category, return the no_category category id.
    }
  }
}

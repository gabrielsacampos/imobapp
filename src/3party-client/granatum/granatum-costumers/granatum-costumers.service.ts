import { Injectable } from '@nestjs/common';
import { GranatumCostumersRepository } from './granatum-costumers.repository';

@Injectable()
export class GranatumCostumersService {
  constructor(private readonly granatumCostumersRepository: GranatumCostumersRepository) {}

  private readonly allItems = this.granatumCostumersRepository.getAll();

  async findIdByDocument(document: string) {
    const costumers = await this.allItems;
    const cleanedDocument = document.replace(/[^\d]/g, '');

    const costumerFound = costumers.find((element) => {
      return element.documento === cleanedDocument;
    });

    if (!costumerFound) {
      throw new Error(`Client document: ${document} not found.`);
    }

    return costumerFound.id;
  }
}

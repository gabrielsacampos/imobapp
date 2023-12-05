import { Injectable } from '@nestjs/common';
import { GranatumSupliersRepository } from './granatum-supliers.repository';

@Injectable()
export class GranatumSupliersService {
  constructor(private readonly granatumSupliersRepository: GranatumSupliersRepository) { }

  private readonly allItems = this.granatumSupliersRepository.getAll();

  async findIdByDocument(document: string) {
    const suplier = await this.allItems;
    const cleanedDocument = document.replace(/[^\d]/g, '');

    const suplierFound = suplier.find((element) => {
      return element.documento === cleanedDocument;
    });

    if (!suplierFound) {
      throw new Error(`Client document: ${document} not found.`);
    }

    return suplierFound.id;
  }
}

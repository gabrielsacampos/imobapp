import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { granatumUrls } from '../granatum-urls-params/granatum.urls';

@Injectable()
export class GranatumSupliersService {
  constructor(private readonly httpService: HttpService) {}

  async getAllSupliers() {
    const { data } = await this.httpService.axiosRef.get(granatumUrls.allSupliersUrl());
    return data;
  }
  async findIdByDocument(document: string) {
    const cleanedDocument = document.replace(/[^\d]/g, '');
    const supliers = await this.getAllSupliers();

    const suplierFound = supliers.find((element) => {
      return element.documento === cleanedDocument;
    });

    if (!suplierFound) {
      throw new Error(`Suplier document: ${document} not found.`);
    }

    return suplierFound.id;
  }
}

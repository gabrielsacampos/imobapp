import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { granatumUrls } from '../granatum-urls-params/granatum.urls';

@Injectable()
export class GranatumClientsService {
  constructor(private readonly httpService: HttpService) {}

  async getAllClients() {
    const { data } = await this.httpService.axiosRef.get(granatumUrls.allClientsUrl());
    return data;
  }
  async findIdByDocument(document: string) {
    const cleanedDocument = document.replace(/[^\d]/g, '');
    const clients = await this.getAllClients();

    const clientFound = clients.find((element) => {
      return element.documento === cleanedDocument;
    });

    if (!clientFound) {
      throw new Error(`Client document: ${document} not found.`);
    }

    return clientFound.id;
  }
}

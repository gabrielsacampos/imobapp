import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { granatumUrls } from '../granatum-urls-params/granatum.urls';

@Injectable()
export class GranatumAccountsService {
  constructor(private readonly httpService: HttpService) {}

  async getAllAccounts() {
    const { data } = await this.httpService.axiosRef.get(granatumUrls.allAccountsUrl());
    return data;
  }

  async findIdByDescription(accountName: string) {
    try {
      const cleanedAccountName = accountName
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // remove accents
        .toLowerCase()
        .split(' ')[0]
        .replace(/\./g, '');
      const accounts = await this.getAllAccounts();

      const accountFound = accounts.find((element) => {
        const cleanedName = element.descricao
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // remove accents
          .toLowerCase();
        return cleanedName.includes(cleanedAccountName);
      });

      return accountFound.id;
    } catch (error) {
      throw new Error(error + `on granatumAccountsService.findIdByDescription`);
    }
  }
}

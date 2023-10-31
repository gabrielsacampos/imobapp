import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { granatumUrls } from '../granatum-urls-params/granatum.urls';
import { GranatumAccountDTO } from './dtos/granatum-accounts.dtos';

@Injectable()
export class GranatumAccountsService {
  constructor(private readonly httpService: HttpService) {}

  async getAllAccounts(): Promise<GranatumAccountDTO[]> {
    const { data } = await this.httpService.axiosRef.get(granatumUrls.allAccountsUrl());
    return data;
  }

  findIdByDescription(accountName: string, allAccounts: GranatumAccountDTO[]) {
    const cleanedAccountName = accountName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove accents
      .toLowerCase()
      .split(' ')[0]
      .replace(/\./g, '');

    const accountFound = allAccounts.find((element) => {
      const cleanedName = element.descricao
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // remove accents
        .toLowerCase();
      return cleanedName.includes(cleanedAccountName);
    });

    return accountFound.id;
  }
}

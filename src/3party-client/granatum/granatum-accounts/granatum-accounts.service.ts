import { Injectable } from '@nestjs/common';
import { GranatumAccountDTO } from './dtos/granatum-accounts.dtos';
import { GranatumAccountsRepository } from './granatum-accounts.repository';

@Injectable()
export class GranatumAccountsService {
  constructor(private readonly granatumAccountsRepository: GranatumAccountsRepository) {}

  private readonly allItems: Promise<GranatumAccountDTO[]> = this.granatumAccountsRepository.getAll();

  async findIdByDescription(accountName: string) {
    const allAccounts: GranatumAccountDTO[] = await this.allItems;

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

import { CreatePersonDTO } from 'src/repository/people/dtos/create-person.dtos';
import * as crypto from 'node:crypto';
import { Person } from 'src/repository/people/entities/person.entity';
import { inMemoryPeopleRepositoryMock } from './inMemoryPeopleRepository.mocks';
import { NotAcceptableException } from '@nestjs/common';
import { PeopleRepository } from 'src/repository/people/people.repository';

export class InMemoryPeopleRepository implements Partial<PeopleRepository> {
  public items: Person[] = inMemoryPeopleRepositoryMock;
  async findExistingCPF(cpf: string) {
    try {
      const found = await this.items.find((person) => person.cpf === cpf);

      if (!found) {
        throw new NotAcceptableException(`Person cpf: ${cpf} not found`);
      }

      return found;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id_imobzi: string) {
    try {
      const found = this.items.find((person) => person.id_imobzi === id_imobzi);
      if (!found) {
        throw new NotAcceptableException(`Person id_imozbi: ${id_imobzi} not found`);
      }

      return found;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(data: CreatePersonDTO) {
    data.id = crypto.randomInt(1, 1000);
    this.items.push(data);
    return data;
  }

  async findAll() {
    return this.items;
  }

  async upsert(data: CreatePersonDTO) {
    const existingPersonIndex = this.items.findIndex((person) => person.id_imobzi === data.id_imobzi);

    if (existingPersonIndex === -1) {
      const personToCreate = data;
      return this.create(personToCreate);
    } else {
      const existingPerson = this.items[existingPersonIndex];
      const existingPersonUpdated = data;
      this.items[existingPersonIndex] = existingPersonUpdated;
      return existingPerson;
    }
  }

  async update(id_imobzi: string, data: CreatePersonDTO) {
    const existingPersonIndex = this.items.findIndex((person) => person.id_imobzi === id_imobzi);

    if (existingPersonIndex === -1) {
      throw new Error(`Person ID_IMOBZI ${id_imobzi} not found.`);
    } else {
      const existingPerson = this.items[existingPersonIndex];
      const existingPersonUpdated = data;
      this.items[existingPersonIndex] = existingPersonUpdated;
      return existingPerson;
    }
  }
}

import { CreatePersonDTO } from 'src/repository/people/dtos/create-person.dtos';
import * as crypto from 'node:crypto';
import { Person } from 'src/repository/people/entities/person.entity';
import { inMemoryPeopleRepositoryMock } from './inMemoryPeopleRepository.mocks';
import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { PeopleRepository } from 'src/repository/people/people.repository';

export class InMemoryPeopleRepository implements Partial<PeopleRepository> {
  public items: Person[] = inMemoryPeopleRepositoryMock;

  async create(data: CreatePersonDTO) {
    const existingPerson = this.items.find((person) => person.id_imobzi === data.id_imobzi);
    const existingCPF = this.items.find((person) => person.cpf === data.cpf);

    if (existingPerson) throw new NotAcceptableException(`Person id_imobzi: ${data.id_imobzi} already exists`);
    if (existingCPF) throw new NotAcceptableException(`Person cpf: ${data.cpf} already exists`);

    data.id = crypto.randomInt(1, 1000);
    this.items.push(data);
    return data;
  }

  async findAll() {
    return this.items;
  }

  async findExistingCPF(cpf: string) {
    try {
      const found = this.items.find((person) => person.cpf === cpf);

      if (!found) {
        throw new NotFoundException(`Person cpf: ${cpf} not found`);
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

  async update(id_imobzi: string, data: CreatePersonDTO): Promise<Person> {
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

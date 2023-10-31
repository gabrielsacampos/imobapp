import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreatePersonDTO } from './dtos/create-person.dtos';
import { Person } from './entities/person.entity';
import { PeopleRepository } from './people.repository';

@Injectable()
export class PeopleService implements Partial<PeopleRepository> {
  constructor(private readonly peopleRepository: PeopleRepository) {}

  async findExistingCPF(cpf: string) {
    try {
      return this.peopleRepository.findExistingCPF(cpf);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id_imobzi: string) {
    try {
      return await this.peopleRepository.findById(id_imobzi);
    } catch (error) {
      throw new Error();
    }
  }

  async create(data: CreatePersonDTO): Promise<Person> {
    const existingPerson = await this.findById(data.id_imobzi);
    const existingCPF = await this.findExistingCPF(data.cpf);

    if (existingPerson) throw new NotAcceptableException(`Person id_imobzi: ${data.id_imobzi} already exists`);
    if (existingCPF) throw new NotAcceptableException(`Person cpf: ${data.cpf} already exists`);

    return this.peopleRepository.create(data);
  }

  async findAll(): Promise<Person[]> {
    return await this.peopleRepository.findAll();
  }

  async upsert(data: CreatePersonDTO): Promise<Person> {
    return await this.peopleRepository.upsert(data);
  }
}

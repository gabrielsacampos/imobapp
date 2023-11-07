import { Injectable } from '@nestjs/common';
import { CreatePersonDTO } from './dtos/create-person.dtos';
import { Person } from './entities/person.entity';
import { PeopleRepository } from './people.repository';

@Injectable()
export class PeopleService {
  constructor(private readonly peopleRepository: PeopleRepository) {}

  async upsert(data: CreatePersonDTO): Promise<Person> {
    try {
      const found = this.peopleRepository.findById(data.id_imobzi);
      if (found) {
        return this.peopleRepository.update(data.id_imobzi, data);
      } else {
        return this.peopleRepository.create(data);
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

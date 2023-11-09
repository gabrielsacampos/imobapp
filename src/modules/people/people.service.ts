import { Injectable } from '@nestjs/common';
import { CreatePersonDTO } from './dtos/create-person.dtos';
import { Person } from './entities/person.entity';
import { PeopleRepository } from './people.repository';

@Injectable()
export class PeopleService {
  constructor(private readonly peopleRepository: PeopleRepository) {}

  async upsert(data: CreatePersonDTO): Promise<Person> {
    return this.peopleRepository
      .findById(data.id_imobzi)
      .then(() => {
        return this.peopleRepository.update(data.id_imobzi, data);
      })
      .catch((error) => {
        if (error.status === 404) {
          return this.peopleRepository.create(data);
        } else {
          throw new Error(error);
        }
      });
  }
}

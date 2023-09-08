import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PeopleDTO } from './people.dtos';

@Injectable()
export class PeopleService {
  constructor(private prisma: PrismaService) {}

  async create(data: PeopleDTO) {
    const existsIdPerson = await this.prisma.person.findFirst({
      where: {
        id: data.id,
      },
    });

    const existsCpfPerson = await this.prisma.person.findFirst({
      where: {
        cpf: data.cpf,
      },
    });

    if (existsIdPerson) {
      throw new NotFoundException(
        `ID: ${existsIdPerson.id} already registered to person: ${existsIdPerson.fullname}`,
      );
    }

    if (existsCpfPerson) {
      throw new NotFoundException(
        `CPF: ${existsIdPerson.cpf} already registered to person: ${existsIdPerson.fullname}`,
      );
    }

    return this.prisma.person.create({ data });
  }

  async findAll() {
    const arrayPeople = await this.prisma.person.findMany();
    return arrayPeople.map((element) => {
      delete element.id;
      return element;
    });
  }

  async findById(data: bigint) {
    const found = await this.prisma.person.findUnique({
      where: {
        id: data,
      },
    });

    if (!found) {
      throw new NotFoundException(`ID: ${data.toString()} not found at people`);
    }

    delete found.id;
    return found;
  }
}

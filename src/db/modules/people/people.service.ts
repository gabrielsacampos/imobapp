import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { PeopleCreateDTO } from './peopleCreate.dtos';
import { PeopleUpdateDTO } from './peopleUpdate.dtos';

@Injectable()
export class PeopleService {
  constructor(private prisma: PrismaService) {}

  async create(data: PeopleCreateDTO) {
    const existsIdPerson = await this.prisma.person.findFirst({
      where: { id_imobzi: data.id_imobzi },
    });

    if (existsIdPerson) {
      throw new NotFoundException(`ID: ${existsIdPerson.id} already registered to person: ${existsIdPerson.fullname}`);
    }

    const existsCpfPerson = await this.prisma.person.findFirst({
      where: {
        cpf: data.cpf,
      },
    });

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
      const id = element.id.toString();
      delete element.id;
      return { ...element, id };
    });
  }

  async findById(id_imobzi: string) {
    const found = await this.prisma.person.findUnique({
      where: { id_imobzi },
    });

    if (!found) {
      throw new NotFoundException(`ID: ${id_imobzi} not found at people`);
    }
    return found;
  }

  async update(id_imobzi: string, data: PeopleUpdateDTO) {
    const personExists = await this.prisma.person.findFirst({
      where: { id_imobzi },
    });

    if (!personExists) {
      throw new NotFoundException(`ID: ${id_imobzi} does not exists at People`);
    }

    return await this.prisma.person.update({ where: { id_imobzi }, data });
  }
}

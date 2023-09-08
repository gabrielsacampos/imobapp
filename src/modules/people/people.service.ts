import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PeopleCreateDTO } from './peopleCreate.dtos';
import { PeopleUpdateDTO } from './peopleUpdate.dtos';

@Injectable()
export class PeopleService {
  constructor(private prisma: PrismaService) {}

  async create(data: PeopleCreateDTO) {
    const idBigInt = BigInt(data.id);
    const existsIdPerson = await this.prisma.person.findFirst({
      where: {
        id: idBigInt,
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

    delete data.id;
    return this.prisma.person.create({ data: { ...data, id: idBigInt } });
  }

  async findAll() {
    const arrayPeople = await this.prisma.person.findMany();
    return arrayPeople.map((element) => {
      delete element.id;
      return element;
    });
  }

  async findById(id: string) {
    const idBidInt = BigInt(id);
    const found = await this.prisma.person.findUnique({
      where: {
        id: idBidInt,
      },
    });

    if (!found) {
      throw new NotFoundException(`ID: ${id} not found at people`);
    }

    delete found.id;
    return found;
  }

  async update(id: string, data: PeopleUpdateDTO) {
    const idBigInt = BigInt(id);

    const personExists = await this.prisma.person.findFirst({
      where: { id: idBigInt },
    });

    if (!personExists) {
      throw new NotFoundException(`ID: ${id} does not exists at People`);
    }

    const updated = await this.prisma.person.update({
      where: {
        id: idBigInt,
      },
      data,
    });

    delete updated.id;
    return updated;
  }
}

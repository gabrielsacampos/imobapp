import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreatePersonDTO } from './dtos/create-person.dtos';
import { UpdatePersonDTO } from './dtos/update-person.dtos';

@Injectable()
export class PeopleService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePersonDTO) {
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

  async update(id_imobzi: string, data: UpdatePersonDTO) {
    const personExists = await this.prisma.person.findFirst({
      where: { id_imobzi },
    });

    if (!personExists) {
      throw new NotFoundException(`ID: ${id_imobzi} does not exists at People`);
    }

    return await this.prisma.person.update({ where: { id_imobzi }, data });
  }

  async upsert(data: CreatePersonDTO): Promise<void> {
    try {
      await this.prisma.person.upsert({
        where: {
          id_imobzi: data.id_imobzi,
        },
        update: data,
        create: data,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

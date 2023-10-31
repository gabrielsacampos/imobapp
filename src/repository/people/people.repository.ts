import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { CreatePersonDTO } from './dtos/create-person.dtos';
import { UpdatePersonDTO } from './dtos/update-person.dtos';
import { Person } from './entities/person.entity';

@Injectable()
export class PeopleRepository {
  constructor(private prisma: PrismaService) {}

  async findExistingCPF(cpf: string): Promise<Person> {
    try {
      const found = await this.prisma.person.findFirst({
        where: {
          cpf: cpf,
        },
      });

      if (!found) {
        throw new NotFoundException(`Person cpf: ${cpf} not found`);
      }

      return found;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id_imobzi: string): Promise<Person> {
    try {
      const found = await this.prisma.person.findFirst({
        where: { id_imobzi },
      });

      if (!found) {
        throw new NotFoundException(`Person id_imozbi: ${id_imobzi} not found`);
      }

      return found;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(data: CreatePersonDTO): Promise<Person> {
    const existingPerson = await this.findById(data.id_imobzi);
    const existingCPF = await this.findExistingCPF(data.cpf);

    if (existingPerson) throw new NotAcceptableException(`Person id_imobzi: ${data.id_imobzi} already exists`);
    if (existingCPF) throw new NotAcceptableException(`Person cpf: ${data.cpf} already exists`);

    return this.prisma.person.create({ data });
  }

  async findAll(): Promise<Person[]> {
    return await this.prisma.person.findMany();
  }

  async update(id_imobzi: string, data: UpdatePersonDTO): Promise<Person> {
    return await this.prisma.person.update({ where: { id_imobzi }, data });
  }

  async upsert(data: CreatePersonDTO): Promise<Person> {
    try {
      return await this.prisma.person.upsert({
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

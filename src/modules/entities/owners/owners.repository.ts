import { PrismaService } from 'src/prisma-client/prisma.service';

export class OwnersRepository {
  constructor(private readonly prisma: PrismaService) {}
}

import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma-client/prisma.service';
import { FinancesController } from './finances.controller';
import { FinancesRepository } from './finances.repository';

@Module({
	providers: [PrismaService, FinancesRepository],
	controllers: [FinancesController],
})
export class FinancesModule { }

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from 'src/config/winston.config';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
    WinstonModule.forRoot(winstonConfig),
  ],
  providers: [PrismaService],
  exports: [HttpModule, PrismaService],
})
export class SharedModule {}

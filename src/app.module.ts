import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BanksModule } from './banks/banks.module';

@Module({
  imports: [PrismaModule, BanksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

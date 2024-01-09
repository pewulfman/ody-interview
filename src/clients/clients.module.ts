import { Module } from '@nestjs/common';
import { ClientsProviders } from './clients.providers';
import { ClientsService } from './clients.service';
import { DatabaseModule } from '../database/database.module';
import { ClientsController } from './clients.controller';
import { PartnersModule } from '../partners/partners.module';

@Module({
  imports: [DatabaseModule, PartnersModule],
  controllers: [ClientsController],
  providers: [...ClientsProviders, ClientsService],
})
export class ClientsModule {}

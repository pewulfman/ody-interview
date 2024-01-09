import { Module } from '@nestjs/common';
import { ClientsProviders } from './clients.providers';
import { ClientsService } from './clients.service';
import { Clients } from './clients.entity';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...ClientsProviders, ClientsService, Clients],
})
export class ClientsModule {}

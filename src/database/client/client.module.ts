import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { ClientProviders } from './client.providers';
import { ClientService } from './client.service';

@Module({
  imports: [DatabaseModule],
  providers: [...ClientProviders, ClientService],
})
export class ClientModule {}

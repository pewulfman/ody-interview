import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnerProviders } from './partners.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...PartnerProviders, PartnersService],
  exports: [PartnersService],
})
export class PartnersModule {}

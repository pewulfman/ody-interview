import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { travelProviders } from './travel.providers';
import { TravelService } from './travel.service';

@Module({
  imports: [DatabaseModule],
  providers: [...travelProviders, TravelService],
})
export class TravelModule {}

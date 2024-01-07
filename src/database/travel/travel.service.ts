import { Inject, Injectable } from '@nestjs/common';
import { Travel } from './travel.entity';
import { Repository } from 'typeorm';
import { TRAVEL_REPOSITORY } from '../../common/constants';

@Injectable()
export class TravelService {
  constructor(
    @Inject(TRAVEL_REPOSITORY)
    private travelRepository: Repository<Travel>,
  ) {}

  async findAll(): Promise<Travel[]> {
    return this.travelRepository.find();
  }
}

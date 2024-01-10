import { Inject, Injectable } from '@nestjs/common';
import { Partners } from './partners.entity';
import { PARTNER_REPOSITORY } from '../common/constants';
import { Repository } from 'typeorm';

@Injectable()
export class PartnersService {
  constructor(
    @Inject(PARTNER_REPOSITORY)
    private partnerRepository: Repository<Partners>,
  ) {}

  async findAll(): Promise<Partners[]> {
    return this.partnerRepository.find();
  }

  async findOneByUsername(username: string): Promise<Partners | null> {
    return this.partnerRepository.findOneBy({ name: username });
  }

  async findOneById(id: number): Promise<Partners | null> {
    return this.partnerRepository.findOneBy({ id });
  }
}

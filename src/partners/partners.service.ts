import { Inject, Injectable } from '@nestjs/common';
import { Partner } from './partners.entity';
import { PARTNER_REPOSITORY } from '../common/constants';
import { Repository } from 'typeorm';

@Injectable()
export class PartnersService {
  constructor(
    @Inject(PARTNER_REPOSITORY)
    private partnerRepository: Repository<Partner>,
  ) {}

  private readonly partners: Partner[] = [
    {
      id: 1,
      name: 'Partner 1',
      description: 'Partner 1 description',
      email: 'tech@partner1.com',
      password: '123456',
      clients: [],
    },
  ];

  async findAll(): Promise<Partner[]> {
    return this.partnerRepository.find();
  }

  async findOneByUsername(username: string): Promise<Partner | null> {
    return this.partnerRepository.findOneBy({ name: username });
  }

  async findOneById(id: number): Promise<Partner | null> {
    return this.partnerRepository.findOneBy({ id });
  }
}

import { Injectable } from '@nestjs/common';
import { Partner } from './partners.entity';

@Injectable()
export class PartnersService {
  private readonly partners: Partner[] = [
    {
      id: 1,
      name: 'Partner 1',
      description: 'Partner 1 description',
      email: 'tech@partner1.com',
      password: '123456',
    },
  ];

  async findOne(name: string): Promise<Partner | undefined> {
    return this.partners.find((partner) => partner.name === name);
  }
}

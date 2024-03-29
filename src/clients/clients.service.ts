import { Inject, Injectable } from '@nestjs/common';
import { CLIENT_REPOSITORY } from '../common/constants';
import { Repository } from 'typeorm';
import { Clients } from './clients.entity';
import { CreateClientDto } from './create-client.dto';
import { Partners } from 'src/partners/partners.entity';

@Injectable()
export class ClientsService {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private clientRepository: Repository<Clients>,
  ) {}

  async findAll(): Promise<Clients[]> {
    return this.clientRepository.find();
  }

  async findAllWithPartner(partner: Partners): Promise<Clients[]> {
    return this.clientRepository.findBy({ partner });
  }

  async create(
    createClientDto: CreateClientDto,
    partner: Partners,
  ): Promise<void> {
    const client = new Clients(createClientDto);
    client.partner = partner;
    this.clientRepository.save(client);
  }
}

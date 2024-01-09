import { Inject, Injectable } from '@nestjs/common';
import { CLIENT_REPOSITORY } from '../common/constants';
import { Repository } from 'typeorm';
import { Clients } from './clients.entity';
import { CreateClientDto } from './create-client.dto';
import { Partner } from 'src/partners/partners.entity';

@Injectable()
export class ClientsService {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private clientRepository: Repository<Clients>,
  ) {}

  async findAll(): Promise<Clients[]> {
    return this.clientRepository.find();
  }

  async findAllByPartner(partner: Partner): Promise<Clients[]> {
    return this.clientRepository.findBy({ partner });
  }

  async create(
    createClientDto: CreateClientDto,
    partner: Partner,
  ): Promise<void> {
    const client = new Clients();
    client.email = createClientDto.email;
    client.language = createClientDto.language;
    client.countryOfOrigin = createClientDto.countryOfOrigin;
    client.countryOfResidence = createClientDto.countryOfResidence;
    client.travelDateStart = createClientDto.travelDateStart;
    client.travelDateEnd = createClientDto.travelDateEnd;
    client.partner = partner;
    this.clientRepository.save(client);
  }
}

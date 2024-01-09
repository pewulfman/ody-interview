import { Inject, Injectable } from '@nestjs/common';
import { CLIENT_REPOSITORY } from '../common/constants';
import { Repository } from 'typeorm';
import { Clients } from './clients.entity';

@Injectable()
export class ClientsService {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private clientRepository: Repository<Clients>,
  ) {}

  async findAll(): Promise<Clients[]> {
    return this.clientRepository.find();
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { DatabaseModule } from '../database/database.module';
import { PartnersModule } from '../partners/partners.module';
import { ClientsProviders } from './clients.providers';

describe('ClientsController', () => {
  let controller: ClientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, PartnersModule],
      controllers: [ClientsController],
      providers: [...ClientsProviders, ClientsService],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

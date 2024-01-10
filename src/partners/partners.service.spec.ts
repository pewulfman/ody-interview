import { Test, TestingModule } from '@nestjs/testing';
import { PartnersService } from './partners.service';
import { DatabaseModule } from '../database/database.module';
import { PartnerProviders } from './partners.providers';

describe('PartnersService', () => {
  let service: PartnersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [...PartnerProviders, PartnersService],
      exports: [PartnersService],
    }).compile();

    service = module.get<PartnersService>(PartnersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

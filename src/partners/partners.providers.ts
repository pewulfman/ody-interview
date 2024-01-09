import { DATA_SOURCE, PARTNER_REPOSITORY } from '../common/constants';
import { DataSource } from 'typeorm';
import { Partner } from './partners.entity';

export const PartnerProviders = [
  {
    provide: PARTNER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Partner),
    inject: [DATA_SOURCE],
  },
];

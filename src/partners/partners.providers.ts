import { DATA_SOURCE, PARTNER_REPOSITORY } from '../common/constants';
import { DataSource } from 'typeorm';
import { Partners } from './partners.entity';

export const PartnerProviders = [
  {
    provide: PARTNER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Partners),
    inject: [DATA_SOURCE],
  },
];

import { DataSource } from 'typeorm';
import { CLIENT_REPOSITORY, DATA_SOURCE } from '../common/constants';
import { Clients } from './clients.entity';

export const ClientsProviders = [
  {
    provide: CLIENT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Clients),
    inject: [DATA_SOURCE],
  },
];

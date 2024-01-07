import { CLIENT_REPOSITORY, DATA_SOURCE } from '../../common/constants';
import { DataSource } from 'typeorm';
import { Client } from './client.entity';

export const ClientProviders = [
  {
    provide: CLIENT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Client),
    inject: [DATA_SOURCE],
  },
];

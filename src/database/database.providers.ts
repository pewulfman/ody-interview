import { config } from 'dotenv';
import { DATA_SOURCE } from '../common/constants';
import { dataSource } from './datasource';

config();

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];

import { DATA_SOURCE, TRAVEL_REPOSITORY } from '../../common/constants';
import { Travel } from './travel.entity';
import { DataSource } from 'typeorm';

export const travelProviders = [
  {
    provide: TRAVEL_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Travel),
    inject: [DATA_SOURCE],
  },
];

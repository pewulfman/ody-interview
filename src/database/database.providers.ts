import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { DATA_SOURCE } from '../common/constants';

config();

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: ['./**/*.entity.js'],
        migrations: ['src/database/migrations/*{.ts,.js}'],
        migrationsRun: true,
        ...(process.env.DB_SSL === 'true'
          ? {
              ssl: true,
              extra: {
                ssl: {
                  rejectUnauthorized: false,
                },
              },
            }
          : {}),
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];

import { config } from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';

config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!), // guarantied by Joi validation
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['../**/*.entity.js'],
  migrations: [join(__dirname, '**', 'migrations', '*.{ts,js}')],
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
  synchronize: false,
});

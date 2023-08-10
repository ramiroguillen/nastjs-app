import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

const { DB_HOST, DB_PORT, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER } =
  process.env;

const configDBConnection: DataSourceOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: false,
  migrationsRun: true,
  logging: false,
  entities: [join(__dirname, './entities/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './migrations/*.{.ts,.js}')],
  subscribers: [join(__dirname, './subscribers/*.{.ts,.js}')],
};

export const AppDataSource: DataSource = new DataSource(configDBConnection);

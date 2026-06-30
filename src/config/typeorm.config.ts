import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../migrations/*.{js,ts}'],
  synchronize: false,
  logging: true,
  ssl: process.env.STAGE === 'prod',
  useUTC: true,
  autoLoadEntities: true,
  migrationsRun: true,
};

export const dataSource = new DataSource(typeOrmConfig as DataSourceOptions);

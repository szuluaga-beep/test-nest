import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/../**/*.entity.js'],
  migrations: [__dirname + '/../migrations/*.js'],
  synchronize: false,
  logging: true,
  ssl: process.env.NODE_ENV === 'production',
  useUTC: true,
  autoLoadEntities: true,
  migrationsRun: process.env.NODE_ENV !== 'production', // Solo en desarrollo
};

export const dataSource = new DataSource(typeOrmConfig as DataSourceOptions);

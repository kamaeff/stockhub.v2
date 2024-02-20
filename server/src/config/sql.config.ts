import { registerAs } from '@nestjs/config';
import { Dialect } from 'sequelize';

import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

export const sqlConfig = registerAs('database', () => ({
  dialect: <Dialect>process.env.SQL_DIALECT || 'mysql',
  logging: process.env.SQL_LOGGING === 'true' ? true : false,
  host: process.env.HOST,
  port: +process.env.PORT,
  database: process.env.DATABASE,
  username: process.env.USER,
  password: process.env.PASSWORD,
  autoLoadEntities: true,
  synchronize: true,
}));

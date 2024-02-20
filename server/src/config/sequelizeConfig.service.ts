import { Injectable } from '@nestjs/common';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/users.model';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService) { }

  createSequelizeOptions(): SequelizeModuleOptions {
    const { dialect, logging, host, port, username, password, database } =
      this.configService.get('database.sql');

    console.log(logging, host, port, username, password, database);

    return {
      dialect,
      logging,
      host,
      port,
      username,
      password,
      database,
      models: [User],
      autoLoadModels: true,
      synchronize: true,
      define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    };
  }
}

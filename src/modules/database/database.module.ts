import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config';
import { DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      //   imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configSevice: ConfigService<config>) => {
        const logger = new Logger('DatabaseModule');

        const configuration: DataSourceOptions = {
          type: 'postgres',
          host: '',
          port: 5432,
        };

        // Database connected successfully to ${dbConfig.host}:${dbConfig.port}`
        logger.log(
          ` ✅ Database connected successfully to ${configuration.host}:${configuration.port}`,
        );
        return configuration;
      },
    }),
  ],
})
export class DatabaseModule {}

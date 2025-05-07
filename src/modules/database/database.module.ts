import { BullModule } from '@nestjs/bullmq';
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
          host: configSevice.get<string>('DB_HOST'),
          port: 5432,
          username: configSevice.get<string>('DB_USER'),
          password: configSevice.get<string>('DB_PASSWORD'),
          database: configSevice.get<string>('DB_NAME'),

          // synchronize: true,
          // migrationsRun: true,
        };

        logger.log(
          ` ✅ Database connected successfully to ${configuration.host}:${configuration.port}`,
        );
        return configuration;
      },
    }),
  ],
})
export class DatabaseModule {}

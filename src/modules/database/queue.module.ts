import { BullModule } from '@nestjs/bullmq';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'src/config';
@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<config>) => {
        const logger = new Logger('QueueModule');
        const factory = {
          connection: {
            host: configService.get<string>('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT'),
          },
        };
        logger.log('It has connected to the redis database');
        return factory;
      },
    }),
  ],
})
export class QueueModule {}

import { Module } from '@nestjs/common';
import { DockerController } from './controller';
import { DockerService, LanguageRegistryService } from './service';
import { BullModule, RegisterQueueOptions } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';
import { config } from 'src/config';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'code-execution',
      inject: [ConfigService],
      useFactory: (configService: ConfigService<config>) => {
        const obj = {
          redis: {
            host: configService.get<string>('REDIS_HOST'),
            port: Number(configService.get<number>('REDIS_PORT')),
          },
          limiter: {
            max: 5,
            duration: 1000,
          },
          defaultJobOptions: {
            attempts: 2,
            removeOnComplete: true,
            removeOnFail: false,
          },
        };
        return obj;
      },
    }),
  ],
  controllers: [DockerController],
  providers: [DockerService, LanguageRegistryService],
})
export class DockerModule {}

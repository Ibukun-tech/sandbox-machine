import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Validation, config } from './config';
import { AuthModule } from './modules/auth';
// import { QueueModule } from './modules/database/queue.module';
import { DatabaseModule, QueueModule } from './modules/database';
import { DockerModule } from './modules/Docker';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: Validation,
    }),
    // DatabaseModule,
    // DockerModule,
    QueueModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

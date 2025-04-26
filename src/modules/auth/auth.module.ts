import { Module } from '@nestjs/common';
import { AuthService } from './service';
import { AuthController } from './controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDto } from '../controller/dto/register-dto';

export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor() {}
  private async handleErrors<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (
        error instanceof Error ||
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      this.logger.error(`Unexpected Error: ${error.message}`, error.stack);
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
  async register(dto: RegisterDto) {
    await this.handleErrors(async () => {
      // This is to create the user and send to my backend
    });
  }
}

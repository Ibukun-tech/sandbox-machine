import { Logger } from '@nestjs/common';

export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor() {}
}

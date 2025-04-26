import { Body, Logger, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register-dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register a new account' })
  //   @ApiResponse({ type: RegisterUserResponse, status: HttpStatus.OK })
  async register(@Body() dto: RegisterDto) {
    return await this.authService.register(dto);
  }
}

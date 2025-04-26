import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  isEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    required: true,
    example: 'ibkoyetunji@gmail.com',
    description: 'The email account',
  })
  @IsString()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({
    message: 'Email field cannt be empty please provide your email address',
  })
  @Transform(({ value }) => value.trim().toLowerCase())
  email: string;

  @ApiProperty({
    required: true,
    example: 'Password@4321',
    description: 'The password for the user account',
  })
  @IsNotEmpty({
    message: 'Please provide password it cannot be empty',
  })
  @MinLength(8, { message: 'Password must be at least 8 character long' })
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\\-])/,
    {
      message:
        'Password must include at least one uppper case letter, lower case letter one digit and one special character',
    },
  )
  password: string;
}

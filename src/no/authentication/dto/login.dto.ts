// src/auth/dto/login-organization.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginOrganizationDto {
  @ApiProperty({
    description: 'Organization email address',
    example: 'contact@greenenergy.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'SecurePass123!',
  })
  @IsString()
  @MinLength(8)
  password: string;
}

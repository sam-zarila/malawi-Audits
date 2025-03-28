import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator";

export class CreateAuthenticationDto {
  @ApiProperty({
    description: 'Full name of the organization',
    example: 'Green Energy Solutions Ltd',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  fullName: string;

  @ApiProperty({
    description: 'Organization email address',
    example: 'contact@greenenergy.com',
  })
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiProperty({
    description: 'Password (min 8 chars, 1 uppercase, 1 lowercase, 1 number)',
    example: 'SecurePass123!',
  })
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, {
    message: 'Password must contain at least 1 uppercase, 1 lowercase letter, and 1 number',
  })
  password: string;

  @ApiProperty({
    description: 'Confirm password',
    example: 'SecurePass123!',
  })
  @IsString()
  @MinLength(8)
  confirmPassword: string;

  @ApiProperty({
    description: 'Organization sector',
    example: 'Renewable Energy',
  })
  @IsString()
  @IsNotEmpty()
  sector: string;

  @ApiProperty({
    description: 'Contact phone number',
    example: '+265 899 622 111',
  })
  @IsPhoneNumber() // null allows for validation from any country
  phoneNumber: string;
   
    }

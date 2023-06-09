import { IsEmail, IsJWT, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Email', nullable: false })
  @IsEmail()
  email: string;
  @ApiProperty({ description: 'Password', nullable: false })
  @IsString()
  password: string;
}

export class LoginDtoResponse {
  @ApiProperty({ description: 'access_token', nullable: false })
  @IsJWT()
  access_token: string;
  @ApiProperty({ description: 'refresh_token', nullable: false })
  @IsJWT()
  refresh_token: string;
}

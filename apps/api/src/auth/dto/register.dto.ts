import { UsersEntity } from '@kinopoisk-snitch/typeorm';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto implements Partial<UsersEntity> {
  @ApiProperty({ description: 'birthday', nullable: true })
  @Type(() => Date)
  @IsDate({ message: 'Date must be a valid ISO 8601 date string' })
  birthday: Date;
  @ApiProperty({ description: 'Community', nullable: true })
  @IsString()
  community: string;
  @ApiProperty({ description: 'Email', nullable: false })
  @IsEmail()
  email: string;
  @ApiProperty({ description: 'Gender', nullable: true })
  @IsString()
  gender: string;
  @ApiProperty({ description: 'Quote', nullable: true })
  @IsString()
  quote: string;
  @ApiProperty({ description: 'User name', nullable: false })
  @IsString()
  user_name: string;
  @ApiProperty({ description: 'Password', nullable: false })
  @IsString()
  password: string;
}

export class RegisterDtoResponse implements Partial<UsersEntity> {
  @ApiProperty({ description: 'birthday', nullable: true })
  @Type(() => Date)
  @IsDate({ message: 'Date must be a valid ISO 8601 date string' })
  birthday: Date;
  @ApiProperty({ description: 'Community', nullable: true })
  @IsString()
  community: string;
  @ApiProperty({ description: 'Email', nullable: false })
  @IsEmail()
  email: string;
  @ApiProperty({ description: 'Gender', nullable: true })
  @IsString()
  gender: string;
  @ApiProperty({ description: 'Is user admin', nullable: false })
  @IsBoolean()
  @IsOptional()
  is_admin: boolean;
  @ApiProperty({ description: 'Quote', nullable: true })
  @IsString()
  quote: string;
  @ApiProperty({ description: 'User name', nullable: false })
  @IsString()
  user_name: string;
}

import { UsersEntity } from '@kinopoisk-snitch/typeorm';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { HttpStatus } from '@nestjs/common';
import { Type } from 'class-transformer';

export namespace AuthRegister {
  export class Request implements Partial<UsersEntity> {
    @Type(() => Date)
    @IsDate({ message: 'Date must be a valid ISO 8601 date string' })
    birthday: Date;
    @IsString()
    community: string;
    @IsEmail()
    email: string;
    @IsString()
    gender: string;
    @IsString()
    password: string;
    @IsString()
    quote: string;
    @IsString()
    user_name: string;
  }

  export class Response {
    @IsEnum(HttpStatus)
    statusCode: HttpStatus;
    @IsString()
    message: string;
  }
}

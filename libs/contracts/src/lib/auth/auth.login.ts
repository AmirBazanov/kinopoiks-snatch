import { IsEmail, IsString, ValidateNested } from 'class-validator';
import { NotFoundException } from '@nestjs/common';
import { Type } from 'class-transformer';

export namespace AuthLogin {
  export class Request {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
  }

  export class Response {
    @IsString()
    access_token: string;

    @IsString()
    refresh_token: string;

    @ValidateNested({ each: true })
    @Type(() => NotFoundException)
    error: NotFoundException;
  }
}

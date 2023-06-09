import { IsString, ValidateNested } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { Type } from 'class-transformer';

export namespace AuthUpdateToken {
  export class Request {
    @IsString()
    refresh_token: string;
  }

  export class Response {
    @IsString()
    access_token: string;

    @IsString()
    refresh_token: string;

    @ValidateNested({ each: true })
    @Type(() => BadRequestException)
    error: BadRequestException;
  }
}

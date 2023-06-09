import { IsString } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

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

    error: BadRequestException;
  }
}

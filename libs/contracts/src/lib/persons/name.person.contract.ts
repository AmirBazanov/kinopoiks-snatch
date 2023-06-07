import {IsEnum, IsString } from 'class-validator';
import {HttpStatus} from "@nestjs/common";
import {PersonsEntity } from "@kinopoisk-snitch/typeorm";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace NamePersonContract {
  export class Request {
    @IsString()
    fullName: string;
  }

  export class Response {
    @IsEnum(HttpStatus)
    httpStatus: HttpStatus;

    persons: PersonsEntity[];    
  }
}
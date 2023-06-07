import {IsEnum, IsNumber } from 'class-validator';
import {HttpStatus} from "@nestjs/common";
import {AwardsEntity, GenresEntity, MoviesEntity, PersonsEntity, RolesEntity} from "@kinopoisk-snitch/typeorm";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace NamePersonContract {
  export class Request {
    @IsNumber()
    fullName: string;
  }

  export class Response {
    @IsEnum(HttpStatus)
    httpStatus: HttpStatus;

    persons: PersonsEntity[];    
  }
}
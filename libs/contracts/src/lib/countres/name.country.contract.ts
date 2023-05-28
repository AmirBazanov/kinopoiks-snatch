import {IsBoolean, IsDate, IsEnum, IsOptional, IsString} from 'class-validator';
import {Type} from "class-transformer";
import {HttpStatus} from "@nestjs/common";
import {MoviesEntity} from "@kinopoisk-snitch/typeorm";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace NameCountryContract {
  export class Request {
    name: string;
  }

  export class Response {
    @IsEnum(HttpStatus)
    httpStatus: HttpStatus;
    @IsString()
    message: string;
    movies: MoviesEntity[];
  }
}

import {HttpStatus} from "@nestjs/common";
import {IsEnum, IsString} from "class-validator";
import {MoviesEntity} from "@kinopoisk-snitch/typeorm";

export namespace AllMoviesContract {
  export class Request {}

  export class Response {
    @IsEnum(HttpStatus)
    httpStatus: HttpStatus;
    movies: MoviesEntity[];
  }
}

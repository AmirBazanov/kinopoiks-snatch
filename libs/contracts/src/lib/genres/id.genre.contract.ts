import {IsEnum, IsNumber} from 'class-validator';
import {HttpStatus} from "@nestjs/common";
import {IdMovieContract} from "../movies/id.movie.contract";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IdGenreContract {
  export class Request {
    @IsNumber()
    country_id: number;
  }

  export class Response {
    @IsEnum(HttpStatus)
    httpStatus: HttpStatus;
    country_id: number;
    is_eng: boolean;
    movies: IdMovieContract.Response[];
  }
}

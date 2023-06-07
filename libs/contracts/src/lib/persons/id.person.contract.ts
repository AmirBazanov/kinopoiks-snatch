import {IsEnum, IsNumber } from 'class-validator';
import {HttpStatus} from "@nestjs/common";
import {AwardsEntity, GenresEntity, MoviesEntity, RolesEntity} from "@kinopoisk-snitch/typeorm";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IdPersonContract {
  export class Request {
    @IsNumber()
    person_id: number;
  }

  export class Response {
    @IsEnum(HttpStatus)
    httpStatus: HttpStatus;

    private readonly person_id: number;
    private readonly name: string;
    private readonly sur_name: string;
    private readonly height: number;
    private readonly date_birth: Date;
    private readonly place_birth: string;
    private readonly spouse: string;
    private readonly photo: string;
    private readonly is_eng: boolean;

    private readonly awards: AwardsEntity[];
    private readonly carrer: RolesEntity[];
    private readonly genres: GenresEntity[];

    private readonly countMovies: number;

    private readonly movies: MoviesEntity[];
  }
}
import {HttpStatus} from "@nestjs/common";
import {IsBoolean, IsEnum, IsNumber, IsOptional, IsString} from "class-validator";
import {MoviesEntity} from "@kinopoisk-snitch/typeorm";

export namespace FilteredMoviesContract {
  export class Request {
    @IsString()
    @IsOptional()
    text: string;
    @IsOptional()
    @IsNumber()
    genreIds: number[];
    @IsOptional()
    @IsNumber()
    countryIds: number[];
    @IsOptional()
    @IsNumber()
    yearFrom: number;
    @IsOptional()
    @IsNumber()
    yearTo: number;
    @IsOptional()
    @IsString()
    sort: string;
    @IsBoolean()
    is_eng: boolean;
    @IsNumber()
    page: number;
    @IsNumber()
    perPage: number;
  }

  export class Response {
    @IsEnum(HttpStatus)
    httpStatus: HttpStatus;
    movies: MoviesEntity[];
    totalPages: number;
  }
}

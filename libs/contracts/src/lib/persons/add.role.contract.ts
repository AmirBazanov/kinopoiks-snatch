import {
  AwardsEntity,
  MoviesPersonsRolesEntity,
  PersonsEntity,
} from '@kinopoisk-snitch/typeorm';
import {IsBoolean, IsEnum, IsNumber, IsString} from "class-validator";
import {HttpStatus} from "@nestjs/common";

export namespace AddRoleContract {
  export class Request {
    @IsNumber()
    movie_id: number;
    @IsNumber()
    person_id: number;
    @IsString()
    role_name: string;
    @IsBoolean()
    is_eng: boolean;
  }

  export class Response {
    @IsEnum(HttpStatus)
    httpStatus: HttpStatus;
    role: MoviesPersonsRolesEntity;
  }
}

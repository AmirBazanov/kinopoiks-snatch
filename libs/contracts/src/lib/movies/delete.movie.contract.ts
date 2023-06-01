import {IsEnum, IsNumber, IsString} from 'class-validator';
import {HttpStatus} from "@nestjs/common";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DeleteMovieContract {
  export class Request {
    @IsNumber()
    movie_id: number;
  }

  export class Response {
    @IsEnum(HttpStatus)
    httpStatus: HttpStatus;
    @IsString()
    message: string;
  }
}

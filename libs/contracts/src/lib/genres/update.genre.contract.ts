import {IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString} from 'class-validator';
import {HttpStatus} from "@nestjs/common";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UpdateGenreContract {
  export class Request {
    @IsNumber()
    genre_id: number;
    @IsString()
    private readonly name: string;
    @IsBoolean()
    private readonly is_eng: boolean;
  }

  export class Response {
    @IsEnum(HttpStatus)
    httpStatus: HttpStatus;
    @IsString()
    message: string;
  }
}

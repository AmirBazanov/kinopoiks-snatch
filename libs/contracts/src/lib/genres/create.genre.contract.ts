import {IsBoolean, IsDate, IsEnum, IsOptional, IsString} from 'class-validator';
import {Type} from "class-transformer";
import {HttpStatus} from "@nestjs/common";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CreateGenreContract {
  export class Request {
    private readonly name: string;
    private readonly is_eng: boolean;
  }

  export class Response {
    @IsEnum(HttpStatus)
    httpStatus: HttpStatus;
    @IsString()
    message: string;
  }
}

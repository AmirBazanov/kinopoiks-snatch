// eslint-disable-next-line @typescript-eslint/no-namespace
import {IsBoolean, IsDate, IsNumber, IsOptional, IsString} from 'class-validator';
import {Type} from "class-transformer";

export namespace CreateAwardContract {
  export class Request {
    @IsString()
    name: string;
    @Type(() => Date)
    @IsDate({ message: 'Date must be a valid ISO 8601 date string' })
    year: Date;
    @IsString()
    nomination: string;
    @IsBoolean()
    is_eng: boolean;

    @IsOptional()
    person_id: number;
    @IsNumber()
    movie_id: number;
  }

  export class Response {}
}

// eslint-disable-next-line @typescript-eslint/no-namespace
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export namespace EditAwardContract {
  export class Request {
    @IsString()
    @IsOptional()
    name: string;
    @Type(() => Date)
    @IsDate({ message: 'Date must be a valid ISO 8601 date string' })
    @IsOptional()
    year: Date;
    @IsString()
    @IsOptional()
    nomination: string;

    @IsBoolean()
    @IsOptional()
    is_eng: boolean;

    @IsOptional()
    person_id: number;

    @IsNumber()
    @IsOptional()
    movie_id: number;
  }

  export class Response {}
}

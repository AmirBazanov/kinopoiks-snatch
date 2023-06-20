import {IsDate, IsOptional} from "class-validator";
import {Type} from "class-transformer";

export class CreateAwardDto {
  name: string;
  @Type(() => Date)
  @IsDate({ message: 'Date must be a valid ISO 8601 date string' })
  year: Date;
  nomination: string;
  is_eng: boolean;

  @IsOptional()
  person_id: number;

  movie_id: number;
}

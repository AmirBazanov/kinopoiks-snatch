import {IsBoolean, IsDate, IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";

export class CreatePersonDto {
  @Type(() => Date)
  @IsDate({ message: 'Date must be a valid ISO 8601 date string' })
  date_birth: Date;
  @IsNumber()
  height: number;
  @IsBoolean()
  is_eng: boolean;
  @IsString()
  name: string;
  @IsString()
  photo: string;
  @IsString()
  place_birth: string;
  @IsString()
  spouse: string;
  @IsString()
  sur_name: string;
}

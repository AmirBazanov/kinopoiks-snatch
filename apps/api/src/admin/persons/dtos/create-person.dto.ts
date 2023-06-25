import {IsBoolean, IsDateString, IsNumber, IsString} from "class-validator";


export class CreatePersonDto {
  @IsDateString()
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

import {IsBoolean, IsDate, IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";

export class AddRoleDto {
  @IsNumber()
  movie_id: number;
  @IsNumber()
  person_id: number;
  @IsString()
  role_name: string;
  @IsBoolean()
  is_eng: boolean;
}

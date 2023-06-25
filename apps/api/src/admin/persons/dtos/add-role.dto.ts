import {IsBoolean, IsNumber, IsString} from "class-validator";

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


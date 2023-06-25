import {IsBoolean, IsString} from "class-validator";

export class CreateGenreDto {
  @IsString()
  name: string;

  @IsBoolean()
   is_eng: boolean;
}

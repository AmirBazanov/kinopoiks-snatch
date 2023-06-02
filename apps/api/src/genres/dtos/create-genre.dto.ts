import {IsBoolean} from "class-validator";

export class CreateGenreDto {
  private readonly name: string;

  @IsBoolean()
  private readonly is_eng: boolean;
}

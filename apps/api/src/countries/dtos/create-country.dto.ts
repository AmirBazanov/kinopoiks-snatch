import {IsBoolean, IsString} from "class-validator";
export class CreateCountryDto {
  @IsString()
  private readonly name: string;
  @IsBoolean()
  private readonly is_eng: boolean;
}

import {IsBoolean, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AddRoleDto {
  @ApiProperty()
  @IsNumber()
  movie_id: number;
  @ApiProperty()
  @IsNumber()
  person_id: number;
  @ApiProperty()
  @IsString()
  role_name: string;
  @ApiProperty()
  @IsBoolean()
  is_eng: boolean;
}


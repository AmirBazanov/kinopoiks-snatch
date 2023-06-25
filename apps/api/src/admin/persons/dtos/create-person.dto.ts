import {IsBoolean, IsDateString, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreatePersonDto {
  @ApiProperty()
  @IsDateString()
  date_birth: Date;
  @ApiProperty()
  @IsNumber()
  height: number;
  @ApiProperty()
  @IsBoolean()
  is_eng: boolean;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  photo: string;
  @ApiProperty()
  @IsString()
  place_birth: string;
  @ApiProperty()
  @IsString()
  spouse: string;
  @ApiProperty()
  @IsString()
  sur_name: string;
}

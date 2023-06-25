import {IsBoolean, IsDateString, IsNumber, IsOptional, IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";


export class CreateAwardDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsDateString()
  year: Date;
  @ApiProperty()

  @IsString()
  nomination: string;
  @ApiProperty()

  @IsBoolean()
  is_eng: boolean;

  @IsOptional()
  @ApiProperty()

  @IsNumber()
  person_id?: number;

  @ApiProperty()

  @IsNumber()
  movie_id: number;
}

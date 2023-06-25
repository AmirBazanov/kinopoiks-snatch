import {IsBoolean,  IsDateString,  IsNumber, IsOptional, IsString} from 'class-validator';


export class CreateAwardDto {
  @IsString()
  name: string;
  @IsDateString()
  year: Date;
  @IsString()
  nomination: string;
  @IsBoolean()
  is_eng: boolean;

  @IsOptional()
  @IsNumber()
  person_id?: number;

  @IsNumber()
  movie_id: number;
}

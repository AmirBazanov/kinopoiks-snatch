import {IsBoolean, IsDateString, IsNumber, IsOptional, IsString} from 'class-validator';


export class EditAwardDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDateString()
  year?: Date;

  @IsOptional()
  @IsString()
  nomination?: string;

  @IsOptional()
  @IsBoolean()
  is_eng?: boolean;

  @IsOptional()
  @IsNumber()
  person_id?: number;

  @IsOptional()
  @IsNumber()
  movie_id?: number;
}

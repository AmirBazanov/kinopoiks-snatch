import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class EditAwardDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Date must be a valid ISO 8601 date string' })
  year?: Date;

  @IsOptional()
  @IsString()
  nomination?: string;

  @IsOptional()
  @IsBoolean()
  is_eng?: boolean;

  @IsOptional()
  person_id?: number;

  @IsOptional()
  movie_id?: number;
}

import {IsBoolean, IsDate, IsNumber, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";

export class CreateMovieDto {
  @IsString()
  title: string;
  @IsString()
  orig_title: string;

  @Type(() => Date)
  @IsDate({ message: 'Date must be a valid ISO 8601 date string' })
  production_year: Date;


  @IsString()
  tagline: string;
  @IsNumber()
  budget: number;
  @IsNumber()
  marketing: number;

  @Type(() => Date)
  @IsDate({ message: 'Date must be a valid ISO 8601 date string' })
  dvd_release: Date;

  @Type(() => Date)
  @IsDate({ message: 'Date must be a valid ISO 8601 date string' })
  blueray_release: Date;

  @IsNumber()
  age_limit: number;
  @IsString()
  mpaa_rating: string;
  @IsNumber()
  duration_min: number;
  @IsString()
  film_description: string;

  @IsBoolean()
  is_eng: boolean;

  @IsBoolean()
  @IsOptional()
  is_serial: boolean;

  @IsOptional()
  country_id: number;
  @IsOptional()
  genres_id: number[];
  @IsOptional()
  awards_id: number[];
  @IsOptional()
  persons_id: number[];
}

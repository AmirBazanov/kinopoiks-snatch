import {IsBoolean, IsDate, IsNumber, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsString()
  orig_title: string;
  @Type(() => Date)
  @IsDate({ message: 'Date must be a valid ISO 8601 date string' })
  production_year: Date;
  @ApiProperty()
  @IsString()
  tagline: string;
  @ApiProperty()
  @IsNumber()
  budget: number;
  @ApiProperty()
  @IsNumber()
  marketing: number;
  @ApiProperty()
  @Type(() => Date)
  @IsDate({ message: 'Date must be a valid ISO 8601 date string' })
  dvd_release: Date;
  @ApiProperty()
  @Type(() => Date)
  @IsDate({ message: 'Date must be a valid ISO 8601 date string' })
  blueray_release: Date;
  @ApiProperty()
  @IsNumber()
  age_limit: number;
  @ApiProperty()
  @IsString()
  mpaa_rating: string;
  @ApiProperty()
  @IsNumber()
  duration_min: number;
  @ApiProperty()
  @IsString()
  film_description: string;
  @ApiProperty()
  @IsBoolean()
  is_eng: boolean;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  is_serial: boolean;
  @ApiProperty()
  @IsOptional()
  country_id: number;
  @ApiProperty()
  @IsOptional()
  genres_id: number[];
  @ApiProperty()
  @IsOptional()
  awards_id: number[];
  @ApiProperty()
  @IsOptional()
  persons_id: number[];
}

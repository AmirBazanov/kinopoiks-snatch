import {IsBoolean, IsDate, IsOptional} from "class-validator";
import {Type} from "class-transformer";
import {Column, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany} from "typeorm";
import {
  AwardsEntity,
  CommentsEntity,
  CountriesEntity,
  GenresEntity,
  MoviesPersonsRolesEntity
} from "@kinopoisk-snitch/typeorm";

export class CreateMovieDto {
  private readonly title: string;
  private readonly orig_title: string;

  @Type(() => Date)
  @IsDate({ message: 'Date must be a valid ISO 8601 date string' })
  private readonly production_year: Date;

  private readonly tagline: string;
  private readonly budget: number;
  private readonly marketing: number;

  @Type(() => Date)
  @IsDate({ message: 'Date must be a valid ISO 8601 date string' })
  private readonly dvd_release: Date;

  @Type(() => Date)
  @IsDate({ message: 'Date must be a valid ISO 8601 date string' })
  private readonly blueray_release: Date;

  private readonly age_limit: number;
  private readonly mpaa_rating: string;
  private readonly duration_min: number;
  private readonly film_description: string;

  @IsBoolean()
  private readonly is_eng: boolean;

  @IsBoolean()
  @IsOptional()
  private readonly is_serial: boolean;

  @IsOptional()
  country_id: number;
}

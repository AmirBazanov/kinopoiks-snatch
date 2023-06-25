import {IsBoolean, IsNumber, IsOptional, IsString} from "class-validator";

export class FiltersDto {
  @IsString()
  @IsOptional()
  text: string;
  @IsOptional()
  @IsNumber()
  genreIds: number[];
  @IsOptional()
  @IsNumber()
  countryIds: number[];
  @IsOptional()
  @IsNumber()
  yearFrom: number;
  @IsOptional()
  @IsNumber()
  yearTo: number;
  @IsOptional()
  @IsString()
  sort: string;
  @IsBoolean()
  is_eng: boolean;
  @IsOptional()
  @IsNumber()
  page: number;
  @IsOptional()
  @IsNumber()
  perPage: number;
}

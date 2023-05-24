import {IsEnum, IsString} from 'class-validator';
import {HttpStatus} from "@nestjs/common";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IdMovieContract {
  export class Request {
    @IsString()
    movie_id: number;
  }

  export class Response {
    @IsEnum(HttpStatus)
    httpStatus: HttpStatus;
    private readonly movie_id: number;
    private readonly title: string;
    private readonly orig_title: string;

    private readonly production_year: Date;

    private readonly tagline: string;
    private readonly budget: number;
    private readonly marketing: number;

    private readonly dvd_release: Date;

    private readonly blueray_release: Date;

    private readonly age_limit: number;
    private readonly mpaa_rating: string;
    private readonly duration_min: number;
    private readonly film_description: string;

    private readonly is_eng: boolean;
    private readonly is_serial: boolean;
    country_id: number;
  }
}

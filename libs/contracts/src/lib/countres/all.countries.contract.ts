import {CountriesEntity} from "@kinopoisk-snitch/typeorm";

export namespace AllCountriesContract {
  export class Request {
  }
  export class Response {
    countries: CountriesEntity[];
  }
}

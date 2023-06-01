import {GenresEntity} from "@kinopoisk-snitch/typeorm";

export namespace AllGenresContract {
  export class Request {
  }
  export class Response {
    countries: GenresEntity[];
  }
}

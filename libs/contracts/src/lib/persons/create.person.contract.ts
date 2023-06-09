import {
  AwardsEntity,
  MoviesPersonsRolesEntity,
  PersonsEntity,
} from '@kinopoisk-snitch/typeorm';

export namespace CreatePersonContract {
  export class Request implements Partial<PersonsEntity> {
    awards: AwardsEntity[];
    date_birth: Date;
    height: number;
    is_eng: boolean;
    moviesPersonsRole: MoviesPersonsRolesEntity[];
    name: string;
    person_id: number;
    photo: string;
    place_birth: string;
    spouse: string;
    sur_name: string;
  }

  export class Response implements Partial<PersonsEntity> {
    awards: AwardsEntity[];
    date_birth: Date;
    height: number;
    is_eng: boolean;
    moviesPersonsRole: MoviesPersonsRolesEntity[];
    name: string;
    person_id: number;
    photo: string;
    place_birth: string;
    spouse: string;
    sur_name: string;
  }
}
